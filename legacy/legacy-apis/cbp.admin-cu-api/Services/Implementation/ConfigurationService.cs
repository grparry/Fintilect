using System;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Models;
using Services.Abstract;
using Requests.Configuration;
using ConnectBillPay.Core.Classes;
using Responses.Configuration;
using System.Linq;
using ConnectBillPay.Core.Configuration;

namespace Services.Implementation
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly ICuGenericRepository<Configuration> _configurationRepository;
        private readonly IMapper _mapper;
        private readonly ConnectBillPaySettings _settings;

        public ConfigurationService(ICuGenericRepository<Configuration> configurationRepository,
            IMapper mapper,
            ConnectBillPaySettings settings)
        {
            _configurationRepository = configurationRepository;
            _mapper = mapper;
            _settings = settings;
        }

        public async Task<ServiceResponse> CreateAsync(ConfigurationCreateRequest request)
        {
            // If code outside the api attempts to create configuration we could have a race condition
            var found = await _configurationRepository.GetAsync(x => x.ConfigName == request.ConfigName);
            if (found != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            var configuration = _mapper.Map<Configuration>(request);
            _configurationRepository.Add(configuration);
            await _configurationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 201
            };
        }

        public async Task<ServiceResponse> DeleteAsync(Guid id)
        {
            var configuration = await _configurationRepository.GetAsync(x => x.Id == id);
            if (configuration == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            _configurationRepository.Remove(configuration);
            await _configurationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse<ConfigurationResponse>> GetAsync(Guid id)
        {
            var configuration = await _configurationRepository.GetAsync(x => x.Id == id);
            if (configuration == null)
            {
                return new ServiceResponse<ConfigurationResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<ConfigurationResponse>(configuration);
            return new ServiceResponse<ConfigurationResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }

        public async Task<ServiceResponse<ConfigurationListResponse>> GetAllAsync()
        {
            var configurations = (await _configurationRepository.AllAsync())
                .Select(_mapper.Map<ConfigurationResponse>)
                .ToList();

            return new ServiceResponse<ConfigurationListResponse>
            {
                StatusCode = 200,
                Object = new ConfigurationListResponse
                {
                    Configurations = configurations
                }
            };
        }

        public async Task<ServiceResponse> UpdateAsync(ConfigurationUpdateRequest request)
        {
            // If code outside the api attempts to update configuration we could have a race condition
            var configuration = await _configurationRepository.GetAsync(x => x.Id == request.Id);
            if (configuration == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            var nameChangeConflict = await _configurationRepository.GetAsync(x => x.ConfigName == request.ConfigName && x.Id != configuration.Id);
            if (nameChangeConflict != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            _mapper.Map(request, configuration);

            configuration.LastChangeDate = DateTime.Now;

            _configurationRepository.Update(configuration);
            await _configurationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> RefreshAsync()
        {
            await _settings.Refresh(_configurationRepository);

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }
    }
}
