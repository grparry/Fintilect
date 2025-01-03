namespace Responses.Exception
{
    public class ExceptionRefundResponse
    {
        public bool Success { get; set; }

        public PaymentExceptionAdjustmentResponse Adjustment { get; set; }
    }
}
