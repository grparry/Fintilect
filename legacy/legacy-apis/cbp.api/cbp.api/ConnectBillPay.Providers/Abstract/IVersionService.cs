using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Responses;

namespace ConnectBillPay.Services.Abstract;

public interface IVersionService
{
    Task<ServiceResponse<VersionResponse>> GetVersionAsync();
}