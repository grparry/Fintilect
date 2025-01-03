using ConnectBillPay.Core.Models;

namespace ConnectBillPay.Responses
{
    public class ExceptionRefundResponse
    {
        public bool Success { get; set; }

        public PaymentExceptionAdjustment Adjustment { get; set; }
    }
}