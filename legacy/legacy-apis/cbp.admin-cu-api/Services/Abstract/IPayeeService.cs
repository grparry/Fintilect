using ConnectBillPay.Core.Classes;
using Requests.Payee;
using Responses.Payee;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IPayeeService
    {
        Task<ServiceResponse> CloseGlobalPayeeAsync(PayeeCloseGlobalRequest request);
        Task<ServiceResponse> CopyMemberPayeesAsync(CopyMemberPayeesRequest request);
        Task<ServiceResponse<UserPayeeChangeHistoryListResponse>> UserPayeeChangeHistoryAsync(UserPayeeChangeHistoryReportRequest request);
        Task<ServiceResponse<GlobalPayeeChangeHistoryListResponse>> GlobalPayeeChangeHistoryAsync(GlobalPayeeChangeHistoryReportRequest request);
        Task<ServiceResponse> UpdateAccountNumberAndReprocessAsync(UpdateAccountAndReprocessRequest request);
        Task<ServiceResponse> UpdateAccountNumberAndRefund(UpdateAccountAndRefund request);
        Task<ServiceResponse> UpdateUserPayeeAccountNumberAsync(UserPayeeUpdateAccountNumberRequest request);
        Task<ServiceResponse> UpdateUserPayeeFisPayeeIdAsync(UserPayeeUpdateFisPayeeIdRequest request);
        Task<ServiceResponse> UpdateFisPayeeIdAndRefundAsync(UpdateFisPayeeIdAndRefundRequest request);
        Task<ServiceResponse> UpdateManualAndReprocessAsync(ManualUpdateRequest request);
    }
}
