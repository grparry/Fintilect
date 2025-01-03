using System.Threading.Tasks;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;

namespace ConnectBillPay.Services.Abstract
{
    public interface IExceptionService
    {
        Task<ServiceResponse> SendNotification(int statusCode);

        Task<ServiceResponse> SendCustomerNotification(ExceptionCustomerNotificationRequest request);

        Task<ServiceResponse<ExceptionRefundResponse>> CheckForRefundAdjustment(string paymentId, int exceptionId);
    }
}