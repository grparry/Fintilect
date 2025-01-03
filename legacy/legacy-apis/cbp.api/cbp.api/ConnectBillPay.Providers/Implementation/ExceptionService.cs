using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;
using System;
using System.Threading.Tasks;
using AutoMapper;

using ConnectBillPay.Core.Configuration;

using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Requests;
using ConnectBillPay.Services.Abstract;
using Microsoft.Extensions.Logging;
using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Fis.PaymentHistory;

namespace ConnectBillPay.Services.Implementation
{
    public class ExceptionService : IExceptionService
    {
        private readonly ICuGenericRepository<PaymentException> _paymentException;
        private readonly ILogger<ExceptionService> _logger;
        private readonly ICuGenericRepository<Payment> _paymentRepository;
        private readonly ICuGenericRepository<UserPayeeList> _userPayeeRepository;
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly ICuGenericRepository<PaymentHistory> _paymentHistoryRepository;
        private readonly ICuGenericRepository<CustomerInfo> _customerInfoRepository;
        private readonly INotificationProvider _notificationProvider;
        private readonly IMemberProvider _memberProvider;
        private readonly IWarehouseGenericRepository<PaymentException> _paymentExceptionRepository;
        private readonly IPaymentProvider _paymentProvider;
        private readonly ICuGenericRepository<PaymentExceptionAdjustment> _paymentExceptionAdjustmentRepository;
        private readonly ICuGenericRepository<PaymentAdjustment> _paymentAdjustmentRepository;
        private readonly ICuGenericRepository<PersonalPayee> _personalPayeeRepository;

        public ExceptionService(IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository, 
            ICuGenericRepository<Payment> paymentRepository, 
            ICuGenericRepository<UserPayeeList> userPayeeRepository, 
            ICuGenericRepository<CustomerInfo> customerInfoRepository, 
            INotificationProvider notificationProvider, 
            IMemberProvider memberProvider, 
            ICuGenericRepository<PersonalPayee> personalPayeeRepository, 
            ICuGenericRepository<PaymentException> paymentException, 
            IWarehouseGenericRepository<PaymentException> paymentExceptionRepository, 
            ICuGenericRepository<PaymentExceptionAdjustment> paymentExceptionAdjustmentRepository, 
            ILogger<ExceptionService> logger, 
            ICuGenericRepository<PaymentHistory> paymentHistoryRepository, 
            IPaymentProvider paymentProvider, 
            ICuGenericRepository<PaymentAdjustment> paymentAdjustmentRepository)
        {
            _globalPayeeRepository = globalPayeeRepository;
            _paymentRepository = paymentRepository;
            _userPayeeRepository = userPayeeRepository;
            _customerInfoRepository = customerInfoRepository;
            _notificationProvider = notificationProvider;
            _memberProvider = memberProvider;
            _personalPayeeRepository = personalPayeeRepository;
            _paymentException = paymentException;
            _paymentExceptionRepository = paymentExceptionRepository;
            _paymentProvider = paymentProvider;
            _paymentAdjustmentRepository = paymentAdjustmentRepository;
            _paymentExceptionAdjustmentRepository = paymentExceptionAdjustmentRepository;
            _logger = logger;
            _paymentHistoryRepository = paymentHistoryRepository;
        }
        
        public async Task<ServiceResponse> SendCustomerNotification(ExceptionCustomerNotificationRequest request)
        {
            var payment = await _paymentRepository.GetAsync(x => x.Id == request.PaymentId);
            var userPayeeList = await _userPayeeRepository.GetAsync(x => x.Id == payment.UserPayeeListId);
            object payee = await userPayeeList.GetMemberPayeeAsync(_personalPayeeRepository, _globalPayeeRepository);

            var customerInfo = await GetCustomerInfo(payment);

            await _notificationProvider.SendNotification(request.StatusCode, customerInfo.Email, payment, userPayeeList, customerInfo, payee);

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> SendNotification(int statusCode)
        {
            await _notificationProvider.SendNotification(statusCode, string.Empty);

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        private async Task<CustomerInfo> GetCustomerInfo(Payment payment)
        {
            var customerInfo = await _customerInfoRepository.GetAsync(x => x.MemberId == payment.MemberId);

            if (customerInfo == null) // no customer info stored yet, check core/provider for member information
            {
                var memberResponse = await _memberProvider.GetMember(payment.MemberId);

                if (!memberResponse.Success)
                {
                    // log error, failed to get member information
                    return null;
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

            return customerInfo;
        }

        public async Task<ServiceResponse<ExceptionRefundResponse>> CheckForRefundAdjustment(string paymentId, int exceptionId)
        {
            var payment = await _paymentRepository.GetAsync(x => x.Id == paymentId);
            var paymentHistory = await _paymentHistoryRepository.GetAsync(x => x.PaymentId == payment.Id);
            var record = await _paymentExceptionRepository.GetAsync(x => x.Id == exceptionId);

            _logger.LogInformation($"Processing adjustment");

            if (await HasProcessedAdjustment(paymentHistory))
            {
                // adjustment already processed
                _logger.LogInformation($"Adjustment has already been processed for {payment.Id}");
                return new ServiceResponse<ExceptionRefundResponse>
                {
                    Object = new ExceptionRefundResponse
                    {
                        Adjustment = new PaymentExceptionAdjustment(),
                        Success = false
                    },
                    StatusCode = 200
                };
            }

            var userPayeeList = await _userPayeeRepository.GetAsync(x => x.Id == payment.UserPayeeListId);

            var payeeName = await GetPayeeName(paymentHistory);

            // send refund
            var response = await _paymentProvider.SendPaymentReversal(payment, userPayeeList, (long)payment.Amount, payeeName);

            _logger.LogInformation(response.Success
                ? $"Refund successfully processed through provider"
                : $"Failed to process Refund through provider");

            // log payment reversal in database
            var paymentExceptionAdjustment = new PaymentExceptionAdjustment
            {
                PaymentExceptionId = record.Id,
                PaymentHistoryId = paymentHistory.Id,
                Amount = (long)payment.Amount,
                Created = DateTime.Now,
                Successful = true,
                Type = PaymentDetailType.RefundedToClient.ToString()
            };

            _paymentExceptionAdjustmentRepository.Add(paymentExceptionAdjustment);
            await _paymentExceptionAdjustmentRepository.SaveChangesAsync();

            return new ServiceResponse<ExceptionRefundResponse>
            {
                Object = new ExceptionRefundResponse
                {
                    Adjustment = paymentExceptionAdjustment,
                    Success = true
                },
                StatusCode = 200
            };
        }

        public async Task<bool> HasProcessedAdjustment(PaymentHistory history)
        {
            // We need to check the exception process and the adjustment process to make sure we don't double post a reversal
            var exception = await _paymentExceptionAdjustmentRepository.GetAsync(x => x.PaymentHistoryId == history.Id && x.Successful);
            if (exception != null)
            {
                return true;
            }

            var adjustment = await _paymentAdjustmentRepository.GetAsync(x => x.PaymentHistoryId == history.Id && x.Successful);
            return adjustment != null;
        }
        
        private async Task<string> GetPayeeName(PaymentHistory paymentHistory)
        {
            var personalPayee = await _personalPayeeRepository.GetAsync(x => x.PayeeId == paymentHistory.PayeeId);
            if (personalPayee != null)
            {
                return personalPayee.PayeeName;
            }

            var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == paymentHistory.PayeeId);
            return globalPayee?.PayeeName;
        }
    }
}
