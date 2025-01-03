using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class InstitutionInfoService : IInstitutionInfoService
    {
        private readonly ICuGenericRepository<InstitutionInfo> _institutionInfoRepository;
        private readonly IMapper _mapper;
        private readonly ConnectBillPaySettings _settings;
        private readonly ICuGenericRepository<Configuration> _configurationRepository;

        public InstitutionInfoService(ICuGenericRepository<InstitutionInfo> institutionInfoRepository,
            IMapper mapper,
            ConnectBillPaySettings settings,
            ICuGenericRepository<Configuration> configurationRepository)
        {
            _institutionInfoRepository = institutionInfoRepository;
            _mapper = mapper;
            _settings = settings;
            _configurationRepository = configurationRepository;
        }

        public async Task<ServiceResponse> CreateAsync(InstitutionInfoCreateRequest request)
        {
            var found = await _institutionInfoRepository.AllAsync();
            if (found.Any())
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            var institutionInfo = _mapper.Map<InstitutionInfo>(request);
            _institutionInfoRepository.Add(institutionInfo);
            await _institutionInfoRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse<InstitutionInfoResponse>> GetAsync()
        {
            var institution = (await _institutionInfoRepository.AllAsync())
                .FirstOrDefault();
            if (institution == null)
            {
                return new ServiceResponse<InstitutionInfoResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<InstitutionInfoResponse>(institution);

            await _settings.Refresh(_configurationRepository);

            response.SettlementGlCode = _settings.GeneralLedgerCode;
            response.SettlementAccountType = _settings.SettlementAccountType;
            response.SettlementAccountNumber = _settings.SettlementAccountNumber;
            response.SettlementExternalAch = _settings.SettlementExternalAch;

            return new ServiceResponse<InstitutionInfoResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }

        public async Task<ServiceResponse> UpdateAsync(InstitutionInfoUpdateRequest request)
        {
            var institutionInfo = await _institutionInfoRepository.GetAsync(x => x.Id == request.Id);
            if (institutionInfo == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            _mapper.Map(request, institutionInfo);
            _institutionInfoRepository.Update(institutionInfo);
            await _institutionInfoRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

    }
}
