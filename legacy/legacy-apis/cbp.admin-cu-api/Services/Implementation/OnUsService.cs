using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Requests.OnUs;
using Responses.OnUs;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class OnUsService : IOnUsService
    {
        private readonly IMapper _mapper;
        private readonly ICuGenericRepository<OnUsPaymentException> _onUsPaymentExceptionRepository;
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly ICuGenericRepository<PersonalPayee> _personalPayeeRepository;
        private readonly IPaymentProvider _paymentProvider;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ConnectBillPaySettings _cbpSettings;

        public OnUsService(IMapper mapper,
            ICuGenericRepository<OnUsPaymentException> onUsPaymentExceptionRepository,
            IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository,
            ICuGenericRepository<PersonalPayee> personalPayeeRepository,
            IPaymentProvider paymentProvider,
            IUnitOfWork unitOfWork,
            ConnectBillPaySettings cbpSettings)
        {
            _mapper = mapper;
            _onUsPaymentExceptionRepository = onUsPaymentExceptionRepository;
            _globalPayeeRepository = globalPayeeRepository;
            _personalPayeeRepository = personalPayeeRepository;
            _paymentProvider = paymentProvider;
            _unitOfWork = unitOfWork;
            _cbpSettings = cbpSettings;
        }

        public async Task<ServiceResponse<OnUsPaymentExceptionResponse>> GetOnUsPayment(long onUsPaymentId)
        {
            var payment = await _onUsPaymentExceptionRepository.GetAsync(x => x.Id == onUsPaymentId);

            if (payment == null)
            {
                return new ServiceResponse<OnUsPaymentExceptionResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<OnUsPaymentExceptionResponse>(payment);

            return new ServiceResponse<OnUsPaymentExceptionResponse>
            {
                Object = response,
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> RepostOnUsPayment(OnUsPaymentRepostRequest request)
        {
            var payment = await _unitOfWork.Repo<Payment>().GetAsync(x => x.Id == request.PaymentId);
            var history = await _unitOfWork.Repo<PaymentHistory>().GetAsync(x => x.PaymentId == request.PaymentId);
            var exception = await _unitOfWork.Repo<OnUsPaymentException>()
                .GetAsync(x => x.PaymentId == request.PaymentId);

            var message = payment == null ? "Payment, " : string.Empty;
            message += history == null ? "Payment History, " : string.Empty;
            message += history == null ? "Exception, " : string.Empty;

            if (payment == null ||
                history == null ||
                exception == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404,
                    Error = $"{message}Table data Could not be found in the Database"
                };
            }

            if (!request.MarkPaymentPaid)
            {
                var userPayeeList = await _unitOfWork.Repo<UserPayeeList>().GetAsync(x => x.Id == payment.UserPayeeListId);

                if (!GetAccountDetails(request.LoanId, out var account, out var type, out var suffix))
                {
                    return new ServiceResponse
                    {
                        StatusCode = 400,
                        Error = "The UsersAccountAtPayee could not be parsed to account and suffix"
                    };
                }

                var loanId = $"L{request.LoanId}";

                // loan id must be changed to proceed
                if (loanId == exception.LoanId)
                {
                    return new ServiceResponse
                    {
                        StatusCode = 400,
                        Error = "The loanId cannot match the exception loanId"
                    };
                }

                // add before change history
                var beforeUserPayeeChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
                beforeUserPayeeChangeHistory.ModifiedBy = "repost";
                beforeUserPayeeChangeHistory.ModifyDate = DateTime.Now;
                beforeUserPayeeChangeHistory.ModifyType = "1"; // TODO assign correct type
                beforeUserPayeeChangeHistory.Reason = "on us repost - before";
                _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(beforeUserPayeeChangeHistory);

                var usersAccountAtPayee = $"{account.Trim()}-{loanId}";

                userPayeeList.UsersAccountAtPayee = usersAccountAtPayee;
                _unitOfWork.Repo<UserPayeeList>().Update(userPayeeList);

                history.UsersAccountAtPayee = usersAccountAtPayee;
                _unitOfWork.Repo<PaymentHistory>().Update(history);

                // add after change history
                var afterUserPayeeChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
                afterUserPayeeChangeHistory.ModifiedBy = "repost";
                afterUserPayeeChangeHistory.ModifyDate = DateTime.Now;
                afterUserPayeeChangeHistory.ModifyType = "1"; // TODO assign correct type
                afterUserPayeeChangeHistory.Reason = "on us repost - after";
                _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(afterUserPayeeChangeHistory);

                await _unitOfWork.CommitAsync();

                // repost payment
                var repostResponse = await _paymentProvider.SendLoanPayment(payment, userPayeeList);

                if (!repostResponse.Success)
                {
                    // add before change history
                    var beforeOnUsExceptionChangeHistory = _mapper.Map<OnUsPaymentsChangeHistory>(exception);
                    beforeOnUsExceptionChangeHistory.ModifiedBy = "repost";
                    beforeOnUsExceptionChangeHistory.ModifiedDate = DateTime.Now;
                    beforeOnUsExceptionChangeHistory.ChangeReason = "on us repost - before";
                    _unitOfWork.Repo<OnUsPaymentsChangeHistory>().Add(beforeOnUsExceptionChangeHistory);

                    exception.StatusCode = "203";
                    exception.StatusDesc = "On us posting failed";
                    exception.ModifiedDate = DateTime.Now;
                    exception.ModifiedBy = "repost";
                    exception.AccountId = usersAccountAtPayee.Length > 22 ? usersAccountAtPayee.Substring(0, 22) : usersAccountAtPayee;  // table varchar(22) prevent truncation error
                    exception.LoanId = loanId.Length > 50 ? loanId.Substring(0, 50) : loanId; // table varchar(50) prevent truncation error
                    _unitOfWork.Repo<OnUsPaymentException>().Update(exception);

                    // add after change history
                    var afterOnUsExceptionChangeHistory = _mapper.Map<OnUsPaymentsChangeHistory>(exception);
                    afterOnUsExceptionChangeHistory.ModifiedBy = "repost";
                    afterOnUsExceptionChangeHistory.ModifiedDate = DateTime.Now;
                    afterOnUsExceptionChangeHistory.ChangeReason = "on us repost - after";
                    _unitOfWork.Repo<OnUsPaymentsChangeHistory>().Add(afterOnUsExceptionChangeHistory);

                    await _unitOfWork.CommitAsync();

                    return new ServiceResponse
                    {
                        StatusCode = 400,
                        Error = $"Psi Service Host Send Loan Payment Failed with code of {repostResponse.ProviderResponseCode} and message of {repostResponse.Message}"
                    };
                }
            }

            // mark as paid
            // before payment change history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1";
            beforePaymentChangeHistory.ModifiedBy = "repost";
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.Reason = "repost on us payment - before";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(beforePaymentChangeHistory);

            payment.StatusCode = 8011;
            payment.LastUpdate = DateTime.Now;
            _unitOfWork.Repo<Payment>().Update(payment);

            // after payment change history
            var afterPaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            afterPaymentChangeHistory.ModifyType = "1";
            afterPaymentChangeHistory.ModifiedBy = "repost";
            afterPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterPaymentChangeHistory.Reason = "repost on us payment - after";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(afterPaymentChangeHistory);

            history.StatusCode = 8011;
            history.LastUpdate = DateTime.Now;
            _unitOfWork.Repo<PaymentHistory>().Update(history);

            // add before change history
            var beforeOnUsChangeHistory = _mapper.Map<OnUsPaymentsChangeHistory>(exception);
            beforeOnUsChangeHistory.ModifiedBy = "repost";
            beforeOnUsChangeHistory.ModifiedDate = DateTime.Now;
            beforeOnUsChangeHistory.ChangeReason = "on us repost - before";
            _unitOfWork.Repo<OnUsPaymentsChangeHistory>().Add(beforeOnUsChangeHistory);

            exception.StatusCode = "8011";
            exception.ModifiedDate = DateTime.Now;
            exception.ModifiedBy = "repost";
            exception.StatusDesc = "Paid";
            _unitOfWork.Repo<OnUsPaymentException>().Update(exception);

            // add after change history
            var afterOnUsChangeHistory = _mapper.Map<OnUsPaymentsChangeHistory>(exception);
            afterOnUsChangeHistory.ModifiedBy = "repost";
            afterOnUsChangeHistory.ModifiedDate = DateTime.Now;
            afterOnUsChangeHistory.ChangeReason = "on us repost - after";
            _unitOfWork.Repo<OnUsPaymentsChangeHistory>().Add(afterOnUsChangeHistory);

            await _unitOfWork.CommitAsync();
            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> RefundAndCancelOnUsPayment(OnUsPaymentRefundAndCancelRequest request)
        {
            var payment = await _unitOfWork.Repo<Payment>().GetAsync(x => x.Id == request.PaymentId);
            var history = await _unitOfWork.Repo<PaymentHistory>().GetAsync(x => x.PaymentId == request.PaymentId);
            var exception = await _unitOfWork.Repo<OnUsPaymentException>()
                .GetAsync(x => x.PaymentId == request.PaymentId);

            var message = payment == null ? "Payment, " : string.Empty;
            message += history == null ? "Payment History, " : string.Empty;
            message += history == null ? "Exception, " : string.Empty;

            if (payment == null || history == null || exception == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404,
                    Error = $"{message}Table data Could not be found in the Database"
                };
            }

            if (await HasProcessedAdjustment(request.PaymentId))
            {
                return new ServiceResponse
                {
                    StatusCode = 404,
                    Error = $"Adjustment has already been processed for {payment.Id}"
                };
            }

            var userPayeeList = await _unitOfWork.Repo<UserPayeeList>().GetAsync(x => x.Id == payment.UserPayeeListId);

            if (!GetAccountDetails(request.LoanId, out var account, out var type,
                out var suffix))
            {
                return new ServiceResponse
                {
                    StatusCode = 400,
                    Error = "The UsersAccountAtPayee could not be parsed to account and suffix"
                };
            }

            var loanId = $"L{request.LoanId}";

            // loan id must be same loan
            if (loanId == exception.LoanId)
            {
                return new ServiceResponse
                {
                    StatusCode = 400,
                    Error = "The loanId must match the exception loanId"
                };
            }

            if (request.Amount != payment.Amount)
            {
                return new ServiceResponse
                {
                    StatusCode = 400,
                    Error = "The amount must match the exception amount"
                };
            }

            // add before change history
            var beforeUserPayeeChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
            beforeUserPayeeChangeHistory.ModifiedBy = "refund";
            beforeUserPayeeChangeHistory.ModifyDate = DateTime.Now;
            beforeUserPayeeChangeHistory.ModifyType = "1"; // TODO assign correct type
            beforeUserPayeeChangeHistory.Reason = "on us refund - before";
            _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(beforeUserPayeeChangeHistory);

            var usersAccountAtPayee = $"{account.Trim()}-{loanId}";

            userPayeeList.UsersAccountAtPayee = usersAccountAtPayee;
            _unitOfWork.Repo<UserPayeeList>().Update(userPayeeList);

            history.UsersAccountAtPayee = usersAccountAtPayee;
            _unitOfWork.Repo<PaymentHistory>().Update(history);

            // add after change history
            var afterUserPayeeChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
            afterUserPayeeChangeHistory.ModifiedBy = "refund";
            afterUserPayeeChangeHistory.ModifyDate = DateTime.Now;
            afterUserPayeeChangeHistory.ModifyType = "1"; // TODO assign correct type
            afterUserPayeeChangeHistory.Reason = "on us refund - after";
            _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(afterUserPayeeChangeHistory);

            await _unitOfWork.CommitAsync();

            var reversalComment = _cbpSettings.ReturnTransactionComment_RejectedAndRefunded;

            // refund payment
            var refundResponse = await _paymentProvider.SendPaymentReversal(payment, userPayeeList, payment.Amount, $"Loan Payment {loanId}", reversalComment);

            if (!refundResponse.Success)
            {
                // add before change history
                var beforeOnUsExceptionChangeHistory = _mapper.Map<OnUsPaymentsChangeHistory>(exception);
                beforeOnUsExceptionChangeHistory.ModifiedBy = "refund";
                beforeOnUsExceptionChangeHistory.ModifiedDate = DateTime.Now;
                beforeOnUsExceptionChangeHistory.ChangeReason = "on us refund - before";
                _unitOfWork.Repo<OnUsPaymentsChangeHistory>().Add(beforeOnUsExceptionChangeHistory);

                exception.StatusCode = "203";
                exception.StatusDesc = "On us refund posting failed";
                exception.ModifiedDate = DateTime.Now;
                exception.ModifiedBy = "refund";
                exception.AccountId = usersAccountAtPayee;
                exception.LoanId = loanId;
                _unitOfWork.Repo<OnUsPaymentException>().Update(exception);

                // add after change history
                var afterOnUsExceptionChangeHistory = _mapper.Map<OnUsPaymentsChangeHistory>(exception);
                afterOnUsExceptionChangeHistory.ModifiedBy = "refund";
                afterOnUsExceptionChangeHistory.ModifiedDate = DateTime.Now;
                afterOnUsExceptionChangeHistory.ChangeReason = "on us refund - after";
                _unitOfWork.Repo<OnUsPaymentsChangeHistory>().Add(afterOnUsExceptionChangeHistory);

                await _unitOfWork.CommitAsync();

                return new ServiceResponse
                {
                    StatusCode = 400,
                    Error = $"Psi Service Host SendPaymentReversal Failed with code of {refundResponse.ProviderResponseCode} and message of {refundResponse.Message}"
                };
            }

            if (payment.RecurringPaymentId != null)
            {
                var recurringPayment = await _unitOfWork.Repo<RecurringPayment>().GetAsync(x => x.Id == payment.RecurringPaymentId);

                // add before recurring history
                var beforeRecurringPaymentChangeHistory = _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
                beforeRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
                beforeRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
                beforeRecurringPaymentChangeHistory.ModifiedBy = "refund";
                beforeRecurringPaymentChangeHistory.Reason = "Canceled - before";
                _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(beforeRecurringPaymentChangeHistory);

                // edit recurring payment
                recurringPayment.LastUpdate = DateTime.Now;
                recurringPayment.Active = false;
                recurringPayment.Deleted = true;
                _unitOfWork.Repo<RecurringPayment>().Update(recurringPayment);

                // add after recurring history
                var afterRecurringPaymentChangeHistory = _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
                afterRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
                afterRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
                afterRecurringPaymentChangeHistory.ModifiedBy = "refund";
                afterRecurringPaymentChangeHistory.Reason = "Canceled - after";
                _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(afterRecurringPaymentChangeHistory);
            }

            // mark as refunded
            // before payment change history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1";
            beforePaymentChangeHistory.ModifiedBy = "refund";
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.Reason = "refund on us payment - before";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(beforePaymentChangeHistory);

            payment.StatusCode = 8000;
            payment.LastUpdate = DateTime.Now;
            _unitOfWork.Repo<Payment>().Update(payment);

            // after payment change history
            var afterPaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            afterPaymentChangeHistory.ModifyType = "1";
            afterPaymentChangeHistory.ModifiedBy = "refund";
            afterPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterPaymentChangeHistory.Reason = "refund on us payment - after";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(afterPaymentChangeHistory);

            history.StatusCode = 8000;
            history.LastUpdate = DateTime.Now;
            _unitOfWork.Repo<PaymentHistory>().Update(history);

            // add before change history
            var beforeOnUsChangeHistory = _mapper.Map<OnUsPaymentsChangeHistory>(exception);
            beforeOnUsChangeHistory.ModifiedBy = "refund";
            beforeOnUsChangeHistory.ModifiedDate = DateTime.Now;
            beforeOnUsChangeHistory.ChangeReason = "on us refund - before";
            _unitOfWork.Repo<OnUsPaymentsChangeHistory>().Add(beforeOnUsChangeHistory);

            exception.StatusCode = "8000";
            exception.ModifiedDate = DateTime.Now;
            exception.ModifiedBy = "refund";
            exception.StatusDesc = "Rejected and Refunded";
            _unitOfWork.Repo<OnUsPaymentException>().Update(exception);

            // add after change history
            var afterOnUsChangeHistory = _mapper.Map<OnUsPaymentsChangeHistory>(exception);
            afterOnUsChangeHistory.ModifiedBy = "refund";
            afterOnUsChangeHistory.ModifiedDate = DateTime.Now;
            afterOnUsChangeHistory.ChangeReason = "on us refund - after";
            _unitOfWork.Repo<OnUsPaymentsChangeHistory>().Add(afterOnUsChangeHistory);

            await _unitOfWork.CommitAsync();
            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        private bool GetAccountDetails(string fundingAccount, out string account, out string accountType,
            out string suffix)
        {
            account = string.Empty;
            accountType = string.Empty;
            suffix = string.Empty;
            if (!fundingAccount.Contains('-'))
            {
                return false;
            }

            var accountDetails = fundingAccount.Split('-');
            if (accountDetails[1].StartsWith('L') || accountDetails[1].StartsWith('S'))
            {
                account = accountDetails[0];
                accountType = accountDetails[1].Substring(0, 1);
                suffix = accountDetails[1].Substring(1, accountDetails[1].Length - 1);
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<ServiceResponse<FailedOnUsListResponse>> FailedOnUsReport(FailedOnUsRequest request)
        {

            var queryStartDate = DateTime.ParseExact(request.StartDate.TrimStart().TrimEnd(), "yyyyMMdd",
                System.Globalization.CultureInfo.CurrentCulture);
            var queryEndDate = DateTime.ParseExact(request.EndDate.TrimStart().TrimEnd(), "yyyyMMdd",
                System.Globalization.CultureInfo.CurrentCulture);

            var response = await _onUsPaymentExceptionRepository.GetOnUsData(queryStartDate, queryEndDate);

            var responses = new List<FailedOnUsResponse>();
            foreach (var record in response)
            {
                if (string.IsNullOrEmpty(record.PayeeName))
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == record.PayeeId);
                    if (globalPayee != null)
                    {
                        record.PayeeName = globalPayee.PayeeName;
                    }
                }
                responses.Add(_mapper.Map<FailedOnUsResponse>(record));
            }

            return new ServiceResponse<FailedOnUsListResponse>
            {
                StatusCode = 200,
                Object = new FailedOnUsListResponse
                {
                    FailedRecords = responses
                }
            };
        }

        public async Task<bool> HasProcessedAdjustment(string paymentId)
        {
            var codes = new List<string>() { "203", "220", "221" };

            // We need to check the exception process and the adjustment process to make sure we don't double post a reversal
            var exception = await _onUsPaymentExceptionRepository.GetAsync(x => x.PaymentId == paymentId && codes.Contains(x.StatusCode));
            return exception == null;
        }
    }
}
