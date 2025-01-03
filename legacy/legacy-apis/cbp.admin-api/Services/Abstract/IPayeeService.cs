using Requests;
using Responses;

using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;

namespace Services.Abstract
{
    public interface IPayeeService
    {
        Task<ServiceResponse<GlobalPayeeResponse>> GetGlobalPayeeAsync(string internalPayeeId);

        Task<ServiceResponse<GetPayeeResponse>> GetPayeeFromFisAsync(GetPayeeRequest request);
    }
}
