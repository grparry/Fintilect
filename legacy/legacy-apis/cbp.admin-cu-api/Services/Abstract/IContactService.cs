using ConnectBillPay.Core.Classes;
using Requests.Contact;
using Responses.Contact;
using System;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IContactService
    {
        Task<ServiceResponse> Create(ContactCreateRequest request);
        Task<ServiceResponse> Delete(Guid id);
        Task<ServiceResponse<ContactListResponse>> GetAll();
        Task<ServiceResponse> Update(ContactUpdateRequest request);
    }
}
