using System.Collections.Generic;
using System.Threading.Tasks;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;

namespace ConnectBillPay.Services.Abstract
{
    public interface IPayeeService
    {
        Task<ServiceResponse<AddPayeeResponse>> AddPayee(PayeeAddRequest request);

        Task<ServiceResponse> CloseGlobalPayeeAsync(PayeeCloseGlobalRequest request);

        Task<ServiceResponse> DeleteUserPayee(string userPayeeId, string memberId);

        Task<ServiceResponse> EditGlobalPayee(GlobalPayeeEditRequest request);

        Task<ServiceResponse> EditPersonalPayee(PersonalPayeeEditRequest request);

        Task<ServiceResponse<GlobalPayeeResponse>> GetGlobalPayeeAsync(string fisPayeeId);

        Task<ServiceResponse<List<PayeeResponse>>> GetGlobalPayeesByName(string name);

        Task<ServiceResponse<List<PayeeResponse>>> GetGlobalPayeesByZip(string zip);

        Task<ServiceResponse<List<PayeeResponse>>> GetGlobalPayeesByNameZip(string name, string zip);

        Task<ServiceResponse<UserPayeeResponse>> GetUserPayee(string memberId, string payeeId, bool active = true);

        Task<ServiceResponse<List<UserPayeeResponse>>> GetUserPayees(string memberId);

        Task<ServiceResponse<List<UserPayeeWithPaymentsResponse>>> GetUserPayeesWithPayments(string memberId);
        
        Task<ServiceResponse<UserPayeeUpdateAccountNumberResponse>> UpdateUserPayeeAccountNumberAsync(UserPayeeUpdateAccountNumberRequest request);

        Task<ServiceResponse<UserPayeeUpdateFisPayeeIdResponse>> UpdateUserPayeeFisPayeeIdAsync(UserPayeeUpdateFisPayeeIdRequest request);
    }
}
