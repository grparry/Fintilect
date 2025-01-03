using ConnectBillPay.Core.Classes;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IInstitutionInfoService
    {
        Task<ServiceResponse> CreateAsync(InstitutionInfoCreateRequest request);
        Task<ServiceResponse<InstitutionInfoResponse>> GetAsync();
        Task<ServiceResponse> UpdateAsync(InstitutionInfoUpdateRequest request);
    }
}
