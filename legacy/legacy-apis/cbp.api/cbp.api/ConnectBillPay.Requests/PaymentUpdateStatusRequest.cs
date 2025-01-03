namespace ConnectBillPay.Requests
{
    public class PaymentUpdateStatusRequest
    {
        public string PaymentId { get; set; }

        public int StatusCode { get; set; }
    }
}
