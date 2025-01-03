using ConnectBillPay.Core.Classes;
using System.Threading.Tasks;
using Requests.Customer;
using Responses.Customer;

namespace Services.Abstract
{
    public interface ICustomerService
    {
        Task<ServiceResponse<CustomerCreateResponse>> Create(CustomerCreateRequest request);
    }
}