using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using Requests;
using Responses;


namespace Services.Abstract
{
    public interface IExceptionService
    {
        Task<ServiceResponse<ExceptionListResponse>> SearchAsync(ExceptionSearchRequest request);

        Task<ServiceResponse> UpdateAsync(ExceptionUpdateRequest request);
    }
}
