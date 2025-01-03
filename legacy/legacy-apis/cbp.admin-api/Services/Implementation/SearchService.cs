using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Requests;
using Responses;
using RestSharp;
using Services.Abstract;


namespace Services.Implementation
{
    public class SearchService : ISearchService
    {
        private readonly IWarehouseGenericRepository<CreditUnion> _creditUnionRepository;
        private readonly ILogger<SearchService> _logger;

        public SearchService(IWarehouseGenericRepository<CreditUnion> creditUnionRepository, ILogger<SearchService> logger)
        {
            _creditUnionRepository = creditUnionRepository;
            _logger = logger;
        }

        public async Task<ServiceResponse<PaymentInformationSearchResponse>> SearchAsync(PaymentInformationSearchRequest request)
        {
            var creditUnions = (await _creditUnionRepository.FindAsync(x => !x.Deleted && request.SponsorIds.Contains(x.SponsorId))).ToList();

            if (request.SponsorIds == null || request.SponsorIds?.Count < 1 || creditUnions.Count == 0)
            {
                return new ServiceResponse<PaymentInformationSearchResponse>
                {
                    StatusCode = 404,
                    Object = new PaymentInformationSearchResponse
                    {
                        PaymentInformationList = new List<PaymentInformationReport>()
                    }

                };
            }

            var sponsorIds = creditUnions.Select(x => x.SponsorId).ToList();
            _logger.LogInformation($"SearchAsync SponsorIds: {string.Join(",", sponsorIds)}");

            var paymentInformationItems = new ConcurrentBag<PaymentInformationReport>();
            var parallelOptions = new ParallelOptions() { MaxDegreeOfParallelism = 20 };

            await Parallel.ForEachAsync(creditUnions, parallelOptions, async (creditUnion, token) =>
            {
                var client = new RestClient($"{creditUnion.AdminUrl}");
                var restRequest = new RestRequest
                {
                    Method = Method.Post,
                    Resource = $"/api/v1/search/payment-information",
                };

                restRequest.AddJsonBody(request);

                var restResponse = await client.ExecuteAsync(restRequest, token);

                if (restResponse.IsSuccessful)
                {
                    var response = JsonConvert.DeserializeObject<PaymentInformationSearchResponse>(restResponse.Content);
                    if (response?.PaymentInformationList?.Count > 0)
                    {
                        foreach (var payment in response.PaymentInformationList)
                        {
                            payment.SponsorName = creditUnion.SponsorName;
                            paymentInformationItems.Add(payment);
                        }
                    }
                }
                else
                {
                    _logger.LogError($"Call to '{creditUnion.AdminUrl}/api/v1/search/payment-information' was unsuccessful for: {creditUnion.SponsorId}");
                }
            });

            return new ServiceResponse<PaymentInformationSearchResponse>
            {
                StatusCode = 200,
                Object = new PaymentInformationSearchResponse
                {
                    PaymentInformationList = paymentInformationItems.ToList()
                }
            };
        }
    }
}