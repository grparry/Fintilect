using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Requests.PaymentHistory;
using Responses.PaymentHistory;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class PaymentHistoryService : IPaymentHistoryService
    {
        private readonly ICuGenericRepository<PaymentHistory> _paymentHistoryRepository;
        private readonly ICuGenericRepository<UserPayeeList> _userPayeeRepository;
        private readonly ICuGenericRepository<PersonalPayee> _personalPayeeRepository;
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly ICuGenericRepository<ErrorHistory> _errorHistoryRepository;

        public PaymentHistoryService(ICuGenericRepository<PaymentHistory> paymentHistoryRepository,
            ICuGenericRepository<UserPayeeList> userPayeeRepository,
            ICuGenericRepository<PersonalPayee> personalPayeeRepository,
            IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository,
            ICuGenericRepository<ErrorHistory> errorHistoryRepository)
        {
            _paymentHistoryRepository = paymentHistoryRepository;
            _userPayeeRepository = userPayeeRepository;
            _personalPayeeRepository = personalPayeeRepository;
            _globalPayeeRepository = globalPayeeRepository;
            _errorHistoryRepository = errorHistoryRepository;
        }

        public async Task<ServiceResponse<ErrorHistoryListResponse>> ErrorHistory(ErrorHistoryReportRequest request)
        {
            var response = new List<ErrorHistoryResponse>();
            switch (request.SearchType)
            {
                case ErrorHistorySearchType.PaymentId:
                    return await GetHistoryFromPaymentId(request.SearchValue.TrimStart().TrimEnd());
                case ErrorHistorySearchType.MemberId:
                    return await GetHistoryFromMemberId(request.SearchValue.TrimStart().TrimEnd());
                case ErrorHistorySearchType.UserPayeeListId:
                    return await GetHistoryFromUserPayeeListId(request.SearchValue.TrimStart().TrimEnd());
                case ErrorHistorySearchType.StatusCode:
                    return await GetHistoryFromStatusCode(int.Parse(request.SearchValue.TrimStart().TrimEnd()));
                case ErrorHistorySearchType.Date:
                    var date = DateTime.ParseExact(request.SearchValue.TrimStart().TrimEnd(), "yyyyMMdd", System.Globalization.CultureInfo.CurrentCulture);
                    return await GetHistoryFromDate(date);
                case ErrorHistorySearchType.PayeeId:
                    return await GetHistoryFromPayeeId(request.SearchValue.TrimStart().TrimEnd());
                case ErrorHistorySearchType.PayeeName:
                    return await GetHistoryFromPayeeName(request.SearchValue.TrimStart().TrimEnd());
            }

            return new ServiceResponse<ErrorHistoryListResponse>
            {
                StatusCode = 200,
                Object = new ErrorHistoryListResponse
                {
                    ErrorHistories = response
                }
            };
        }

        public async Task<ServiceResponse<ErrorHistoryListResponse>> GetErrorHistoryResponse(List<ErrorHistoryReport> errorHistories)
        {
            var response = new List<ErrorHistoryResponse>();
            foreach (var record in errorHistories)
            {
                if (string.IsNullOrEmpty(record.PayeeName))
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == record.PayeeId);
                    if (globalPayee != null)
                    {
                        record.PayeeName = globalPayee.PayeeName;
                    }
                }
                response.Add(new ErrorHistoryResponse
                {
                    FailedDate = record.FailedDate,
                    MemberId = record.MemberId,
                    PaymentId = record.PaymentId,
                    Amount = record.Amount,
                    PayeeId = record.PayeeId,
                    PayeeName = record.PayeeName,
                    UserPayeeListId = record.UserPayeeListId,
                    UsersAccountAtPayee = record.UsersAccountAtPayee,
                    NameOnAccount = record.NameOnAccount,
                    Status = record.Status,
                    HostCode = record.HostCode,
                    Error = record.Error
                });
            }

            return new ServiceResponse<ErrorHistoryListResponse>
            {
                StatusCode = 200,
                Object = new ErrorHistoryListResponse
                {
                    ErrorHistories = response
                }
            };
        }
        public async Task<ServiceResponse<ErrorHistoryListResponse>> GetHistoryFromPaymentId(string paymentId)
        {
            var errorHistories = await _paymentHistoryRepository.GetErrorHistoryFromPaymentId(paymentId);
            return await GetErrorHistoryResponse(errorHistories);
        }

        public async Task<ServiceResponse<ErrorHistoryListResponse>> GetHistoryFromMemberId(string memberId)
        {
            var errorHistories = await _paymentHistoryRepository.GetErrorHistoryFromMemberId(memberId);
            return await GetErrorHistoryResponse(errorHistories);
        }

        public async Task<ServiceResponse<ErrorHistoryListResponse>> GetHistoryFromUserPayeeListId(string userPayeeListId)
        {
            var errorHistories = await _paymentHistoryRepository.GetErrorHistoryFromUserPayeeListId(userPayeeListId);
            return await GetErrorHistoryResponse(errorHistories);
        }

        public async Task<ServiceResponse<ErrorHistoryListResponse>> GetHistoryFromStatusCode(int statusCode)
        {
            var errorHistories = await _paymentHistoryRepository.GetErrorHistoryFromStatusCode(statusCode);
            return await GetErrorHistoryResponse(errorHistories);
        }

        public async Task<ServiceResponse<ErrorHistoryListResponse>> GetHistoryFromDate(DateTime runDate)
        {
            var errorHistories = await _paymentHistoryRepository.GetErrorHistoryFromDate(runDate);
            return await GetErrorHistoryResponse(errorHistories);
        }

        public async Task<ServiceResponse<ErrorHistoryListResponse>> GetHistoryFromPayeeId(string payeeId)
        {
            var errorHistories = await _paymentHistoryRepository.GetErrorHistoryFromPayeeId(payeeId);
            return await GetErrorHistoryResponse(errorHistories);
        }

        public async Task<ServiceResponse<ErrorHistoryListResponse>> GetHistoryFromPayeeName(string payeeName)
        {
            var response = new List<ErrorHistoryResponse>();
            var payees = (from ph in await _personalPayeeRepository.FindAsync(x => x.PayeeName == payeeName)
                          select new { ph.PayeeId }).ToList();
            var globalPayees = (from ph in await _globalPayeeRepository.FindAsync(x => x.PayeeName == payeeName)
                                select new { PayeeId = ph.InternalPayeeId }).ToList();

            payees.AddRange(globalPayees);

            var ids = (from seh in await _errorHistoryRepository.AllAsync()
                       join sup in await _userPayeeRepository.AllAsync()
                           on seh.UserPayeeListId.TrimStart().TrimEnd() equals sup.Id.TrimStart().TrimEnd()
                       join sp in payees on sup.PayeeId.TrimStart().TrimEnd() equals sp.PayeeId.TrimStart().TrimEnd()
                       group seh by seh.Id into sub1
                       select new { Id = sub1.Key }).ToList();

            var errorHistory = await _paymentHistoryRepository.GetErrorHistory();

            var errorHistories = (from q1 in ids
                                  join q2 in errorHistory on q1.Id equals q2.Id
                                  select new ErrorHistoryResponse
                                  {
                                      FailedDate = q2.FailedDate,
                                      MemberId = q2.MemberId,
                                      PaymentId = q2.PaymentId,
                                      Amount = q2.Amount,
                                      PayeeId = q2.PayeeId,
                                      PayeeName = q2.PayeeName,
                                      UsersAccountAtPayee = q2.UsersAccountAtPayee,
                                      UserPayeeListId = q2.UserPayeeListId,
                                      NameOnAccount = q2.NameOnAccount,
                                      Status = q2.Status,
                                      HostCode = q2.HostCode,
                                      Error = q2.Error
                                  }).ToList();

            foreach (var record in errorHistories)
            {
                if (string.IsNullOrEmpty(record.PayeeName))
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == record.PayeeId);
                    if (globalPayee != null)
                    {
                        record.PayeeName = globalPayee.PayeeName;
                    }
                }
                response.Add(record);
            }

            return new ServiceResponse<ErrorHistoryListResponse>
            {
                StatusCode = 200,
                Object = new ErrorHistoryListResponse
                {
                    ErrorHistories = response
                }
            };
        }

        public async Task<ServiceResponse<LargePaymentListResponse>> GetLargePayments(string runDate)
        {
            var date = DateTime.ParseExact(runDate.TrimStart().TrimEnd(), "yyyyMMdd", System.Globalization.CultureInfo.CurrentCulture);
            var response = new List<LargePaymentResponse>();

            var payments = await _paymentHistoryRepository.GetLargePayments(date);

            foreach (var record in payments)
            {
                if (string.IsNullOrEmpty(record.PayeeName))
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == record.PayeeId);
                    if (globalPayee != null)
                    {
                        record.PayeeName = globalPayee.PayeeName;
                    }
                }
                response.Add(new LargePaymentResponse
                {
                    MemberId = record.MemberId,
                    Amount = record.Amount,
                    PayeeName = record.PayeeName,
                    Status = record.Status
                });
            }

            return new ServiceResponse<LargePaymentListResponse>
            {
                StatusCode = 200,
                Object = new LargePaymentListResponse
                {
                    Payments = response
                }
            };
        }
    }
}
