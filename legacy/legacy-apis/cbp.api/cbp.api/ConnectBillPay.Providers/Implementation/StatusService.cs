using ConnectBillPay.Core.Contexts;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Classes;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Implementation
{
    public class StatusService : IStatusService
    {
        private readonly ConnectBillPayCuContext _context;
        private readonly Version _applicationVersion;
        private readonly IFisApiService _fisApiService;

        public StatusService(ConnectBillPayCuContext context,
            Version applicationVersion,
            IFisApiService fisApiService)
        {
            _context = context;
            _applicationVersion = applicationVersion;
            _fisApiService = fisApiService;
        }

        public async Task<ServiceResponse<StatusResponse>> GetStatus()
        {
            return new ServiceResponse<StatusResponse>
            {
                Object = new StatusResponse
                {
                    Version = _applicationVersion.ToString(),
                    DbConnection = await GetDbConnectionStatus(),
                    FisApiConnection = await _fisApiService.GetStatus()
        },
                StatusCode = StatusCodes.Status200OK
            };
        }

        private async Task<bool> GetDbConnectionStatus()
        {
            return await _context.Database.CanConnectAsync();
        }
    }
}
