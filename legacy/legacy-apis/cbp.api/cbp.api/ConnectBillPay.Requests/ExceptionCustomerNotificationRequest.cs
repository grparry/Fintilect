namespace ConnectBillPay.Requests
{
    public class ExceptionCustomerNotificationRequest
    {
        public string PaymentId { get; set; }

        public int StatusCode { get; set; }
    }
}