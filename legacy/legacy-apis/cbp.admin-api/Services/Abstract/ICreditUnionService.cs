using Responses;

using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using Requests;

namespace Services.Abstract
{
    public interface ICreditUnionService
    {
        Task<ServiceResponse<CreditUnionListResponse>> GetAllAsync();
        Task<ServiceResponse<CreditUnionResponse>> GetAsync(string sponsorId);
        Task<ServiceResponse> AddAsync(CreditUnionAddRequest request);
        Task<ServiceResponse> DeleteAsync(string sponsorId);
        Task<ServiceResponse> EditAsync(CreditUnionEditRequest request);
    }
}
