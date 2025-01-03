namespace Requests.Exception
{
    public class ExceptionRefundRequest
    {
        public string PaymentId { get; set; }
        public int ExceptionId { get; set; }
    }
}
