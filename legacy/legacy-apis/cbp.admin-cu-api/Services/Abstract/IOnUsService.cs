using ConnectBillPay.Core.Classes;
using Requests.OnUs;
using Responses.OnUs;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IOnUsService
    {
        Task<ServiceResponse<OnUsPaymentExceptionResponse>> GetOnUsPayment(long onUsPaymentId);
        Task<ServiceResponse> RepostOnUsPayment(OnUsPaymentRepostRequest request);
        Task<ServiceResponse> RefundAndCancelOnUsPayment(OnUsPaymentRefundAndCancelRequest request);
        Task<ServiceResponse<FailedOnUsListResponse>> FailedOnUsReport(FailedOnUsRequest request);
    }
}
