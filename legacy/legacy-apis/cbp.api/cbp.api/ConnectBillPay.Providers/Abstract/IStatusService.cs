using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Abstract
{
    public interface IStatusService
    {
        Task<ServiceResponse<StatusResponse>> GetStatus();
    }
}
