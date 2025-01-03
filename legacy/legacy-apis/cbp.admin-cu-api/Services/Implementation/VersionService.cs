using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Core.Api;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
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
        private readonly IWarehouseGenericRepository<CreditUnion> _creditUnionRepository;
        private readonly ICuGenericRepository<InstitutionInfo> _institutionInfoRepository;
        private readonly ICuGenericRepository<CbpServiceVersion> _cbpServiceVersionRepository;

        public VersionService(IConfiguration configuration, ILogger<VersionService> logger,
            IWarehouseGenericRepository<CreditUnion> creditUnionRepository, ICuGenericRepository<InstitutionInfo> institutionInfoRepository, ICuGenericRepository<CbpServiceVersion> cbpServiceVersionRepository)
        {
            _configuration = configuration;
            _logger = logger;
            _creditUnionRepository = creditUnionRepository;
            _institutionInfoRepository = institutionInfoRepository;
            _cbpServiceVersionRepository = cbpServiceVersionRepository;
        }

        public async Task<ServiceResponse<CbpVersionResponse>> GetVersionAsync()
        {
            // ReSharper disable once RedundantAssignment
            var versionResponse = new CbpVersionResponse();
            try
            {
                versionResponse = await GetFileInfo();
                versionResponse.AdminCuApi = GetCuApiVersion();
                versionResponse.Api = await GetApiClientVersion();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting the version information GetVersionAsync");
                return new ServiceResponse<CbpVersionResponse>
                {
                    StatusCode = 200,
                    Error = "Error getting version information",
                    Object = new CbpVersionResponse()
                };
            }

            return new ServiceResponse<CbpVersionResponse>
            {
                StatusCode = 200,
                Object = versionResponse
            };
        }


        private string GetCuApiVersion()
        {
            var currentAssem = Assembly.GetEntryAssembly().Location;
            var fileVersionInfo = FileVersionInfo.GetVersionInfo(currentAssem);
            return fileVersionInfo.FileVersion;
        }

        private async Task<string> GetApiClientVersion()
        {
            var sponsorId = (await _institutionInfoRepository.AllAsync()).FirstOrDefault()?.SponsorId;
            if (sponsorId == null)
            {
                return null;
            }

            var client = await _creditUnionRepository.GetApiClientAsync(sponsorId);

            var serviceResponse = await client.GetVersionNumber();

            return serviceResponse.Object.Version;
        }

        private async Task<CbpVersionResponse> GetFileInfo()
        {
            try
            {

                var versions = (await _cbpServiceVersionRepository.AllAsync()).FirstOrDefault();
                if (versions == null)
                {
                    return new CbpVersionResponse();
                }

                return new CbpVersionResponse
                {
                    PaymentProcessing = versions!.CbpPaymentProcessing,
                    IncomingFiles = versions.CbpIncomingFiles
                };

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting the version information GetFileInfo");
                return new CbpVersionResponse();
            }
        }
    }
}