using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using System;
using System.Diagnostics;
using System.Reflection;

namespace ConnectBillPay.Services.Implementation
{
    public class VersionService : IVersionService
    {

        private readonly ILogger<VersionService> _logger;

        public VersionService(ILogger<VersionService> logger)
        {
            _logger = logger;
        }

        public async Task<ServiceResponse<VersionResponse>> GetVersionAsync()
        {
            var versionResponse = new VersionResponse();
            try
            {
                versionResponse.Version = GetApiVersion();
                return new ServiceResponse<VersionResponse>
                {
                    StatusCode = 200,
                    Object = versionResponse
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<VersionResponse>
                {
                    StatusCode = 200,
                    Error = "File could not be found at specified path",
                    Object = versionResponse
                };
            }
        }

        private string GetApiVersion()
        {
            var currentAssem = Assembly.GetEntryAssembly()?.Location;
            if (string.IsNullOrEmpty(currentAssem))
            {
                return string.Empty;
            }

            var fileVersionInfo = FileVersionInfo.GetVersionInfo(currentAssem);
            return fileVersionInfo.FileVersion;
        }
    }
}

