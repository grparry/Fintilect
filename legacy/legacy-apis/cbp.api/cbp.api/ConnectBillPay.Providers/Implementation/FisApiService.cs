using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Classes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;

namespace ConnectBillPay.Services.Implementation
{
    public class FisApiService : IFisApiService
    {
        private readonly ILogger<FisApiService> _logger;
        private readonly IConfiguration _configuration; // TODO replace with DB config

        public FisApiService(ILogger<FisApiService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<CheckImageResponse>> GetCheckImage(FisCheckImageGetRequest request)
        {
            _logger.LogDebug($"Calling into Fis-Api to get check image");

            var client = new RestClient(_configuration["FisApiUrl"]);

            var restRequest = new RestRequest
            {
                Method = Method.Post,
                Resource = $"/api/v1/fis/check-image"
            };

            restRequest.AddJsonBody(request);

            var response = await client.ExecuteAsync<CheckImageResponse>(restRequest);

            _logger.LogDebug($"Finished calling into Fis-Api to get check image, StatusCode: {response.StatusCode}");

            if (!response.IsSuccessful || response.StatusCode != HttpStatusCode.OK)
            {
                return new ServiceResponse<CheckImageResponse>
                {
                    StatusCode = (int)response.StatusCode
                };
            }

            return new ServiceResponse<CheckImageResponse>
            {
                StatusCode = (int)response.StatusCode,
                Object = response.Data
            };
        }

        public async Task<GetFisPayeeByFactorResponse> GetPayeeByFactor(GetFisPayeeByFactorRequest factorRequest)
        {
            try
            {
                var threeFactorResponse = await GetPayeeThreeFactor(factorRequest);

                if (threeFactorResponse != null && !string.IsNullOrWhiteSpace(threeFactorResponse.PayeeId))
                {
                    return threeFactorResponse;
                }

                var sixFactorResponse = await GetPayeeSixFactor(factorRequest);
                return sixFactorResponse;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred during GetPayeeByFactor with PayeeName: {factorRequest.PayeeName}, UserAccountAtPayee: {factorRequest.UsersAccountAtPayee} " +
                                 $"Address1: {factorRequest.Address1}, City: {factorRequest.City}, State: {factorRequest.State}, ZipCode: {factorRequest.ZipCode}");
                return null;
            }
        }

        public async Task<GetFisPayeeByFactorResponse> DoesPayeeExistAtFis(GetFisPayeeByFactorRequest factorRequest)
        {
            _logger.LogDebug($"Calling into Fis-Api to payee-exist");

            var client = new RestClient(_configuration["FisApiUrl"]);

            var request = new RestRequest
            {
                Method = Method.Get,
                Resource = $"/api/v1/fis/payee-exist/{factorRequest.PayeeName}/{factorRequest.UsersAccountAtPayee}/{factorRequest.ZipCode}",
            };

            var response = await client.ExecuteAsync(request);

            _logger.LogDebug($"Finished calling into Fis-Api to payee-exist");

            if (!response.IsSuccessful)
            {
                return null;
            }

            var factorResponse = JsonConvert.DeserializeObject<GetFisPayeeByFactorListResponse>(response.Content);
            return factorResponse?.PayeeDetails.FirstOrDefault();
        }

        public async Task<bool> GetStatus()
        {
            try
            {
                var client = new RestClient(_configuration["FisApiUrl"]);

                var request = new RestRequest
                {
                    Method = Method.Get,
                    Resource = $"/api/v1/fis/status",
                };

                var response = await client.ExecuteAsync(request);

                return response.StatusCode == HttpStatusCode.OK;
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"An error occurred during {nameof(GetStatus)}");
                return false;
            }
        }

        private async Task<GetFisPayeeByFactorResponse> GetPayeeThreeFactor(GetFisPayeeByFactorRequest factorRequest)
        {
            _logger.LogDebug($"Calling into Fis-Api to get payee by 3 factor");

            var client = new RestClient(_configuration["FisApiUrl"]);

            var request = new RestRequest
            {
                Method = Method.Get,
                Resource = $"/api/v1/fis/payees-three-factor/{factorRequest.PayeeName}/{factorRequest.UsersAccountAtPayee}/{factorRequest.ZipCode}",
            };

            var response = await client.ExecuteAsync(request);

            _logger.LogDebug($"Finished calling into Fis-Api to get payee by 3 factor");

            if (!response.IsSuccessful)
            {
                return null;
            }

            var factorResponse = JsonConvert.DeserializeObject<GetFisPayeeByFactorListResponse>(response.Content);
            return factorResponse?.PayeeDetails.FirstOrDefault();
        }

        private async Task<GetFisPayeeByFactorResponse> GetPayeeSixFactor(GetFisPayeeByFactorRequest factorRequest)
        {
            _logger.LogDebug($"Calling into Fis-Api to get payee by 6 factor");

            var client = new RestClient(_configuration["FisApiUrl"]);

            var request = new RestRequest
            {
                Method = Method.Post,
                Resource = $"/api/v1/fis/payees-six-factor",
            };

            request.AddJsonBody(factorRequest);

            var response = await client.ExecuteAsync(request);

            _logger.LogDebug($"Finished calling into Fis-Api to get payee by 6 factor");

            if (!response.IsSuccessful)
            {
                return null;
            }

            var factorResponse = JsonConvert.DeserializeObject<GetFisPayeeByFactorListResponse>(response.Content);
            return factorResponse?.PayeeDetails.FirstOrDefault();
        }
    }
}
