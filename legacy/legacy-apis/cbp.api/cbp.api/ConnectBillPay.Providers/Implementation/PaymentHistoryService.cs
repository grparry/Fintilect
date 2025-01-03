using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Classes;
using Microsoft.AspNetCore.Http;

namespace ConnectBillPay.Services.Implementation
{
    public class PaymentHistoryService : IPaymentHistoryService
    {
        private readonly ICuGenericRepository<PaymentHistory> _paymentHistoryRepository;
        private readonly ICuGenericRepository<StatusCode> _statusCodeRepository;
        private readonly ICuGenericRepository<UserPayeeList> _userPayeeRepository;
        private readonly ICuGenericRepository<PersonalPayee> _personalPayeeRepository;
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly ICuGenericRepository<PaymentClear> _paymentClearRepository;
        private readonly ICuGenericRepository<ErrorHistory> _errorHistoryRepository;
        private readonly IMapper _mapper;

        public PaymentHistoryService(ICuGenericRepository<PaymentHistory> paymentHistoryRepository,
            ICuGenericRepository<StatusCode> statusCodeRepository,
            ICuGenericRepository<UserPayeeList> userPayeeRepository,
            ICuGenericRepository<PersonalPayee> personalPayeeRepository,
            IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository,
            ICuGenericRepository<PaymentClear> paymentClearRepository,
            ICuGenericRepository<ErrorHistory> errorHistoryRepository,
            IMapper mapper)
        {
            _paymentHistoryRepository = paymentHistoryRepository;
            _statusCodeRepository = statusCodeRepository;
            _userPayeeRepository = userPayeeRepository;
            _personalPayeeRepository = personalPayeeRepository;
            _globalPayeeRepository = globalPayeeRepository;
            _paymentClearRepository = paymentClearRepository;
            _errorHistoryRepository = errorHistoryRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<PaymentHistoryResponse>>> GetHistoryFromDate(string memberId, DateTime searchDate)
        {
            var paymentHistories = await _paymentHistoryRepository.GetPaymentHistoryFromDate(memberId, searchDate);
            var payeeNames = new Dictionary<string, string>();
            var response = new List<PaymentHistoryResponse>();
            foreach (var history in paymentHistories)
            {
                var payeeName = history.PayeeName;
                if (string.IsNullOrEmpty(payeeName) &&
                    history.PayeeType != PayeeType.Personal &&
                    !payeeNames.TryGetValue(history.PayeeId, out payeeName))
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == history.PayeeId);
                    payeeName = globalPayee?.PayeeName;
                    payeeNames.Add(history.PayeeId, payeeName);
                }

                var responseHistory = _mapper.Map<PaymentHistoryResponse>(history);
                responseHistory.PayeeName = payeeName;
                responseHistory.SortName = $"{responseHistory.NickName}{responseHistory.PayeeName}";
                response.Add(responseHistory);
            }

            var sortedResponse = response.OrderBy(x => x.SortName).ToList();

            return new ServiceResponse<List<PaymentHistoryResponse>>
            {
                Object = sortedResponse,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<List<PayeeHistoryResponse>>> GetPayeeHistory(string memberId, string userPayeeListId)
        {
            var dataPayeeHistories = await _paymentHistoryRepository.FindAsync(x => x.UserPayeeListId == userPayeeListId && x.MemberId == memberId);
            var payeeHistoryList = new List<PayeeHistoryResponse>();

            foreach (var dataPayeeHistory in dataPayeeHistories)
            {
                var payeeHistory = new PayeeHistoryResponse()
                {
                    Id = dataPayeeHistory.Id,
                    PaymentId = dataPayeeHistory.PaymentId,
                    UserPayeeListId = dataPayeeHistory.UserPayeeListId,
                    MemberId = dataPayeeHistory.MemberId,
                    FundingAccount = dataPayeeHistory.FundingAccount,
                    Amount = dataPayeeHistory.Amount,
                    CheckNum = dataPayeeHistory.CheckNum,
                    WillProcessDate = dataPayeeHistory.WillProcessDate,
                    ProcessedDate = dataPayeeHistory.ProcessedDate,
                    FailedDate = dataPayeeHistory.FailedDate,
                    CancelledDate = dataPayeeHistory.CancelledDate,
                    RecurringPaymentId = dataPayeeHistory.RecurringPaymentId,
                    StatusCode = dataPayeeHistory.StatusCode,
                    Memo = dataPayeeHistory.Memo,
                    EntryDate = dataPayeeHistory.EntryDate,
                    DeliveryDate = dataPayeeHistory.DeliveryDate,
                    SourceApplication = dataPayeeHistory.SourceApplication,
                    PayeeId = dataPayeeHistory.PayeeId,
                    UsersAccountAtPayee = dataPayeeHistory.UsersAccountAtPayee,
                    NameOnAccount = dataPayeeHistory.NameOnAccount,
                    PaymentMethod = dataPayeeHistory.PaymentMethod,
                    RunId = dataPayeeHistory.RunId,
                    ConfirmationNumber = dataPayeeHistory.ConfirmationNumber
                };

                payeeHistoryList.Add(payeeHistory);
            }

            return new ServiceResponse<List<PayeeHistoryResponse>>
            {
                Object = payeeHistoryList,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<PaymentInquiryResponse>> GetPayment(string memberId, string paymentId)
        {
            var history = await _paymentHistoryRepository.GetPaymentInquiry(paymentId, memberId);

            if (history == null)
            {
                return new ServiceResponse<PaymentInquiryResponse>
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            var response = _mapper.Map<PaymentInquiryResponse>(history);

            if (string.IsNullOrWhiteSpace(history.PayeeName))
            {
                var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == history.PayeeId);
                if (globalPayee != null)
                {
                    response.PayeeName = globalPayee.PayeeName;
                    response.PayeeAddress1 = globalPayee.AddressLine1;
                    response.PayeeAddress2 = globalPayee.AddressLine2;
                    response.PayeeCity = globalPayee.City;
                    response.PayeeState = globalPayee.State;
                    response.PayeeZipCode = globalPayee.ZipCode;
                    response.PayeePhone = globalPayee.PhoneNumber;
                }
            }

            return new ServiceResponse<PaymentInquiryResponse>
            {
                Object = response,
                StatusCode = StatusCodes.Status200OK
            };
        }
    }
}
