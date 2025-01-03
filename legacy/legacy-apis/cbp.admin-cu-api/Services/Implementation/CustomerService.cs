using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using Requests.Customer;
using Responses.Customer;
using Services.Abstract;

namespace Services.Implementation;

public class CustomerService : ICustomerService
{
    private readonly ICuGenericRepository<CustomerInfo> _customerInfoRepository;
    private readonly ICuGenericRepository<InstitutionInfo> _institutionInfoRepository;

    public CustomerService(ICuGenericRepository<CustomerInfo> customerInfoRepository, ICuGenericRepository<InstitutionInfo> institutionInfoRepository)
    {
        _customerInfoRepository = customerInfoRepository;
        _institutionInfoRepository = institutionInfoRepository;
    }
    public async Task<ServiceResponse<CustomerCreateResponse>> Create(CustomerCreateRequest request)
    {
        if (request.MemberId == null)
        {
            return new ServiceResponse<CustomerCreateResponse> { Error = "MemberId was not provided" };
        }

        var customer = await _customerInfoRepository.GetAsync(x => x.MemberId == request.MemberId);
        if (customer != null)
        {
            return new ServiceResponse<CustomerCreateResponse>
            {
                StatusCode = 201,
                Object = new CustomerCreateResponse
                {
                    CustomerId = customer.Id
                }
            };
        }

        var prefix = (await _institutionInfoRepository.AllAsync())?.FirstOrDefault()?.Prefix;

        var customerInfo = new CustomerInfo
        {
            Id = $"{prefix}{request.MemberId}",
            MemberId = request.MemberId,
            First = request.FirstName,
            Middle = request.MiddleInitial,
            Last = request.LastName,
            Address1 = request.Address1,
            Address2 = request.Address2,
            City = request.City,
            State = request.State,
            Country = request.Country,
            ZipCode = request.ZipCode,
            Email = request.Email,
            HomePhone = request.HomePhone
        };

        _customerInfoRepository.Add(customerInfo);
        await _customerInfoRepository.SaveChangesAsync();

        return new ServiceResponse<CustomerCreateResponse>
        {
            StatusCode = 201,
            Object = new CustomerCreateResponse
            {
                CustomerId = customerInfo.Id
            }
        };
    }
}