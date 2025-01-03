using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Enums;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Requests.Payment;
using Responses.Payment;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Reflection;
using Microsoft.AspNetCore.Http;
using Responses;

namespace Services.Implementation
{
    public class PaymentService : IPaymentService
    {
        private readonly ICuGenericRepository<Payment> _paymentRepository;
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ConnectBillPaySettings _cbpSettings;
        private readonly INotificationProvider _notificationProvider;
        private readonly ICuGenericRepository<InstitutionInfo> _institutionRepository;
        private readonly IWarehouseGenericRepository<Holiday> _holidayRepository;
        private readonly ICuGenericRepository<UserPayeeList> _userPayeeRepository;
        private readonly ICalendarProvider _calendarProvider;
        private readonly ICuGenericRepository<CustomerInfo> _customerInfoRepository;
        private readonly ICuGenericRepository<PersonalPayee> _personalPayeeRepository;
        private readonly IExceptionService _exceptionService;

        public PaymentService(ICuGenericRepository<Payment> paymentRepository,
            IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ConnectBillPaySettings cbpSettings,
            INotificationProvider notificationProvider,
            ICuGenericRepository<InstitutionInfo> institutionRepository,
            IWarehouseGenericRepository<Holiday> holidayRepository,
            ICuGenericRepository<UserPayeeList> userPayeeRepository,
            ICalendarProvider calendarProvider,
            ICuGenericRepository<CustomerInfo> customerInfoRepository,
            ICuGenericRepository<PersonalPayee> personalPayeeRepository, 
            IExceptionService exceptionService)
        {
            _paymentRepository = paymentRepository;
            _globalPayeeRepository = globalPayeeRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _cbpSettings = cbpSettings;
            _notificationProvider = notificationProvider;
            _institutionRepository = institutionRepository;
            _holidayRepository = holidayRepository;
            _userPayeeRepository = userPayeeRepository;
            _calendarProvider = calendarProvider;
            _customerInfoRepository = customerInfoRepository;
            _personalPayeeRepository = personalPayeeRepository;
            _exceptionService = exceptionService;
        }

        public async Task<ServiceResponse<ScheduledPaymentChangeHistoryListResponse>> GetScheduledPaymentChangeHistory(ScheduledPaymentChangeHistoryReportRequest request)
        {
            var changeHistories = await _paymentRepository.GetScheduledPaymentChangeHistory(request.StartDate, request.EndDate, request.SearchType, request.SearchValue);
            var payeeNames = new Dictionary<string, string>();
            var responses = new List<ScheduledPaymentChangeHistoryResponse>();

            foreach (var history in changeHistories)
            {
                var response = _mapper.Map<ScheduledPaymentChangeHistoryResponse>(history);

                var name = response.PayeeName;
                if (!string.IsNullOrWhiteSpace(response.PayeeId) &&
                    string.IsNullOrEmpty(response.PayeeName) &&
                    !payeeNames.TryGetValue(response.PayeeId, out name))
                {
                    switch (response.PayeeType)
                    {
                        case PayeeType.Global:
                        case PayeeType.OnUs:
                        case PayeeType.OffHost:
                            var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == response.PayeeId);
                            if (globalPayee != null)
                            {
                                name = globalPayee.PayeeName;
                                payeeNames.Add(response.PayeeId, name);
                            }
                            break;
                    }
                }

                response.PayeeName = name;
                responses.Add(response);
            }

            return new ServiceResponse<ScheduledPaymentChangeHistoryListResponse>
            {
                StatusCode = 200,
                Object = new ScheduledPaymentChangeHistoryListResponse
                {
                    Histories = responses
                }
            };
        }

        public async Task<ServiceResponse<RecurringPaymentChangeHistoryListResponse>> GetRecurringPaymentChangeHistory(RecurringPaymentChangeHistoryReportRequest request)
        {
            var changeHistories = await _paymentRepository.GetRecurringPaymentChangeHistory(request.StartDate, request.EndDate, request.SearchType, request.SearchValue);
            var payeeNames = new Dictionary<string, string>();
            var responses = new List<RecurringPaymentChangeHistoryResponse>();

            foreach (var history in changeHistories)
            {
                var response = _mapper.Map<RecurringPaymentChangeHistoryResponse>(history);

                var name = response.PayeeName;
                if (!string.IsNullOrWhiteSpace(response.PayeeId) &&
                    string.IsNullOrEmpty(response.PayeeName) &&
                    !payeeNames.TryGetValue(response.PayeeId, out name))
                {
                    switch (response.PayeeType)
                    {
                        case PayeeType.Global:
                        case PayeeType.OnUs:
                        case PayeeType.OffHost:
                            var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == response.PayeeId);
                            if (globalPayee != null)
                            {
                                name = globalPayee.PayeeName;
                                payeeNames.Add(response.PayeeId, name);
                            }
                            break;
                    }
                }

                response.PayeeName = name;
                responses.Add(response);
            }

            return new ServiceResponse<RecurringPaymentChangeHistoryListResponse>
            {
                StatusCode = 200,
                Object = new RecurringPaymentChangeHistoryListResponse
                {
                    Histories = responses
                }
            };
        }

        public async Task<ServiceResponse<PendingPaymentListResponse>> GetPendingPayments(PendingPaymentsRequest request)
        {
            var start = request.Date.Date;
            var end = await GetNextValidRunDay(start, request.CheckHoliday);

            end = end.AddDays(1).AddSeconds(-1);

            var pendingPayments = await _paymentRepository.GetPendingPaymentsAsync(start, end);
            var payeeNames = new Dictionary<string, string>();
            var responses = new List<PendingPaymentResponse>();

            foreach (var pendingPayment in pendingPayments)
            {
                var response = _mapper.Map<PendingPaymentResponse>(pendingPayment);

                var name = response.PayeeName;
                if (!string.IsNullOrWhiteSpace(response.PayeeID) &&
                    string.IsNullOrEmpty(response.PayeeName) &&
                    !payeeNames.TryGetValue(response.PayeeID, out name))
                {
                    switch (response.PayeeType)
                    {
                        case PayeeType.Global:
                        case PayeeType.OnUs:
                        case PayeeType.OffHost:
                            var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == response.PayeeID);
                            if (globalPayee != null)
                            {
                                name = globalPayee.PayeeName;
                                payeeNames.Add(response.PayeeID, name);
                            }
                            break;
                    }
                }

                response.PayeeName = name;
                responses.Add(response);
            }

            return new ServiceResponse<PendingPaymentListResponse>
            {
                StatusCode = 200,
                Object = new PendingPaymentListResponse
                {
                    PendingPayments = responses
                }
            };
        }

        public async Task<DateTime> GetNextValidRunDay(DateTime start, bool checkHolidays)
        {
            var institution = (await _institutionRepository.AllAsync())
                .First();

            DateTime day = start;
            while (!await IsValidRunDay(day, checkHolidays, institution.SponsorId))
            {
                day = day.AddDays(1);
            }
            return day;
        }

        public async Task<bool> IsValidRunDay(DateTime day, bool checkHolidays, string sponsorId)
        {
            if (!_cbpSettings.ProcessDays.Any(x => x.Equals(day.DayOfWeek.ToString(), StringComparison.InvariantCultureIgnoreCase)))
            {
                return false;
            }

            if (!checkHolidays)
            {
                return true;
            }

            var holidays = await _holidayRepository.FindAsync(x => x.Date == day && (x.SponsorId == "0" || x.SponsorId == sponsorId));
            return !holidays.Any();
        }

        public async Task<ServiceResponse<PaymentActivityListResponse>> GetPaymentActivity(PaymentActivityRequest request)
        {
            var activities = await _paymentRepository.GetPaymentActivity(request.StartDate, request.EndDate, request.SearchType, request.SearchValue, request.PayeeName);
            var payeeNames = new Dictionary<string, string>();
            var responses = new List<PaymentActivityResponse>();

            foreach (var activity in activities)
            {
                var response = _mapper.Map<PaymentActivityResponse>(activity);

                var name = response.PayeeName;
                if (!string.IsNullOrWhiteSpace(response.PayeeID) &&
                    string.IsNullOrEmpty(response.PayeeName) &&
                    !payeeNames.TryGetValue(response.PayeeID, out name))
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == response.PayeeID);
                    if (globalPayee != null)
                    {
                        name = globalPayee.PayeeName;
                        payeeNames.Add(response.PayeeID, name);
                    }
                }

                response.PayeeName = name;

                if (request.SearchType == SearchType.MemberIdAndDateAndPayeeName ||
                    request.SearchType == SearchType.MemberIdAndPayeeName)
                {
                    // filter out by payee name
                    if (!response.PayeeName.Trim().Equals(request.PayeeName.Trim(), StringComparison.InvariantCultureIgnoreCase))
                    {
                        continue;
                    }
                }

                responses.Add(response);
            }

            return new ServiceResponse<PaymentActivityListResponse>
            {
                StatusCode = 200,
                Object = new PaymentActivityListResponse
                {
                    PaymentActivities = responses
                }
            };
        }

        public async Task<ServiceResponse> ReprocessAsync(PaymentReprocessRequest request)
        {
            var paymentRepo = _unitOfWork.Repo<Payment>();
            var paymentChangeHistoryRepo = _unitOfWork.Repo<PaymentChangeHistory>();
            var paymentHistoryRepo = _unitOfWork.Repo<PaymentHistory>();

            var payment = await paymentRepo.GetAsync(x => x.Id == request.PaymentId);
            if (payment == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            // add before change history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.ModifiedBy = "admin reprocessing";
            beforePaymentChangeHistory.Reason = "updated - before";
            paymentChangeHistoryRepo.Add(beforePaymentChangeHistory);

            // edit payment
            payment.StatusCode = 105;
            payment.LastUpdate = DateTime.Now;
            payment.WillProcessDate = DateTime.Now;
            paymentRepo.Update(payment);

            var paymentHistory = await paymentHistoryRepo.GetAsync(x => x.PaymentId == request.PaymentId);
            if (paymentHistory != null)
            {
                paymentHistoryRepo.Remove(paymentHistory);
            }

            // add after change history
            var afterPaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            afterPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            afterPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterPaymentChangeHistory.ModifiedBy = "admin reprocessing";
            afterPaymentChangeHistory.Reason = "updated - after";
            paymentChangeHistoryRepo.Add(afterPaymentChangeHistory);

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> SendConfirmationSummary()
        {
            await _notificationProvider.SendNotification(102, string.Empty);
            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> UpdateStatusAsync(PaymentUpdateStatusRequest request)
        {
            var paymentRepo = _unitOfWork.Repo<Payment>();
            var paymentChangeHistoryRepo = _unitOfWork.Repo<PaymentChangeHistory>();
            var paymentHistoryRepo = _unitOfWork.Repo<PaymentHistory>();

            var payment = await paymentRepo.GetAsync(x => x.Id == request.PaymentId);
            if (payment == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            // add before change history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.ModifiedBy = "admin status update";
            beforePaymentChangeHistory.Reason = "updated - before";
            paymentChangeHistoryRepo.Add(beforePaymentChangeHistory);

            // edit payment
            payment.StatusCode = request.StatusCode;
            payment.LastUpdate = DateTime.Now;
            paymentRepo.Update(payment);

            var paymentHistory = await paymentHistoryRepo.GetAsync(x => x.PaymentId == request.PaymentId);
            if (paymentHistory != null)
            {
                paymentHistory.StatusCode = request.StatusCode;
                paymentHistory.LastUpdate = DateTime.Now;
                paymentHistoryRepo.Update(paymentHistory);
            }

            // add after change history
            var afterPaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            afterPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            afterPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterPaymentChangeHistory.ModifiedBy = "admin status update";
            afterPaymentChangeHistory.Reason = "updated - after";
            paymentChangeHistoryRepo.Add(afterPaymentChangeHistory);

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> EditPayment(string paymentId, PaymentEditRequest request)
        {
            var payment = await _paymentRepository.GetAsync(x => x.Id == paymentId);
            if (payment == null)
            {
                return new ServiceResponse
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            var existingPayment = (await _paymentRepository.FindAsync(x => x.UserPayeeListId == payment.UserPayeeListId &&
                                                                         x.MemberId == request.MemberId &&
                                                                         x.Suspended == false &&
                                                                         x.Amount == request.Amount &&
                                                                         x.WillProcessDate.Date == request.WillProcessDate.Date &&
                                                                         x.StatusCode == 100 &&
                                                                         x.Id != payment.Id)).FirstOrDefault();

            if (existingPayment != null)
            {
                return new ServiceResponse
                {
                    StatusCode = StatusCodes.Status409Conflict
                };
            }

            if (payment.RecurringPaymentId != null)
            {
                var recurringPayment = await _unitOfWork.Repo<RecurringPayment>().GetAsync(x => x.Id == payment.RecurringPaymentId);
                if (recurringPayment == null)
                {
                    return new ServiceResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound
                    };
                }

                // add before recurring history
                var beforeRecurringPaymentChangeHistory =
                    _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
                beforeRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
                beforeRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
                beforeRecurringPaymentChangeHistory.ModifiedBy = request.MemberId;
                beforeRecurringPaymentChangeHistory.Reason = "Edit - before";
                _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(beforeRecurringPaymentChangeHistory);

                recurringPayment.ProcessDay = request.WillProcessDate.Day.ToString();
                recurringPayment.NumPayments = (short)request.NumPayments;
                recurringPayment.Frequency = request.Frequency;
                _unitOfWork.Repo<RecurringPayment>().Update(recurringPayment);

                // add after recurring history
                var afterRecurringPaymentChangeHistory =
                    _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
                afterRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
                afterRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
                afterRecurringPaymentChangeHistory.ModifiedBy = request.MemberId;
                afterRecurringPaymentChangeHistory.Reason = "Canceled - after";
                _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(afterRecurringPaymentChangeHistory);

            }

            // add before change history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.ModifiedBy = request.MemberId;
            beforePaymentChangeHistory.Reason = "updated - before";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(beforePaymentChangeHistory);

            var userPayeeList = await _userPayeeRepository.GetAsync(x => x.Id == payment.UserPayeeListId);

            // update delivery date
            if (payment.WillProcessDate != request.WillProcessDate)
            {
                if (userPayeeList == null)
                {
                    return new ServiceResponse
                    {
                        StatusCode = 400
                    };
                }

                var deliveryDateResponse = await _calendarProvider.GetDeliveryDates(request.WillProcessDate);
                var deliveryDate = userPayeeList.PaymentMethod == PaymentMethods.Electronic ? deliveryDateResponse.ElectronicDeliveryDate : deliveryDateResponse.CheckDeliveryDate;
                if (deliveryDate == null)
                {
                    return new ServiceResponse
                    {
                        StatusCode = 400
                    };
                }

                payment.DeliveryDate = deliveryDate.Value;
            }

            // edit payment
            payment.Amount = request.Amount;
            payment.FundingAccount = request.Account;
            payment.WillProcessDate = request.WillProcessDate;
            payment.MemberId = request.MemberId;
            payment.LastUpdate = DateTime.Now;
            _unitOfWork.Repo<Payment>().Update(payment);

            // add after change history
            var afterPaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            afterPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            afterPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterPaymentChangeHistory.ModifiedBy = request.MemberId;
            afterPaymentChangeHistory.Reason = "updated - after";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(afterPaymentChangeHistory);

            await _unitOfWork.CommitAsync();

            // payment has ben edited, send edited payment notification
            var customerInfo = await _customerInfoRepository.GetAsync(x => x.MemberId == payment.MemberId);


            if (customerInfo != null)
            {
                object payee = null;
                switch (userPayeeList.PayeeType)
                {
                    case PayeeType.Global:
                    case PayeeType.OnUs:
                        payee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == userPayeeList.FisPayeeId);
                        break;
                    case PayeeType.Personal:
                        payee = await _personalPayeeRepository.GetAsync(x => x.PayeeId == userPayeeList.PayeeId);
                        break;
                }

                await _notificationProvider.SendNotification(109, payment.MemberId, payment, userPayeeList, payee, customerInfo);
            }

            return new ServiceResponse
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<PendingPaymentSearchResponse>> GetPendingPaymentsAsync(PendingPaymentSearchRequest request)
        {
            var expression = BuildSearchExpression(request);

            var paymentList = (await _paymentRepository.GetPendingPaymentsAsync(expression));

            foreach (var payment in paymentList)
            {
                if (payment.PayeeType == PayeeType.Global || payment.PayeeType == PayeeType.OnUs)
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == payment.PayeeId);
                    if (globalPayee != null)
                    {
                        payment.PayeeName = globalPayee.PayeeName;
                    }
                }
            }

            return new ServiceResponse<PendingPaymentSearchResponse>
            {
                StatusCode = 200,
                Object = new PendingPaymentSearchResponse
                {
                    Payments = paymentList
                }
            };
        }

        public async Task<ServiceResponse> CancelPayment(string paymentId, int statusCode = 103)
        {
            var payment = await _unitOfWork.Repo<Payment>().GetAsync(x => x.Id == paymentId);

            if (payment == null)
            {
                // no payment found
                return new ServiceResponse
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            // get data
            var userPayeeList = await _userPayeeRepository.GetAsync(x => x.Id == payment.UserPayeeListId);

            // insert payment history
            var paymentHistory = _mapper.Map<PaymentHistory>(payment);
            _mapper.Map(userPayeeList, paymentHistory);
            paymentHistory.CancelledDate = DateTime.Now;
            paymentHistory.ProcessedDate = DateTime.Now;
            paymentHistory.StatusCode = statusCode;
            _unitOfWork.Repo<PaymentHistory>().Add(paymentHistory);

            // add before payment history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.ModifiedBy = "Admin";
            beforePaymentChangeHistory.Reason = "Canceled - before";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(beforePaymentChangeHistory);

            // edit payment
            payment.LastUpdate = DateTime.Now;
            payment.StatusCode = 103;
            _unitOfWork.Repo<Payment>().Update(payment);

            // add after payment history
            var afterPaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            afterPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            afterPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterPaymentChangeHistory.ModifiedBy = "Admin";
            afterPaymentChangeHistory.Reason = "Canceled - after";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(afterPaymentChangeHistory);

            //Recurring Payment
            if (payment.RecurringPaymentId != null)
            {
                var recurringPayment = await _unitOfWork.Repo<RecurringPayment>().GetAsync(x => x.Id == payment.RecurringPaymentId);

                // add before recurring history
                var beforeRecurringPaymentChangeHistory = _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
                beforeRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
                beforeRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
                beforeRecurringPaymentChangeHistory.ModifiedBy = "Admin";
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
                afterRecurringPaymentChangeHistory.ModifiedBy = "Admin";
                afterRecurringPaymentChangeHistory.Reason = "Canceled - after";
                _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(afterRecurringPaymentChangeHistory);
            }

            await _unitOfWork.CommitAsync();

            // If payment is cancelled send cancelled payment notification
            var customerInfo = await _customerInfoRepository.GetAsync(x => x.MemberId == payment.MemberId);

            if (customerInfo != null)
            {
                object payee = null;
                switch (userPayeeList.PayeeType)
                {
                    case PayeeType.Global:
                    case PayeeType.OnUs:
                        payee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == userPayeeList.FisPayeeId);
                        break;
                    case PayeeType.Personal:
                        payee = await _personalPayeeRepository.GetAsync(x => x.PayeeId == userPayeeList.PayeeId);
                        break;
                }

                await _notificationProvider.SendNotification(103, payment.MemberId, payment, userPayeeList, payee, customerInfo, paymentHistory);
            }

            return new ServiceResponse
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse> CancelPaymentAndRefund(CancelPaymentAndRefundRequest request)
        {
            var reprocessResponse = await _exceptionService.CheckForRefundAdjustmentAsync(request.PaymentId, request.ExceptionId);
            if (reprocessResponse.StatusCode != 200)
            {
                return reprocessResponse;
            }

            return await CancelPayment(request.PaymentId, 105);
        }

        private static Expression<Func<PendingPaymentReport, bool>> BuildSearchExpression(PendingPaymentSearchRequest request)
        {
            var parameter = Expression.Parameter(typeof(PendingPaymentReport), "x");
            Expression expression = null;

            if (request.Date != null)
            {
                if (request.EndDate == null) // single date
                {
                    expression = AppendAndAlsoExpression(expression, GetDateRangeExpression(parameter, request.Date.Value, request.Date.Value));
                }
                else // date range
                {
                    expression = AppendAndAlsoExpression(expression, GetDateRangeExpression(parameter, request.Date.Value, request.EndDate.Value));
                }
            }

            if (request.PaymentId != null)
            {
                expression = AppendAndAlsoExpression(expression, GetPaymentIdExpression(parameter, request.PaymentId));
            }

            if (request.MemberId != null)
            {
                expression = AppendAndAlsoExpression(expression, GetMemberIdExpression(parameter, request.MemberId));
            }

            if (expression == null)
            {
                return null;
            }

            return Expression.Lambda<Func<PendingPaymentReport, bool>>(expression, parameter);
        }

        private static Expression AppendAndAlsoExpression(Expression current, Expression value)
        {
            if (current == null)
            {
                return value;
            }
            return Expression.AndAlso(current, value);
        }

        private static Expression GetDateRangeExpression(ParameterExpression parameter, DateTime startDate, DateTime endDate)
        {
            var memberInfo = GetMember((PendingPaymentReport x) => x.WillProcessDate);
            var dateMemberInfo = GetMember((DateTime x) => x.Date);

            var accessCreatedDate = Expression.MakeMemberAccess(Expression.MakeMemberAccess(parameter, memberInfo), dateMemberInfo);
            var greaterThanOrEqualStart = Expression.GreaterThanOrEqual(accessCreatedDate, Expression.Constant(startDate.Date));
            var lessThanEndStart = Expression.LessThan(accessCreatedDate, Expression.Constant(endDate.Date.AddDays(1)));

            return Expression.AndAlso(greaterThanOrEqualStart, lessThanEndStart);
        }

        private static Expression GetPaymentIdExpression(ParameterExpression parameter, string paymentId)
        {
            var memberInfo = GetMember((PendingPaymentReport x) => x.PaymentId);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(paymentId));
        }

        private static Expression GetMemberIdExpression(ParameterExpression parameter, string memberId)
        {
            var memberInfo = GetMember((PendingPaymentReport x) => x.MemberId);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(memberId));
        }

        private static MemberInfo GetMember<T, TMember>(Expression<Func<T, TMember>> expression)
        {
            if (expression.Body is not MemberExpression memberExpression)
            {
                throw new InvalidOperationException("Invalid expression provided");
            }
            return memberExpression.Member;
        }
    }
}
