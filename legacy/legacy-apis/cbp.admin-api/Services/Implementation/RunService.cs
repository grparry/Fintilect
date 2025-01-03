using ConnectBillPay.Core.AdminCuApi;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Microsoft.Extensions.Logging;
using Requests;
using Services.Abstract;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;

namespace Services.Implementation
{
    public class RunService : IRunService
    {
        private readonly IWarehouseGenericRepository<CreditUnion> _creditUnionRepository;
        private readonly ILogger<RunService> _logger;

        public RunService(IWarehouseGenericRepository<CreditUnion> creditUnionRepository,
            ILogger<RunService> logger)
        {
            _creditUnionRepository = creditUnionRepository;
            _logger = logger;
        }

        public async Task<ServiceResponse> CreateManualRunAsync(ManualRunCreateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.SponsorId))
            {
                return new ServiceResponse
                {
                    StatusCode = 400
                };
            }

            var client = await CreateApiClient(request.SponsorId);
            if (client == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            var response = await client.CreateManualRunAsync(request.ProcessDate.Value, request.ReprocessOnly);
            return new ServiceResponse
            {
                StatusCode = response.StatusCode
            };
        }

        private async Task<AdminCuApiClient?> CreateApiClient(string sponsorId)
        {
            var client = await _creditUnionRepository.GetAdminCuApiClientAsync(sponsorId);

            if (client == null)
            {
                _logger.LogError($"No Credit Union found for sponsor Id: {sponsorId}");
                return null;
            }

            return client;
        }
    }
}
