using System;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using RestSharp;
using Services.Api.Model;

namespace Services.Api
{
    public class ApiClient
    {
        private readonly string _apiBaseUrl;

        public ApiClient(string apiBaseUrl)
        {
            _apiBaseUrl = apiBaseUrl;
        }

        public Task<ServiceResponse> CreateManualRunAsync(DateTime processDate, bool reprocessOnly)
        {
            var request = new ManualRunCreateRequest
            {
                ProcessDate = processDate,
                ReprocessOnly = reprocessOnly
            };

            return PostAsync("api/v1/run/manual", request);
        }

        public Task<ServiceResponse> ReprocessPaymentAsync(string? paymentId)
        {
            var request = new PaymentReprocessRequest
            {
                PaymentId = paymentId
            };

            return PostAsync("api/v1/payment/reprocess", request);
        }

        public Task<ServiceResponse> UpdatePaymentStatusAsync(string? paymentId, int statusCode)
        {
            var request = new PaymentUpdateStatusRequest
            {
                PaymentId = paymentId,
                StatusCode = statusCode
            };

            return PostAsync("api/v1/payment/status", request);
        }

        public Task<ServiceResponse> UpdateFisPayeeIdAsync(string? userPayeeListId, string? fisPayeeId)
        {
            var request = new UserPayeeUpdateFisPayeeIdRequest
            {
                UserPayeeListId = userPayeeListId,
                FisPayeeId = fisPayeeId
            };

            return PostAsync("api/v1/payee/user/fis-payee-id", request);
        }

        public Task<ServiceResponse> UpdateUserPayeeAccountNumberAsync(string? userPayeeListId, string? accountNumber)
        {
            var request = new UserPayeeUpdateAccountNumberRequest
            {
                UserPayeeListId = userPayeeListId,
                AccountNumber = accountNumber
            };

            return PostAsync("api/v1/payee/user/account-number", request);
        }

        private async Task<ServiceResponse> PostAsync(string resource, object? body = null)
        {
            var client = new RestClient(_apiBaseUrl);
            var request = new RestRequest
            {
                Resource = resource,
                Method = Method.Post
            };

            if (body != null)
            {
                request.AddJsonBody(body);
            }

            var response = await client.ExecuteAsync(request);

            return new ServiceResponse
            {
                StatusCode = (int)response.StatusCode,
                Error = response.ErrorMessage
            };
        }
    }
}