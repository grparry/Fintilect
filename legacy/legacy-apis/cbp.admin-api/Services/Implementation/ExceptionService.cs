using System;
using System.Linq;
using AutoMapper;
using ConnectBillPay.Core.AdminCuApi;
using ConnectBillPay.Core.Enums;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Microsoft.Extensions.Logging;
using Requests;
using Responses;
using Services.Abstract;
using Services.Api;

using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using System.Collections.Generic;
using ConnectBillPay.Core.Classes;

namespace Services.Implementation
{
    public class ExceptionService : IExceptionService
    {
        private readonly IWarehouseGenericRepository<PaymentException> _paymentExceptionRepository;
        private readonly IMapper _mapper;
        private readonly IWarehouseGenericRepository<FisExceptionsCorrection> _fisExceptionsCorrectionRepository;
        private readonly IWarehouseGenericRepository<CreditUnion> _creditUnionRepository;
        private readonly ILogger<ExceptionService> _logger;

        public ExceptionService(IWarehouseGenericRepository<PaymentException> paymentExceptionRepository,
            IMapper mapper,
            IWarehouseGenericRepository<FisExceptionsCorrection> fisExceptionsCorrectionRepository,
            IWarehouseGenericRepository<CreditUnion> creditUnionRepository,
            ILogger<ExceptionService> logger)
        {
            _paymentExceptionRepository = paymentExceptionRepository;
            _mapper = mapper;
            _fisExceptionsCorrectionRepository = fisExceptionsCorrectionRepository;
            _creditUnionRepository = creditUnionRepository;
            _logger = logger;
        }

        public async Task<ServiceResponse<ExceptionListResponse>> SearchAsync(ExceptionSearchRequest request)
        {
            var expression = BuildSearchExpression(request);

            var results = (await _paymentExceptionRepository.GetExceptionAndCorrectionsAsync(expression))
                .Select(x =>
                {
                    if (x.Correction != null)
                    {
                        var response = _mapper.Map<ExceptionResponse>(x.Correction);
                        _mapper.Map(x.Exception, response);
                        return response;
                    }
                    else
                    {
                        var response = _mapper.Map<ExceptionResponse>(x.Exception);
                        return response;
                    }
                })
                .ToList();

            return new ServiceResponse<ExceptionListResponse>
            {
                StatusCode = 200,
                Object = new ExceptionListResponse
                {
                    Exceptions = results
                }
            };
        }

        public async Task<ServiceResponse> UpdateAsync(ExceptionUpdateRequest request)
        {
            try
            {
                var correction = await _fisExceptionsCorrectionRepository.GetAsync(x => x.FisExceptionId == request.Id);
                if (correction == null)
                {
                    return new ServiceResponse
                    {
                        StatusCode = 404,
                        Error = "The exception could not be found in FisExceptionCorrection table"
                    };
                }

                return request.CorrectionType switch
                {
                    ExceptionCorrectionType.AccountNumber => await UpdateAccountNumberAsync(correction, request),
                    ExceptionCorrectionType.Manual => await UpdateManualAsync(correction, request),
                    ExceptionCorrectionType.MemberRefunded => await UpdateMemberRefundedAsync(correction, request),
                    ExceptionCorrectionType.FisPayeeId => await UpdateFisPayeeIdAsync(correction, request),
                    _ => throw new Exception("Invalid CorrectionType specified"),
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ExceptionService Threw an Exception");
                return new ServiceResponse
                {
                    StatusCode = 500,
                    Error = "An Unexpected Error Occurred"
                };
            }

        }

        private static Expression AppendAndAlsoExpression(Expression? current, Expression value)
        {
            if (current == null)
            {
                return value;
            }
            return Expression.AndAlso(current, value);
        }

        private static Expression AppendOrElseExpression(Expression? current, Expression value)
        {
            if (current == null)
            {
                return value;
            }
            return Expression.OrElse(current, value);
        }

        private static Expression<Func<PaymentExceptionCorrection, bool>> BuildSearchExpression(ExceptionSearchRequest request)
        {
            var parameter = Expression.Parameter(typeof(PaymentExceptionCorrection), "x");
            Expression? expression = null;

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

            if (request.SponsorIds != null &&
                request.SponsorIds.Count > 0)
            {
                expression = AppendAndAlsoExpression(expression, GetSponsorIdExpression(parameter, request.SponsorIds));
            }

            if (request.CorrectionMade != null)
            {
                expression = AppendAndAlsoExpression(expression, GetCorrectionMadeExpression(parameter, request.CorrectionMade.Value));
            }

            if (expression == null)
            {
                throw new InvalidOperationException("No search parameters specified");
            }

            return Expression.Lambda<Func<PaymentExceptionCorrection, bool>>(expression, parameter);
        }

        private static Expression GetDateExpression(ParameterExpression parameter, DateTime date)
        {
            var memberInfo = GetMember((PaymentExceptionCorrection x) => x.Exception);
            var serviceRequestDateMemberInfo = GetMember((PaymentException x) => x.ServiceRequestDate);
            var dateMemberInfo = GetMember((DateTime x) => x.Date);

            return Expression.Equal(Expression.MakeMemberAccess(Expression.MakeMemberAccess(Expression.MakeMemberAccess(parameter, memberInfo), serviceRequestDateMemberInfo), dateMemberInfo), Expression.Constant(date.Date));
        }

        private static Expression GetDateRangeExpression(ParameterExpression parameter, DateTime startDate, DateTime endDate)
        {
            var memberInfo = GetMember((PaymentExceptionCorrection x) => x.Exception);
            var serviceRequestDateMemberInfo = GetMember((PaymentException x) => x.ServiceRequestDate);
            var dateMemberInfo = GetMember((DateTime x) => x.Date);

            var accessCreatedDate = Expression.MakeMemberAccess(Expression.MakeMemberAccess(Expression.MakeMemberAccess(parameter, memberInfo), serviceRequestDateMemberInfo), dateMemberInfo);
            var greaterThanOrEqualStart = Expression.GreaterThanOrEqual(accessCreatedDate, Expression.Constant(startDate.Date));
            var lessThanEndStart = Expression.LessThan(accessCreatedDate, Expression.Constant(endDate.Date.AddDays(1)));

            return Expression.AndAlso(greaterThanOrEqualStart, lessThanEndStart);
        }

        private static Expression GetSponsorIdExpression(ParameterExpression parameter, List<string> sponsorIds)
        {
            var memberInfo = GetMember((PaymentExceptionCorrection x) => x.Exception);
            var sponsorIdMemberInfo = GetMember((PaymentException x) => x.SponsorId);
            var accessExpression = Expression.MakeMemberAccess(Expression.MakeMemberAccess(parameter, memberInfo), sponsorIdMemberInfo);

            Expression conditionExpression = null;
            foreach (var sponsorId in sponsorIds)
            {
                conditionExpression = AppendOrElseExpression(conditionExpression, Expression.Equal(accessExpression, Expression.Constant(sponsorId)));
            }
            return conditionExpression;
        }

        private static Expression GetCorrectionMadeExpression(ParameterExpression parameter, bool correctionMade)
        {
            var memberInfo = GetMember((PaymentExceptionCorrection x) => x.Correction);
            var correctionMadeMemberInfo = GetMember((FisExceptionsCorrection x) => x.CorrectionMade);
            return Expression.Equal(Expression.MakeMemberAccess(Expression.MakeMemberAccess(parameter, memberInfo), correctionMadeMemberInfo), Expression.Constant(correctionMade));
        }

        private static MemberInfo GetMember<T, TMember>(Expression<Func<T, TMember>> expression)
        {
            if (expression.Body is not MemberExpression memberExpression)
            {
                throw new InvalidOperationException("Invalid expression provided");
            }
            return memberExpression.Member;
        }

        private async Task<AdminCuApiClient?> CreatedAdminCuApiClient(string sponsorId)
        {
            var client = await _creditUnionRepository.GetAdminCuApiClientAsync(sponsorId);

            if (client == null)
            {
                _logger.LogError($"No Credit Union found for sponsor Id: {sponsorId}");
                return null;
            }

            return client;
        }

        private async Task<ServiceResponse> UpdateAccountNumberAsync(FisExceptionsCorrection correction, ExceptionUpdateRequest request)
        {
            var exception = await _paymentExceptionRepository.GetAsync(x => x.Id == correction.FisExceptionId);
            var client = await CreatedAdminCuApiClient(exception.SponsorId);

            if (client == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 500,
                    Error = $"The connection to credit union api with sponsor id {exception.SponsorId} could not be made"
                };
            }

            // update account number
            var serviceResponse = await client.UpdateUserPayeeAccountNumberAsync(exception.CustomerPayeeId, request.UsersAccountAtPayee);
            if (serviceResponse.StatusCode != 200)
            {
                _logger.LogError($"Failed to update account number with status code: {serviceResponse.StatusCode}");
                return new ServiceResponse
                {
                    StatusCode = serviceResponse.StatusCode,
                    Error = serviceResponse.Error
                };
            }

            // reprocess payment
            serviceResponse = await client.ReprocessPaymentAsync(exception.SponsorTransactionId);
            if (serviceResponse.StatusCode != 200)
            {
                _logger.LogError($"Failed to mark payment to be reprocessed with status code: {serviceResponse.StatusCode}");
                return new ServiceResponse
                {
                    StatusCode = serviceResponse.StatusCode,
                    Error = serviceResponse.Error
                };
            }

            correction.CorrectionMade = true;
            correction.CorrectionType = (int)ExceptionCorrectionType.AccountNumber;
            correction.CorrectionDate = DateTime.Now;

            _fisExceptionsCorrectionRepository.Update(correction);
            await _fisExceptionsCorrectionRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        private async Task<ServiceResponse> UpdateFisPayeeIdAsync(FisExceptionsCorrection correction, ExceptionUpdateRequest request)
        {
            var exception = await _paymentExceptionRepository.GetAsync(x => x.Id == correction.FisExceptionId);
            var client = await CreatedAdminCuApiClient(exception.SponsorId);

            if (client == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 500,
                    Error = $"The connection to credit union api with sponsor id {exception.SponsorId} could not be made"
                };
            }

            // update FisPayeeId
            var serviceResponse = await client.UpdateFisPayeeIdAsync(exception.CustomerPayeeId, request.FisPayeeId);
            if (serviceResponse.StatusCode != 200)
            {
                _logger.LogError($"Failed to update FisPayeeId with status code: {serviceResponse.StatusCode}");
                return new ServiceResponse
                {
                    StatusCode = serviceResponse.StatusCode,
                    Error = serviceResponse.Error
                };
            }

            // reprocess payment
            serviceResponse = await client.ReprocessPaymentAsync(exception.SponsorTransactionId);
            if (serviceResponse.StatusCode != 200)
            {
                _logger.LogError($"Failed to mark payment to be reprocessed with status code: {serviceResponse.StatusCode}");
                return new ServiceResponse
                {
                    StatusCode = serviceResponse.StatusCode,
                    Error = serviceResponse.Error
                };
            }

            correction.CorrectionMade = true;
            correction.CorrectionType = (int)ExceptionCorrectionType.FisPayeeId;
            correction.CorrectionDate = DateTime.Now;

            _fisExceptionsCorrectionRepository.Update(correction);
            await _fisExceptionsCorrectionRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        private async Task<ServiceResponse> UpdateManualAsync(FisExceptionsCorrection correction, ExceptionUpdateRequest request)
        {
            var exception = await _paymentExceptionRepository.GetAsync(x => x.Id == correction.FisExceptionId);
            var client = await CreatedAdminCuApiClient(exception.SponsorId);

            if (client == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 500,
                    Error = $"The connection to credit union api with sponsor id {exception.SponsorId} could not be made"
                };
            }

            // reprocess payment
            var serviceResponse = await client.ReprocessPaymentAsync(exception.SponsorTransactionId);
            if (serviceResponse.StatusCode != 200)
            {
                _logger.LogError($"Failed to mark payment to be reprocessed with status code: {serviceResponse.StatusCode}");
                return new ServiceResponse
                {
                    StatusCode = serviceResponse.StatusCode,
                    Error = serviceResponse.Error
                };
            }

            correction.CorrectionMade = true;
            correction.CorrectionType = (int)ExceptionCorrectionType.Manual;
            correction.CorrectionDate = DateTime.Now;
            correction.ManualDescription = request.ManualDescription;

            _fisExceptionsCorrectionRepository.Update(correction);
            await _fisExceptionsCorrectionRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        private async Task<ServiceResponse> UpdateMemberRefundedAsync(FisExceptionsCorrection correction, ExceptionUpdateRequest request)
        {
            var exception = await _paymentExceptionRepository.GetAsync(x => x.Id == correction.FisExceptionId);
            var client = await CreatedAdminCuApiClient(exception.SponsorId);

            if (client == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 500,
                    Error = $"The connection to credit union api with sponsor id {exception.SponsorId} could not be made"
                };
            }

            // update status to 201
            var serviceResponse = await client.UpdatePaymentStatusAsync(exception.SponsorTransactionId, 201);
            if (serviceResponse.StatusCode != 200)
            {
                _logger.LogError($"Failed to update payment status with status code: {serviceResponse.StatusCode}");
                return new ServiceResponse
                {
                    StatusCode = serviceResponse.StatusCode,
                    Error = serviceResponse.Error
                };
            }

            correction.CorrectionMade = true;
            correction.CorrectionType = (int)ExceptionCorrectionType.MemberRefunded;
            correction.CorrectionDate = DateTime.Now;

            _fisExceptionsCorrectionRepository.Update(correction);
            await _fisExceptionsCorrectionRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }
    }
}
