using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Requests.Search;
using Responses.Search;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class SearchService : ISearchService
    {
        private readonly ICuGenericRepository<Payment> _paymentRepository;
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;

        public SearchService(ICuGenericRepository<Payment> paymentRepository,
            IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository)
        {
            _paymentRepository = paymentRepository;
            _globalPayeeRepository = globalPayeeRepository;
        }

        public async Task<ServiceResponse<ErrorHistorySearchListResponse>> SearchErrorHistory(SearchRequest request)
        {
            var errors = await _paymentRepository.BillpaySearchErrorHistory(request.SearchType, request.SearchValue);
            return new ServiceResponse<ErrorHistorySearchListResponse>
            {
                StatusCode = 200,
                Object = new ErrorHistorySearchListResponse
                {
                    Errors = errors
                }
            };
        }

        public async Task<ServiceResponse<NickNameSearchListResponse>> SearchNickName(SearchRequest request)
        {
            var nickNames = await _paymentRepository.BillpaySearchNickName(request.SearchType, request.SearchValue);
            return new ServiceResponse<NickNameSearchListResponse>
            {
                StatusCode = 200,
                Object = new NickNameSearchListResponse
                {
                    NickNames = nickNames
                }
            };
        }

        public async Task<ServiceResponse<PayeeSearchListResponse>> SearchPayee(SearchRequest request)
        {
            var payees = await _paymentRepository.BillpaySearchPayee(request.SearchType, request.SearchValue);
            var globalPayees = new Dictionary<string, GlobalPayee>();
            var response = new List<PayeeSearchReport>();

            foreach (var payee in payees)
            {
                if (payee.Scope == PayeeType.Personal)
                {
                    response.Add(payee);
                    continue;
                }

                if (!globalPayees.TryGetValue(payee.PayeeId, out var globalPayee))
                {
                    globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == payee.PayeeId);
                    if (globalPayee == null)
                    {
                        continue;
                    }
                    globalPayees[payee.PayeeId] = globalPayee;
                }

                payee.Address1 = globalPayee.AddressLine1;
                payee.Address2 = globalPayee.AddressLine2;
                payee.City = globalPayee.City;
                payee.Country = globalPayee.CountryCode;
                payee.Name = globalPayee.PayeeName;
                payee.Phone = globalPayee.PhoneNumber;
                payee.State = globalPayee.State;
                payee.ZipCode = globalPayee.ZipCode;
                response.Add(payee);
            }

            return new ServiceResponse<PayeeSearchListResponse>
            {
                StatusCode = 200,
                Object = new PayeeSearchListResponse
                {
                    Payees = response
                }
            };
        }

        public async Task<ServiceResponse<PaymentSearchListResponse>> SearchPayment(SearchRequest request)
        {
            var payments = await _paymentRepository.BillpaySearchPayment(request.SearchType, request.SearchValue);
            return new ServiceResponse<PaymentSearchListResponse>
            {
                StatusCode = 200,
                Object = new PaymentSearchListResponse
                {
                    Payments = payments
                }
            };
        }

        public async Task<ServiceResponse<PaymentClearSearchListResponse>> SearchPaymentClear(SearchRequest request)
        {
            var clears = await _paymentRepository.BillpaySearchPaymentClear(request.SearchType, request.SearchValue);
            return new ServiceResponse<PaymentClearSearchListResponse>
            {
                StatusCode = 200,
                Object = new PaymentClearSearchListResponse
                {
                    PaymentClears = clears
                }
            };
        }

        public async Task<ServiceResponse<PaymentHistorySearchListResponse>> SearchPaymentHistory(SearchRequest request)
        {
            var histories = await _paymentRepository.BillpaySearchPaymentHistory(request.SearchType, request.SearchValue);
            return new ServiceResponse<PaymentHistorySearchListResponse>
            {
                StatusCode = 200,
                Object = new PaymentHistorySearchListResponse
                {
                    Histories = histories
                }
            };
        }

        public async Task<ServiceResponse<RecurringPaymentSearchListResponse>> SearchRecurringPayment(SearchRequest request)
        {
            var recurring = await _paymentRepository.BillpaySearchRecurringPayment(request.SearchType, request.SearchValue);
            return new ServiceResponse<RecurringPaymentSearchListResponse>
            {
                StatusCode = 200,
                Object = new RecurringPaymentSearchListResponse
                {
                    RecurringPayments = recurring
                }
            };
        }

        public async Task<ServiceResponse<UserPayeeListSearchListResponse>> SearchUserPayeeList(SearchRequest request)
        {
            var userPayeeLists = await _paymentRepository.BillpaySearchUserPayeeList(request.SearchType, request.SearchValue);
            return new ServiceResponse<UserPayeeListSearchListResponse>
            {
                StatusCode = 200,
                Object = new UserPayeeListSearchListResponse
                {
                    UserPayeeLists = userPayeeLists
                }
            };
        }

        public async Task<ServiceResponse<PaymentInformationSearchResponse>> PaymentInformationSearchAsync(PaymentInformationSearchRequest request)
        {
            var expression = BuildSearchExpression(request);

            var paymentList = (await _paymentRepository.GetPaymentInformationAsync(expression));

            foreach (var payment in paymentList)
            {
                if (payment.PayeeType == PayeeType.Global)
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == payment.PayeeId);
                    if (globalPayee != null)
                    {
                        payment.PayeeName = globalPayee.PayeeName;
                    }
                }
            }

            return new ServiceResponse<PaymentInformationSearchResponse>
            {
                StatusCode = 200,
                Object = new PaymentInformationSearchResponse
                {
                    PaymentInformationList = paymentList
                }
            };
        }

        private static Expression<Func<PaymentInformationReport, bool>> BuildSearchExpression(PaymentInformationSearchRequest request)
        {
            var parameter = Expression.Parameter(typeof(PaymentInformationReport), "x");
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

            if (request.UserPayeeListId != null)
            {
                expression = AppendAndAlsoExpression(expression, GetUserPayeeListIdExpression(parameter, request.UserPayeeListId));
            }

            if (request.FisPayeeId != null)
            {
                expression = AppendAndAlsoExpression(expression, GetFisPayeeIdExpression(parameter, request.FisPayeeId));
            }

            if (request.ResolutionTypes != null && request.ResolutionTypes.Count > 0)
            {
                expression = AppendAndAlsoExpression(expression, GetResolutionTypesExpression(parameter, request.ResolutionTypes));
            }

            if (request.ProblemCauseTypes != null && request.ProblemCauseTypes.Count > 0)
            {
                expression = AppendAndAlsoExpression(expression, GetProblemCauseTypesExpression(parameter, request.ProblemCauseTypes));
            }

            if (request.StatusCodes != null && request.StatusCodes.Count > 0)
            {
                expression = AppendAndAlsoExpression(expression, GetStatusCodesExpression(parameter, request.StatusCodes));
            }

            if (expression == null)
            {
                throw new InvalidOperationException("No search parameters specified");
            }

            return Expression.Lambda<Func<PaymentInformationReport, bool>>(expression, parameter);
        }

        private static Expression AppendAndAlsoExpression(Expression current, Expression value)
        {
            if (current == null)
            {
                return value;
            }
            return Expression.AndAlso(current, value);
        }

        private static Expression AppendOrElseExpression(Expression current, Expression value)
        {
            if (current == null)
            {
                return value;
            }
            return Expression.OrElse(current, value);
        }

        private static Expression GetDateRangeExpression(ParameterExpression parameter, DateTime startDate, DateTime endDate)
        {
            var memberInfo = GetMember((PaymentInformationReport x) => x.WillProcessDate);
            var dateMemberInfo = GetMember((DateTime x) => x.Date);

            var accessCreatedDate = Expression.MakeMemberAccess(Expression.MakeMemberAccess(parameter, memberInfo), dateMemberInfo);
            var greaterThanOrEqualStart = Expression.GreaterThanOrEqual(accessCreatedDate, Expression.Constant(startDate.Date));
            var lessThanEndStart = Expression.LessThan(accessCreatedDate, Expression.Constant(endDate.Date.AddDays(1)));

            return Expression.AndAlso(greaterThanOrEqualStart, lessThanEndStart);
        }

        private static Expression GetResolutionTypesExpression(ParameterExpression parameter, List<string> resolutionTypes)
        {
            var memberInfo = GetMember((PaymentInformationReport x) => x.ResolutionType);
            var accessExpression = Expression.MakeMemberAccess(parameter, memberInfo);

            Expression conditionExpression = null;
            foreach (var resolutionType in resolutionTypes)
            {
                conditionExpression = AppendOrElseExpression(conditionExpression, Expression.Equal(accessExpression, Expression.Constant(resolutionType)));
            }
            return conditionExpression;
        }

        private static Expression GetProblemCauseTypesExpression(ParameterExpression parameter, List<string> problemCauseTypes)
        {
            var memberInfo = GetMember((PaymentInformationReport x) => x.ProblemCauseType);
            var accessExpression = Expression.MakeMemberAccess(parameter, memberInfo);

            Expression conditionExpression = null;
            foreach (var problemCauseType in problemCauseTypes)
            {
                conditionExpression = AppendOrElseExpression(conditionExpression, Expression.Equal(accessExpression, Expression.Constant(problemCauseType)));
            }
            return conditionExpression;
        }

        private static Expression GetStatusCodesExpression(ParameterExpression parameter, List<int> statusCodes)
        {
            var memberInfo = GetMember((PaymentInformationReport x) => x.StatusCode);
            var accessExpression = Expression.MakeMemberAccess(parameter, memberInfo);

            Expression conditionExpression = null;
            foreach (var statusCode in statusCodes)
            {
                conditionExpression = AppendOrElseExpression(conditionExpression, Expression.Equal(accessExpression, Expression.Constant(statusCode)));
            }
            return conditionExpression;
        }

        private static Expression GetPaymentIdExpression(ParameterExpression parameter, string paymentId)
        {
            var memberInfo = GetMember((PaymentInformationReport x) => x.PaymentId);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(paymentId));
        }

        private static Expression GetMemberIdExpression(ParameterExpression parameter, string memberId)
        {
            var memberInfo = GetMember((PaymentInformationReport x) => x.MemberId);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(memberId));
        }

        private static Expression GetUserPayeeListIdExpression(ParameterExpression parameter, string userPayeeListId)
        {
            var memberInfo = GetMember((PaymentInformationReport x) => x.UserPayeeListId);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(userPayeeListId));
        }

        private static Expression GetFisPayeeIdExpression(ParameterExpression parameter, string fisPayeeId)
        {
            var memberInfo = GetMember((PaymentInformationReport x) => x.FisPayeeId);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(fisPayeeId));
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
