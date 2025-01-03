namespace Responses.PaymentHistory
{
    public class LargePaymentResponse
    {
        public string MemberId { get; set; }

        public decimal Amount { get; set; }

        public string PayeeName { get; set; }

        public string Status { get; set; }
    }
}