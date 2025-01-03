using ConnectBillPay.Core.Classes;
using Responses.StatusCode;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IStatusCodeService
    {
        Task<ServiceResponse<StatusCodeListResponse>> GetAllAsync();
        Task<ServiceResponse<StatusCodeResponse>> GetAsync(int code);
    }
}
