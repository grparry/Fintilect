using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Classes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Implementation
{
    public class CheckImageService : ICheckImageService
    {
        private readonly IFisApiService _fisApiService;
        private readonly ICuGenericRepository<InstitutionInfo> _institutionInfoRepository;
        private readonly IWarehouseGenericRepository<CheckImage> _checkImageRepository;
        private readonly ILogger<CheckImageService> _logger;
        private readonly ICuGenericRepository<PaymentClear> _paymentClearRepository;
        private readonly ConnectBillPaySettings _settings;
        private readonly IConfiguration _configuration;
        private readonly ICuGenericRepository<PaymentHistory> _paymentHistoryRepository;
        private readonly IWarehouseGenericRepository<CreditUnion> _creditUnionRepository;

        public CheckImageService(IFisApiService fisApiService,
            ICuGenericRepository<InstitutionInfo> institutionInfoRepository,
            IWarehouseGenericRepository<CheckImage> checkImageRepository,
            ILogger<CheckImageService> logger,
            ICuGenericRepository<PaymentClear> paymentClearRepository,
            ConnectBillPaySettings settings,
            IConfiguration configuration,
            ICuGenericRepository<PaymentHistory> paymentHistoryRepository,
            IWarehouseGenericRepository<CreditUnion> creditUnionRepository)
        {
            _fisApiService = fisApiService;
            _institutionInfoRepository = institutionInfoRepository;
            _checkImageRepository = checkImageRepository;
            _logger = logger;
            _paymentClearRepository = paymentClearRepository;
            _settings = settings;
            _configuration = configuration;
            _paymentHistoryRepository = paymentHistoryRepository;
            _creditUnionRepository = creditUnionRepository;
        }

        public async Task<ServiceResponse<CheckImageResponse>> GetCheckImage(CheckImageGetRequest request)
        {
            var institution = (await _institutionInfoRepository.AllAsync())
                .FirstOrDefault();

            if (institution == null)
            {
                _logger.LogError("Missing institution info database entry");
                return new ServiceResponse<CheckImageResponse>
                {
                    StatusCode = 400
                };
            }

            var history = await _paymentHistoryRepository.GetAsync(x => x.CheckNum == request.CheckNumber && x.MemberId == request.MemberId);
            if (history == null ||
                !history.ProcessedDate.HasValue)
            {
                return new ServiceResponse<CheckImageResponse>
                {
                    StatusCode = 404
                };
            }

            if (!_settings.FisConversionDate.HasValue)
            {
                _logger.LogError($"Missing or invalid configuration set for FISConversionDate");
                return new ServiceResponse<CheckImageResponse>
                {
                    StatusCode = 500
                };
            }

            if (history.ProcessedDate < _settings.FisConversionDate)
            {
                // check from before FIS, get image from archive
                return await GetCheckImageFromArchive(institution.SponsorId, request);
            }

            var creditUnion = await _creditUnionRepository.GetAsync(x => x.SponsorId == institution.SponsorId);

            if (creditUnion == null)
            {
                return new ServiceResponse<CheckImageResponse>
                {
                    StatusCode = 404
                };
            }

            // get check image from FIS
            // prefix memberId to get CU consumerId
            var fisRequest = new FisCheckImageGetRequest
            {
                RoutingId = creditUnion.RoutingId,
                MemberId = $"{institution.Prefix}{request.MemberId}",
                ConfirmationNumber = history.ConfirmationNumber
            };

            var response = await _fisApiService.GetCheckImage(fisRequest);

            if (response.StatusCode != 200)
            {
                // failure, try with a dash before accepting defeat
                fisRequest.MemberId = $"{institution.Prefix}-{request.MemberId}";

                response = await _fisApiService.GetCheckImage(fisRequest);
            }

            return response;
        }

        private async Task<ServiceResponse<CheckImageResponse>> GetCheckImageFromArchive(string sponsorId, CheckImageGetRequest request)
        {
            var checkImage = await _checkImageRepository.GetAsync(x => x.SponsorId == sponsorId && x.CheckNumber == request.CheckNumber);
            if (checkImage == null)
            {
                _logger.LogError($"Unable to find check image in archive for check number: {request.CheckNumber}");
                return new ServiceResponse<CheckImageResponse>
                {
                    StatusCode = 404
                };
            }

            return new ServiceResponse<CheckImageResponse>
            {
                StatusCode = 200,
                Object = new CheckImageResponse
                {
                    Back = await GetBackFile(checkImage),
                    Front = await GetFrontFile(checkImage)
                }
            };
        }

        private Task<string> GetBackFile(CheckImage checkImage)
        {
            return GetCheckFile(checkImage, $"{checkImage.CheckNumber}_b.jpg");
        }

        private Task<string> GetFrontFile(CheckImage checkImage)
        {
            return GetCheckFile(checkImage, $"{checkImage.CheckNumber}_f.jpg");
        }

        private async Task<string> GetCheckFile(CheckImage checkImage, string fileName)
        {
            var archiveDirectory = _configuration["WrgCheckImageDirectory"];
            var filePath = Path.Combine(archiveDirectory, checkImage.SponsorId, fileName);
            if (!File.Exists(filePath))
            {
                _logger.LogError($"Unable to find check image archive file at: {filePath}");
                return null;
            }

            var bytes = await File.ReadAllBytesAsync(filePath);
            return Convert.ToBase64String(bytes);
        }
    }
}
