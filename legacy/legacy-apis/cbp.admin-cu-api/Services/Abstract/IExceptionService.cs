using ConnectBillPay.Core.Classes;
using Responses.Exception;
using System;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IExceptionService
    {
        Task<ServiceResponse<PaymentExceptionListResponse>> GetExceptionsBySingleDateAsync(DateTime date);
        Task<ServiceResponse<ExceptionRefundResponse>> CheckForRefundAdjustmentAsync(string paymentId, int exceptionId);
    }
}
