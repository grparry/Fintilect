using ConnectBillPay.Core.Classes;
using Requests.Configuration;
using Responses.Configuration;
using System;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IConfigurationService
    {
        Task<ServiceResponse> CreateAsync(ConfigurationCreateRequest request);
        Task<ServiceResponse> DeleteAsync(Guid id);
        Task<ServiceResponse<ConfigurationResponse>> GetAsync(Guid id);
        Task<ServiceResponse<ConfigurationListResponse>> GetAllAsync();
        Task<ServiceResponse> RefreshAsync();
        Task<ServiceResponse> UpdateAsync(ConfigurationUpdateRequest request);
    }
}
