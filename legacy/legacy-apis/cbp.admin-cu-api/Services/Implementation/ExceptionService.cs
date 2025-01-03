using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using ConnectBillPay.Core.Constants;
using Services.Abstract;
using Responses.Exception;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Fis.PaymentHistory;

namespace Services.Implementation
{
    public class ExceptionService : IExceptionService
    {
        private readonly ICuGenericRepository<PaymentException> _paymentException;
        private readonly IMapper _mapper;
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
        private readonly ICuGenericRepository<PersonalPayee> _personalPayeeRepository;
        private readonly ICuGenericRepository<Configuration> _configurationRepository;
        private readonly ConnectBillPaySettings _cbpSettings;

        public ExceptionService(ICuGenericRepository<PaymentException> paymentException, IMapper mapper, ILogger<ExceptionService> logger, ICuGenericRepository<PaymentHistory> paymentHistoryRepository, IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository, ICuGenericRepository<Payment> paymentRepository, ICuGenericRepository<UserPayeeList> userPayeeRepository, ICuGenericRepository<CustomerInfo> customerInfoRepository, INotificationProvider notificationProvider, IMemberProvider memberProvider, IWarehouseGenericRepository<PaymentException> paymentExceptionRepository, IPaymentProvider paymentProvider, ICuGenericRepository<PaymentExceptionAdjustment> paymentExceptionAdjustmentRepository, ICuGenericRepository<PersonalPayee> personalPayeeRepository, ICuGenericRepository<Configuration> configurationRepository, ConnectBillPaySettings cbpSettings)
        {
            _paymentException = paymentException;
            _mapper = mapper;
            _logger = logger;
            _paymentHistoryRepository = paymentHistoryRepository;
            _globalPayeeRepository = globalPayeeRepository;
            _paymentRepository = paymentRepository;
            _userPayeeRepository = userPayeeRepository;
            _customerInfoRepository = customerInfoRepository;
            _notificationProvider = notificationProvider;
            _memberProvider = memberProvider;
            _paymentExceptionRepository = paymentExceptionRepository;
            _paymentProvider = paymentProvider;
            _paymentExceptionAdjustmentRepository = paymentExceptionAdjustmentRepository;
            _personalPayeeRepository = personalPayeeRepository;
            _configurationRepository = configurationRepository;
            _cbpSettings = cbpSettings;
        }

        public async Task<ServiceResponse<PaymentExceptionListResponse>> GetExceptionsBySingleDateAsync(DateTime date)
        {
            var exceptionsResponse = await _paymentException.FindAsync(x => x.ServiceRequestDate.Date == date.Date);

            if (exceptionsResponse == null)
            {
                return new ServiceResponse<PaymentExceptionListResponse>
                {
                    Object = null,
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            var responseList = new PaymentExceptionListResponse
            {
                PaymentExceptions = exceptionsResponse.Select(_mapper.Map<PaymentExceptionResponse>).ToList()
            };

            return new ServiceResponse<PaymentExceptionListResponse>
            {
                Object = responseList,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<ExceptionRefundResponse>> CheckForRefundAdjustmentAsync(string paymentId, int exceptionId)
        {
            var payment = await _paymentRepository.GetAsync(x => x.Id == paymentId);
            var paymentHistory = await _paymentHistoryRepository.GetAsync(x => x.PaymentId == payment.Id);
            var record = _paymentExceptionRepository.GetAsync(x => x.Id == exceptionId);

            _logger.LogInformation($"Processing adjustment");

            if (await HasProcessedAdjustment(paymentHistory))
            {
                // adjustment already processed
                _logger.LogInformation($"Adjustment has already been processed for {payment.Id}");
                return new ServiceResponse<ExceptionRefundResponse>
                {
                    Object = new ExceptionRefundResponse
                    {
                        Adjustment = new PaymentExceptionAdjustmentResponse(),
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
                    Adjustment = _mapper.Map<PaymentExceptionAdjustmentResponse>(paymentExceptionAdjustment),
                    Success = true
                },
                StatusCode = 200
            };
        }

        public async Task<bool> HasProcessedAdjustment(PaymentHistory history)
        {
            var existing = await _paymentExceptionAdjustmentRepository.GetAsync(x => x.PaymentHistoryId == history.Id && x.Successful == true);
            return existing != null;
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
