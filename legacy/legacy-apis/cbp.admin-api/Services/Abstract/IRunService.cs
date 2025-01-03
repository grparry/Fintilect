using Requests;

using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;

namespace Services.Abstract
{
    public interface IRunService
    {
        Task<ServiceResponse> CreateManualRunAsync(ManualRunCreateRequest request);
    }
}
