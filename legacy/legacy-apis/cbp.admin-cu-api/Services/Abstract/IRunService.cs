using ConnectBillPay.Core.Classes;
using Requests.Run;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IRunService
    {
        Task<ServiceResponse> CreateManualRunAsync(ManualRunCreateRequest request);
    }
}
