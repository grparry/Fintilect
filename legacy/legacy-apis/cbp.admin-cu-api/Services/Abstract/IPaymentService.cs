using ConnectBillPay.Core.Classes;
using Requests.Payment;
using Responses.Payment;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IPaymentService
    {
        Task<ServiceResponse<PaymentActivityListResponse>> GetPaymentActivity(PaymentActivityRequest request);
        Task<ServiceResponse<PendingPaymentListResponse>> GetPendingPayments(PendingPaymentsRequest request);
        Task<ServiceResponse<RecurringPaymentChangeHistoryListResponse>> GetRecurringPaymentChangeHistory(RecurringPaymentChangeHistoryReportRequest request);
        Task<ServiceResponse<ScheduledPaymentChangeHistoryListResponse>> GetScheduledPaymentChangeHistory(ScheduledPaymentChangeHistoryReportRequest request);
        Task<ServiceResponse> ReprocessAsync(PaymentReprocessRequest request);
        Task<ServiceResponse> SendConfirmationSummary();
        Task<ServiceResponse> UpdateStatusAsync(PaymentUpdateStatusRequest request);
        Task<ServiceResponse<PendingPaymentSearchResponse>> GetPendingPaymentsAsync(PendingPaymentSearchRequest request);
        Task<ServiceResponse> EditPayment(string paymentId, PaymentEditRequest request);
        Task<ServiceResponse> CancelPayment(string paymentId, int statusCode = 103);
        Task<ServiceResponse> CancelPaymentAndRefund(CancelPaymentAndRefundRequest request);
    }
}
