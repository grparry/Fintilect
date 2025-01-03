using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Abstract
{
    public interface ICheckImageService
    {
        Task<ServiceResponse<CheckImageResponse>> GetCheckImage(CheckImageGetRequest request);
    }
}
