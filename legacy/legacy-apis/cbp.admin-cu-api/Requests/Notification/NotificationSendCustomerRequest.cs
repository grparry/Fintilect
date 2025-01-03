namespace Requests.Notification
{
    public class NotificationSendCustomerRequest
    {
        public string PaymentId { get; set; }
        public int StatusCode { get; set; }
    }
}
