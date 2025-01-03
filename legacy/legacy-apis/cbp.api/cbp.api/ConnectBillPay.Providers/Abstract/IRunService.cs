using ConnectBillPay.Requests;
using ConnectBillPay.Services.Classes;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Abstract
{
    public interface IRunService
    {
        Task<ServiceResponse> CreateManualRunAsync(ManualRunCreateRequest request);
    }
}
