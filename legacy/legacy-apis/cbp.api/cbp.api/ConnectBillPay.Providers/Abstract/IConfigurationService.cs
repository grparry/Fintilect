using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Requests;

namespace ConnectBillPay.Services.Abstract
{
    public interface IConfigurationService
    {
        Task<Configuration> Get(Guid id);

        Task<IEnumerable<Configuration>> GetAll();

        Task<bool> Create(ConfigurationAddRequest configurationAddRequest);

        Task<bool> Update(ConfigurationUpdateRequest configurationUpdateRequest);

        Task<bool> Delete(Guid id);

        Task<ServiceResponse> RefreshAsync();
    }
}
