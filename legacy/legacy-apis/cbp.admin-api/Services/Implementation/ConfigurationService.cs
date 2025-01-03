using ConnectBillPay.Core.AdminCuApi;
using ConnectBillPay.Core.Api;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Requests;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly IWarehouseGenericRepository<CreditUnion> _creditUnionRepository;

        public ConfigurationService(IWarehouseGenericRepository<CreditUnion> creditUnionRepository)
        {
            _creditUnionRepository = creditUnionRepository;
        }

        public async Task<ServiceResponse> RefreshAsync(ConfigurationRefreshRequest request)
        {
            var apiClient = await _creditUnionRepository.GetApiClientAsync(request.SponsorId);
            var adminApiClient = await _creditUnionRepository.GetAdminCuApiClientAsync(request.SponsorId);
            if (apiClient == null || adminApiClient == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            var apiResponse = await apiClient.RefreshConfigurationAsync();
            var adminApiResponse = await adminApiClient.RefreshConfigurationAsync();

            if (apiResponse.StatusCode != 200 ||
                adminApiResponse.StatusCode != 200)
            {
                return new ServiceResponse
                {
                    StatusCode = 500
                };
            }

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }
    }
}
