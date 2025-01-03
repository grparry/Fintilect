using ConnectBillPay.Core.Classes;
using Requests.PaymentHistory;
using Responses.PaymentHistory;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IPaymentHistoryService
    {
        Task<ServiceResponse<ErrorHistoryListResponse>> ErrorHistory(ErrorHistoryReportRequest request);
        Task<ServiceResponse<LargePaymentListResponse>> GetLargePayments(string runDate);
    }
}
