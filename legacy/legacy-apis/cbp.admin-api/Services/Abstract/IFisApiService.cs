using Requests;
using Responses;
using System.Threading.Tasks;


namespace Services.Abstract
{
    public interface IFisApiService
    {
        Task<GetFisPayeeByFactorResponse> GetPayeeByFactor(GetFisPayeeByFactorRequest request);

        Task<GetFisApiVersionResponse> GetVersion();
    }
}
