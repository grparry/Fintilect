using ConnectBillPay.Core.Classes;
using Requests;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IConfigurationService
    {
        Task<ServiceResponse> RefreshAsync(ConfigurationRefreshRequest request);
    }
}
