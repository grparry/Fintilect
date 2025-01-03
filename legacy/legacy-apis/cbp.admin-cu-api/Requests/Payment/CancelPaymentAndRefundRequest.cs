namespace Requests.Payment;

public class CancelPaymentAndRefundRequest
{
    public string PaymentId { get; set; }

    public int ExceptionId { get; set; }
}