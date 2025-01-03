using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Responses;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ConnectBillPay.Services.Classes;
using ConnectBillPay.Services.Abstract;
using AutoMapper;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Providers.Model;

namespace ConnectBillPay.Services.Implementation
{
    public class PaymentService : IPaymentService
    {
        private readonly ICuGenericRepository<Payment> _paymentRepository;
        private readonly ICuGenericRepository<UserPayeeList> _userPayeeRepository;
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly ICuGenericRepository<RecurringPayment> _recurringPaymentRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ConnectBillPaySettings _cbpSettings;
        private readonly IMemberProvider _memberProvider;
        private readonly ICuGenericRepository<CustomerInfo> _customerInfoRepository;
        private readonly INotificationProvider _notificationProvider;
        private readonly ICuGenericRepository<InstitutionInfo> _institutionRepository;
        private readonly IWarehouseGenericRepository<Holiday> _holidayRepository;
        private readonly ICuGenericRepository<Frequency> _frequencyRepository;
        private readonly ICalendarProvider _calendarProvider;

        public PaymentService(ICuGenericRepository<Payment> paymentRepository,
                              ICuGenericRepository<UserPayeeList> userPayeeRepository,
                              ICuGenericRepository<PayeeLastPayment> payeeLastPaymentRepository,
                              IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository,
                              ICuGenericRepository<RecurringPayment> recurringPaymentRepository,
                              IUnitOfWork unitOfWork,
                              IMapper mapper,
                              ConnectBillPaySettings cbpSettings,
                              IMemberProvider memberProvider,
                              ICuGenericRepository<CustomerInfo> customerInfoRepository,
                              INotificationProvider notificationProvider,
                              ICuGenericRepository<InstitutionInfo> institutionRepository,
                              IWarehouseGenericRepository<Holiday> holidayRepository,
                              ICalendarProvider calendarProvider,
                              ICuGenericRepository<Frequency> frequencyRepository)
        {
            _paymentRepository = paymentRepository;
            _userPayeeRepository = userPayeeRepository;
            _globalPayeeRepository = globalPayeeRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _recurringPaymentRepository = recurringPaymentRepository;
            _cbpSettings = cbpSettings;
            _memberProvider = memberProvider;
            _customerInfoRepository = customerInfoRepository;
            _notificationProvider = notificationProvider;
            _institutionRepository = institutionRepository;
            _holidayRepository = holidayRepository;
            _calendarProvider = calendarProvider;
            _frequencyRepository = frequencyRepository;
        }

        public async Task<ServiceResponse<PaymentResponse>> AddOneTimePayment(OneTimePaymentAddRequest request)
        {
            var existingPayment = await _paymentRepository.GetAsync(x => x.UserPayeeListId == request.UserPayeeListId &&
                x.MemberId == request.MemberId &&
                x.Suspended == false &&
                x.Amount == request.Amount &&
                x.WillProcessDate.Date == request.WillProcessDate.Date &&
                x.StatusCode == 100);

            if (existingPayment != null)
            {
                return new ServiceResponse<PaymentResponse>
                {
                    Object = new PaymentResponse { PaymentId = string.Empty },
                    StatusCode = StatusCodes.Status409Conflict
                };
            }

            var paymentId = await _paymentRepository.GeneratePaymentIdAsync();

            var payment = new Payment
            {
                Id = paymentId,
                UserPayeeListId = request.UserPayeeListId,
                MemberId = request.MemberId,
                FundingAccount = request.FundingAccount,
                Amount = request.Amount,
                Memo = request.Memo ?? string.Empty,
                SourceApplication = request.SourceApplication,
                WillProcessDate = request.WillProcessDate,
                DeliveryDate = request.DeliveryDate
            };

            _paymentRepository.Add(payment);
            await _paymentRepository.SaveChangesAsync();

            await SendPaymentNotifications(payment);

            return new ServiceResponse<PaymentResponse>
            {
                Object = new PaymentResponse { PaymentId = paymentId },
                StatusCode = StatusCodes.Status201Created
            };
        }

        public async Task<ServiceResponse<PaymentResponse>> AddRecurringPayment(RecurringPaymentAddRequest request)
        {
            var existingPayment = await _paymentRepository.GetAsync(x => x.UserPayeeListId == request.UserPayeeListId &&
                                                                         x.MemberId == request.MemberId &&
                                                                         x.Suspended == false &&
                                                                         x.Amount == request.Amount &&
                                                                         x.WillProcessDate.Date == request.WillProcessDate.Date &&
                                                                         x.StatusCode == 100);

            if (existingPayment != null)
            {
                return new ServiceResponse<PaymentResponse>
                {
                    Object = new PaymentResponse { PaymentId = string.Empty },
                    StatusCode = StatusCodes.Status409Conflict
                };
            }

            var recurringPaymentId = await _paymentRepository.GenerateRecurringPaymentIdAsync();

            string processDay = null;
            if (request.Frequency >= 4) // monthly
            {
                processDay = request.WillProcessDate.Day.ToString();
            }

            var recurringPayment = new RecurringPayment
            {
                Id = recurringPaymentId,
                NumPayments = (short)request.NumPayments,
                PaymentsProcessed = 0,
                Frequency = request.Frequency,
                LastUpdate = DateTime.Now,
                StartDate = request.WillProcessDate,
                ProcessDay = processDay,
            };

            // Calling SaveChanges to save data for foreign key constraint
            _recurringPaymentRepository.Add(recurringPayment);
            await _recurringPaymentRepository.SaveChangesAsync();
            var paymentId = await _paymentRepository.GeneratePaymentIdAsync();

            var payment = new Payment
            {
                Id = paymentId,
                UserPayeeListId = request.UserPayeeListId,
                MemberId = request.MemberId,
                RecurringPaymentId = recurringPayment.Id,
                FundingAccount = request.FundingAccount,
                Amount = request.Amount,
                Memo = request.Memo ?? string.Empty,
                SourceApplication = request.SourceApplication,
                WillProcessDate = request.WillProcessDate,
                DeliveryDate = request.DeliveryDate,
                EntryDate = DateTime.Now,
                LastUpdate = DateTime.Now,
                StatusCode = 100
            };

            _paymentRepository.Add(payment);
            await _paymentRepository.SaveChangesAsync();

            await SendPaymentNotifications(payment);

            return new ServiceResponse<PaymentResponse>
            {
                Object = new PaymentResponse { PaymentId = paymentId },
                StatusCode = StatusCodes.Status201Created
            };
        }

        public async Task<ServiceResponse> DeleteOneTimePayment(string memberId, string paymentId)
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

            if (payment.RecurringPaymentId != null)
            {
                // payment is not a recurring payment
                return new ServiceResponse
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            // insert payment history
            var userPayeeList = await _userPayeeRepository.GetAsync(x => x.Id == payment.UserPayeeListId);
            var paymentHistory = _mapper.Map<PaymentHistory>(payment);
            _mapper.Map(userPayeeList, paymentHistory);

            paymentHistory.CancelledDate = DateTime.Now;
            paymentHistory.ProcessedDate = DateTime.Now;
            paymentHistory.StatusCode = 103;
            _unitOfWork.Repo<PaymentHistory>().Add(paymentHistory);

            // add before change history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.ModifiedBy = memberId;
            beforePaymentChangeHistory.Reason = "Canceled - before";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(beforePaymentChangeHistory);

            // edit payment
            payment.LastUpdate = DateTime.Now;
            payment.StatusCode = 103;
            _unitOfWork.Repo<Payment>().Update(payment);

            // add after change history
            var afterPaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            afterPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            afterPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterPaymentChangeHistory.ModifiedBy = memberId;
            afterPaymentChangeHistory.Reason = "Canceled - after";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(afterPaymentChangeHistory);

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse> DeleteRecurringPayment(string memberId, string paymentId)
        {
            var payment = await _unitOfWork.Repo<Payment>().GetAsync(x => x.Id == paymentId);

            if (payment == null ||
                payment.RecurringPaymentId == null)
            {
                // no payment found
                return new ServiceResponse
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            // get data
            var userPayeeList = await _userPayeeRepository.GetAsync(x => x.Id == payment.UserPayeeListId);
            var recurringPayment = await _unitOfWork.Repo<RecurringPayment>().GetAsync(x => x.Id == payment.RecurringPaymentId);

            // insert payment history
            var paymentHistory = _mapper.Map<PaymentHistory>(payment);
            _mapper.Map(userPayeeList, paymentHistory);
            paymentHistory.CancelledDate = DateTime.Now;
            paymentHistory.ProcessedDate = DateTime.Now;
            paymentHistory.StatusCode = 103;
            _unitOfWork.Repo<PaymentHistory>().Add(paymentHistory);

            // add before payment history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.ModifiedBy = memberId;
            beforePaymentChangeHistory.Reason = "Canceled - before";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(beforePaymentChangeHistory);

            // add before recurring history
            var beforeRecurringPaymentChangeHistory = _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
            beforeRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            beforeRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
            beforeRecurringPaymentChangeHistory.ModifiedBy = memberId;
            beforeRecurringPaymentChangeHistory.Reason = "Canceled - before";
            _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(beforeRecurringPaymentChangeHistory);

            // edit payment
            payment.LastUpdate = DateTime.Now;
            payment.StatusCode = 103;
            _unitOfWork.Repo<Payment>().Update(payment);

            // edit recurring payment
            recurringPayment.LastUpdate = DateTime.Now;
            recurringPayment.Active = false;
            recurringPayment.Deleted = true;
            _unitOfWork.Repo<RecurringPayment>().Update(recurringPayment);

            // add after payment history
            var afterPaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            afterPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            afterPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterPaymentChangeHistory.ModifiedBy = memberId;
            afterPaymentChangeHistory.Reason = "Canceled - after";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(beforePaymentChangeHistory);

            // add after recurring history
            var afterRecurringPaymentChangeHistory = _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
            afterRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            afterRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
            afterRecurringPaymentChangeHistory.ModifiedBy = memberId;
            afterRecurringPaymentChangeHistory.Reason = "Canceled - after";
            _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(afterRecurringPaymentChangeHistory);

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = StatusCodes.Status200OK
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

                if (recurringPayment.Frequency >= 4) // monthly
                {
                    // add before recurring history
                    var beforeRecurringPaymentChangeHistory =
                        _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
                    beforeRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
                    beforeRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
                    beforeRecurringPaymentChangeHistory.ModifiedBy = request.MemberId;
                    beforeRecurringPaymentChangeHistory.Reason = "Edit - before";
                    _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(beforeRecurringPaymentChangeHistory);

                    recurringPayment.ProcessDay = request.WillProcessDate.Day.ToString();
                    _unitOfWork.Repo<RecurringPayment>().Update(recurringPayment);

                    // add after recurring history
                    var afterRecurringPaymentChangeHistory =
                        _mapper.Map<RecurringPaymentChangeHistory>(recurringPayment);
                    afterRecurringPaymentChangeHistory.ModifyType = "1"; // TODO update to update type
                    afterRecurringPaymentChangeHistory.ModifyDate = DateTime.Now;
                    afterRecurringPaymentChangeHistory.ModifiedBy = request.MemberId;
                    afterRecurringPaymentChangeHistory.Reason = "Edit - after";
                    _unitOfWork.Repo<RecurringPaymentChangeHistory>().Add(afterRecurringPaymentChangeHistory);
                }
            }

            // add before change history
            var beforePaymentChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
            beforePaymentChangeHistory.ModifyType = "1"; // TODO update to update type
            beforePaymentChangeHistory.ModifyDate = DateTime.Now;
            beforePaymentChangeHistory.ModifiedBy = request.MemberId;
            beforePaymentChangeHistory.Reason = "updated - before";
            _unitOfWork.Repo<PaymentChangeHistory>().Add(beforePaymentChangeHistory);

            // update delivery date
            if (payment.WillProcessDate != request.WillProcessDate)
            {
                var userPayeeList = await _userPayeeRepository.GetAsync(x => x.Id == payment.UserPayeeListId);
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
            payment.Suspended = request.Suspended;
            payment.Memo = request.Memo ?? string.Empty;
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

            return new ServiceResponse
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<List<PayeeLastPaymentsResponse>>> GetLastPayments(string memberId)
        {
            var paymentList = new List<PayeeLastPaymentsResponse>();
            var list = await _paymentRepository.GetPayeeLastPaymentsAsync(memberId);
            var payeeNames = new Dictionary<string, string>();

            foreach (var payment in list)
            {
                if (!payment.Amount.HasValue || !payment.LastProcDate.HasValue)
                {
                    continue;
                }

                string Name = payment.Name;

                if (string.IsNullOrEmpty(payment.Name))
                {
                    if (!payeeNames.TryGetValue(payment.PayeeId, out Name))
                    {
                        var result = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == payment.PayeeId);
                        if (result is not null)
                        {
                            Name = result.PayeeName;
                            payeeNames.Add(payment.PayeeId, Name);
                        }
                    }
                }

                var tempPayment = new PayeeLastPaymentsResponse
                {
                    Amount = payment.Amount.Value,
                    LastProcDate = payment.LastProcDate.Value,
                    Name = Name,
                    UserPayeeListId = payment.UserPayeeListId,
                    PaymentMethod = payment.PaymentMethod,
                    UsersAccountAtPayee = payment.UsersAccountAtPayee,
                    ValidPayment = payment.ValidPymt
                };
                paymentList.Add(tempPayment);
            }

            return new ServiceResponse<List<PayeeLastPaymentsResponse>>
            {
                Object = paymentList,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<List<MemberPayment>>> GetPendingPayments(string memberId)
        {
            var memberPayments = new List<MemberPayment>();
            var payeeNames = new Dictionary<string, string>();

            var payments = await _paymentRepository.GetPendingPaymentsAsync(memberId);

            foreach (var payment in payments)
            {
                string Name = payment.PayeeName;

                if (string.IsNullOrEmpty(Name))
                {
                    if (!payeeNames.TryGetValue(payment.PayeeID, out Name))
                    {
                        var result = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == payment.PayeeID);
                        if (result is not null)
                        {
                            Name = result.PayeeName;
                            payeeNames.Add(payment.PayeeID, Name);
                        }
                    }
                }

                var tempPayment = new MemberPayment
                {
                    Id = payment.Id,
                    UserPayeeListId = payment.UserPayeeListId,
                    FundingAccount = payment.FundingAccount,
                    Amount = payment.Amount,
                    StatusCode = payment.StatusCode,
                    FriendlyName = payment.FriendlyName,
                    Memo = payment.Memo,
                    WillProcessDate = payment.WillProcessDate,
                    DeliveryDate = payment.DeliveryDate,
                    RecurringPaymentId = payment.RecurringPaymentId,
                    Suspended = payment.Suspended,
                    UsersAccountAtPayee = payment.UsersAccountAtPayee,
                    NameOnAccount = payment.NameOnAccount,
                    NickName = payment.NickName,
                    PayeeID = payment.PayeeID,
                    PayeeType = payment.PayeeType,
                    PaymentMethod = payment.PaymentMethod,
                    PayeeName = Name,
                    NumPayments = payment.NumPayments,
                    PaymentsProcessed = payment.PaymentsProcessed,
                    Frequency = payment.Frequency,
                    FrequencyDescription = payment.Frequency != null ? GetFrequency((int)payment.Frequency) : null
                };
                memberPayments.Add(tempPayment);
            }

            return new ServiceResponse<List<MemberPayment>>
            {
                Object = memberPayments.OrderBy(x => x.PayeeName).ToList(),
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<List<MemberPayment>>> GetRecurringPaymentsToDate(string memberId, DateTime endDate)
        {
            var memberPayments = new List<MemberPayment>();
            var payeeNames = new Dictionary<string, string>();

            var payments = await _paymentRepository.GetPendingPaymentsAsync(memberId);

            var recurringFuturePayments = payments.Where(x => DateTime.Compare(x.WillProcessDate, DateTime.Now) >= 1 &&
                                                              !string.IsNullOrEmpty(x.RecurringPaymentId)).ToList();

            foreach (var payment in recurringFuturePayments)
            {
                var payeeName = payment.PayeeName;

                if (string.IsNullOrEmpty(payeeName))
                {
                    if (!payeeNames.TryGetValue(payment.PayeeID, out payeeName))
                    {
                        var result = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == payment.PayeeID);
                        if (result is not null)
                        {
                            payeeName = result.PayeeName;
                            payeeNames.Add(payment.PayeeID, payeeName);
                        }
                    }
                }

                var tempPayment = new MemberPayment
                {
                    Id = payment.Id,
                    UserPayeeListId = payment.UserPayeeListId,
                    FundingAccount = payment.FundingAccount,
                    Amount = payment.Amount,
                    StatusCode = payment.StatusCode,
                    FriendlyName = payment.FriendlyName,
                    Memo = payment.Memo,
                    WillProcessDate = payment.WillProcessDate,
                    DeliveryDate = payment.DeliveryDate,
                    RecurringPaymentId = payment.RecurringPaymentId,
                    Suspended = payment.Suspended,
                    UsersAccountAtPayee = payment.UsersAccountAtPayee,
                    NameOnAccount = payment.NameOnAccount,
                    NickName = payment.NickName,
                    PayeeID = payment.PayeeID,
                    PayeeType = payment.PayeeType,
                    PaymentMethod = payment.PaymentMethod,
                    PayeeName = payeeName,
                    NumPayments = payment.NumPayments,
                    PaymentsProcessed = payment.PaymentsProcessed,
                    Frequency = payment.Frequency,
                    FrequencyDescription = payment.Frequency != null ? GetFrequency((int)payment.Frequency) : null
                };


                var futureDates = new List<DateTime>();
                var processDate = payment.WillProcessDate;
                var paymentsToForecast = payment.NumPayments - payment.PaymentsProcessed;
                var numberOfPayments = 1;

                var futureDate = await _calendarProvider.GetDeliveryDates(tempPayment.WillProcessDate);
                var futureProcessDate = futureDate.ElectronicDeliveryDate ?? futureDate.CheckDeliveryDate;
                if (futureProcessDate != null)
                {
                    futureDates.Add((DateTime)futureProcessDate);
                }

                while (DateTime.Compare((DateTime)futureProcessDate, endDate) < 1 && (payment.NumPayments == -1 || numberOfPayments < paymentsToForecast))
                {
                    var tempDate = GetRecurringDateFromFrequency((int)payment.Frequency, payment.WillProcessDate, numberOfPayments);
                    futureDate = await _calendarProvider.GetDeliveryDates(tempDate);
                    futureProcessDate = futureDate.ElectronicDeliveryDate ?? futureDate.CheckDeliveryDate;

                    if (futureProcessDate != null)
                    {
                        if (DateTime.Compare((DateTime) futureProcessDate, endDate) < 1)
                        {
                            futureDates.Add((DateTime)futureProcessDate);
                        }
                        
                        numberOfPayments++;
                    }
                }
                tempPayment.FuturePaymentDates = futureDates;
                memberPayments.Add(tempPayment);
            }

            return new ServiceResponse<List<MemberPayment>>
            {
                Object = memberPayments.OrderBy(x => x.PayeeName).ToList(),
                StatusCode = StatusCodes.Status200OK
            };
        }


        public async Task<ServiceResponse<List<MemberPayment>>> GetRecurringPayments(string memberId)
        {
            var memberPayments = new List<MemberPayment>();
            var payeeNames = new Dictionary<string, string>();

            var payments = await _paymentRepository.GetPendingPaymentsAsync(memberId);

            var recurringFuturePayments = payments.Where(x => DateTime.Compare(x.WillProcessDate, DateTime.Now) >= 1 &&
                                                              !string.IsNullOrEmpty(x.RecurringPaymentId)).ToList();

            foreach (var payment in recurringFuturePayments)
            {
                var payeeName = payment.PayeeName;

                if (string.IsNullOrEmpty(payeeName))
                {
                    if (!payeeNames.TryGetValue(payment.PayeeID, out payeeName))
                    {
                        var result = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == payment.PayeeID);
                        if (result is not null)
                        {
                            payeeName = result.PayeeName;
                            payeeNames.Add(payment.PayeeID, payeeName);
                        }
                    }
                }

                var tempPayment = new MemberPayment
                {
                    Id = payment.Id,
                    UserPayeeListId = payment.UserPayeeListId,
                    FundingAccount = payment.FundingAccount,
                    Amount = payment.Amount,
                    StatusCode = payment.StatusCode,
                    FriendlyName = payment.FriendlyName,
                    Memo = payment.Memo,
                    WillProcessDate = payment.WillProcessDate,
                    DeliveryDate = payment.DeliveryDate,
                    RecurringPaymentId = payment.RecurringPaymentId,
                    Suspended = payment.Suspended,
                    UsersAccountAtPayee = payment.UsersAccountAtPayee,
                    NameOnAccount = payment.NameOnAccount,
                    NickName = payment.NickName,
                    PayeeID = payment.PayeeID,
                    PayeeType = payment.PayeeType,
                    PaymentMethod = payment.PaymentMethod,
                    PayeeName = payeeName,
                    NumPayments = payment.NumPayments,
                    PaymentsProcessed = payment.PaymentsProcessed,
                    Frequency = payment.Frequency,
                    FrequencyDescription = payment.Frequency != null ? GetFrequency((int)payment.Frequency) : null
                };

                if (tempPayment.NumPayments > 0)
                {
                    var futureDates = new List<DateTime>();
                    var paymentsToForecast = payment.NumPayments - payment.PaymentsProcessed;
                    for (var x = 0; x <= paymentsToForecast - 1; x++)
                    {
                        var tempDate = GetRecurringDateFromFrequency((int)payment.Frequency, tempPayment.WillProcessDate, x);
                        var futureDate = await _calendarProvider.GetDeliveryDates(tempDate);
                        futureDates.Add((DateTime)(futureDate.ElectronicDeliveryDate ?? futureDate.CheckDeliveryDate));
                    }
                    tempPayment.FuturePaymentDates = futureDates;
                }
                memberPayments.Add(tempPayment);
            }

            return new ServiceResponse<List<MemberPayment>>
            {
                Object = memberPayments.OrderBy(x => x.PayeeName).ToList(),
                StatusCode = StatusCodes.Status200OK
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

        public async Task<ServiceResponse> SendConfirmationSummary()
        {
            await _notificationProvider.SendNotification(102, string.Empty);
            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        private string GetFrequency(int frequencyValue)
        {
            if (frequencyValue != 0)
            {
                return _frequencyRepository.Get(x => x.Id == frequencyValue).Description;
            }
            return string.Empty;
        }

        private DateTime GetRecurringDateFromFrequency(int frequency, DateTime date, int occurrence)
        {
            if (occurrence == 0)
            {
                return date;
            }
            if (frequency == 0)
            {
                return date.AddDays(1 * occurrence);
            }
            if (frequency == 1)
            {
                return date.AddDays(7 * occurrence);
            }
            if (frequency == 2)
            {
                return date.AddDays(14 * occurrence);
            }
            if (frequency == 3)
            {
                return date.AddDays(28 * occurrence); // how do you find the n for number of months?
            }
            if (frequency == 4)
            {
                return date.AddMonths(1 * occurrence); // how are we accomplishing this in other places 14 days is only accurate for Feb
            }
            if (frequency == 5)
            {
                return date.AddMonths(2 * occurrence);
            }
            if (frequency == 6)
            {
                return date.AddMonths(3 * occurrence);
            }
            if (frequency == 7)
            {
                return date.AddMonths(6 * occurrence);
            }

            return date.AddYears(1 * occurrence);
        }

        private async Task SendPaymentNotifications(Payment payment)
        {
            if (payment.Amount >= _cbpSettings.LargePaymentAmount)
            {
                await SendLargePaymentNotification(payment);
            }
        }

        private async Task SendLargePaymentNotification(Payment payment)
        {
            var customerInfo = await _customerInfoRepository.GetAsync(x => x.MemberId == payment.MemberId);

            if (customerInfo == null) // no customer info stored yet, check core/provider for member information
            {
                var memberResponse = await _memberProvider.GetMember(payment.MemberId);

                if (!memberResponse.Success)
                {
                    // log error, failed to get member information
                    return;
                }

                var member = memberResponse.Member;
                customerInfo = new CustomerInfo
                {
                    MemberId = payment.MemberId,
                    Address1 = member.AddressLine1,
                    Address2 = member.AddressLine2,
                    Email = member.EmailAddress,
                    City = member.City,
                    State = member.State,
                    First = member.FirstName,
                    Last = member.LastName,
                    Middle = member.MiddleInitial,
                    HomePhone = member.PrimaryPhoneNumber,
                    ZipCode = member.ZipCode
                };
            }

            await _notificationProvider.SendNotification(407, customerInfo.Email, payment, customerInfo);
        }
    }
}

