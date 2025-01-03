using System.Threading.Tasks;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;

namespace ConnectBillPay.Services.Abstract
{
    public interface IFisApiService
    {
        Task<ServiceResponse<CheckImageResponse>> GetCheckImage(FisCheckImageGetRequest request);

        Task<GetFisPayeeByFactorResponse> GetPayeeByFactor(GetFisPayeeByFactorRequest request);

        Task<GetFisPayeeByFactorResponse> DoesPayeeExistAtFis(GetFisPayeeByFactorRequest factorRequest);

        Task<bool> GetStatus();
    }
}
