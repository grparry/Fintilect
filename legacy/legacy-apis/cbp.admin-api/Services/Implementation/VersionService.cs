using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Responses;
using Services.Abstract;

namespace Services.Implementation
{
    public class VersionService : IVersionService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<VersionService> _logger;
        private readonly IFisApiService _fisApiService;
        private readonly IWarehouseGenericRepository<FisServiceVersion> _fisServiceVersionRepository;

        public VersionService(IConfiguration configuration, ILogger<VersionService> logger, IFisApiService fisApiService, IWarehouseGenericRepository<FisServiceVersion> fisServiceVersionRepository)
        {
            _configuration = configuration;
            _logger = logger;
            _fisApiService = fisApiService;
            _fisServiceVersionRepository = fisServiceVersionRepository;
        }

        public async Task<ServiceResponse<AdminVersionResponse>> GetVersionAsync()
        {
            var versionResponse = new AdminVersionResponse();
            try
            {
                versionResponse = await GetFileInfo();
                versionResponse.AdminApi = GetAdminApiVersion();
                versionResponse.FisApi = (await _fisApiService.GetVersion()).Version;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting the version information GetVersionAsync");
                return new ServiceResponse<AdminVersionResponse>
                {
                    StatusCode = 200,
                    Error = "Error getting version information",
                    Object = new AdminVersionResponse()
                };
            }
            
            return new ServiceResponse<AdminVersionResponse>
            {
                StatusCode = 200,
                Object = versionResponse
            };
        }

        private async Task<AdminVersionResponse> GetFileInfo()
        {
            try
            {
                
                var versions = (await _fisServiceVersionRepository.AllAsync()).FirstOrDefault();
                if (versions == null)
                {
                    return new AdminVersionResponse();
                }

                return new AdminVersionResponse
                {
                    FisPaymentProcessor = versions!.FisPaymentProcessing,
                    FisIncoming = versions.FisIncomingFiles,
                    MerchantDetailProcessing = versions.FisMerchantDetails
                };

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting the version information GetFileInfo");
                return new AdminVersionResponse();
            }
        }

        private string GetAdminApiVersion()
        {
            var currentAssembly = Assembly.GetEntryAssembly().Location;
            if (currentAssembly == null)
            {
                return null;
            }
            var fileVersionInfo = FileVersionInfo.GetVersionInfo(currentAssembly);
            return fileVersionInfo?.FileVersion;
        }
    }
}