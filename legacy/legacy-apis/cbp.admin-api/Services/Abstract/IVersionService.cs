using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using Responses;

namespace Services.Abstract
{
    public interface IVersionService
    {
        Task<ServiceResponse<AdminVersionResponse>> GetVersionAsync();
    }
}