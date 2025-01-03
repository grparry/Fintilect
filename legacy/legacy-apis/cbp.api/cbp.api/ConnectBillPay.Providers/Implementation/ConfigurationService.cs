using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Requests;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Classes;

namespace ConnectBillPay.Services.Implementation
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly ICuGenericRepository<Configuration> _configurationRepository;
        private readonly IMapper _mapper;
        private readonly ConnectBillPaySettings _settings;

        public ConfigurationService(ICuGenericRepository<Configuration> configurationRepository, IMapper mapper, ConnectBillPaySettings settings)
        {
            _configurationRepository = configurationRepository;
            _mapper = mapper;
            _settings = settings;
        }
        public async Task<Configuration> Get(Guid id)
        {
            return await _configurationRepository.GetAsync(x => x.Id == id);
        }

        public async  Task<IEnumerable<Configuration>> GetAll()
        {
            return await _configurationRepository.AllAsync();
        }

        public async Task<bool> Create(ConfigurationAddRequest configurationRequest)
        {

            // If code outside the api attempts to create configuration we could have a race condition

            var found = await _configurationRepository.GetAsync(x => x.ConfigName == configurationRequest.ConfigName);
            if (found == null)
            {
                _configurationRepository.Add(_mapper.Map<Configuration>(configurationRequest));
                await _configurationRepository.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> Update(ConfigurationUpdateRequest configurationUpdateRequest)
        {

            // If code outside the api attempts to update configuration we could have a race condition

            var config = await _configurationRepository.GetAsync(x => x.Id == configurationUpdateRequest.Id);
            if (config != null)
            {
                _mapper.Map(configurationUpdateRequest, config);

                config.LastChangeDate = DateTime.Now;

                _configurationRepository.Update(config);
                await _configurationRepository.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            var config = await _configurationRepository.GetAsync(x => x.Id == id);
            if (config != null)
            {
                _configurationRepository.Remove(config);
                await _configurationRepository.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
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
