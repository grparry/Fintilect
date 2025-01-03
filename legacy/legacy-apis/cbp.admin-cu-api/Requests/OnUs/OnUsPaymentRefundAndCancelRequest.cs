namespace Requests.OnUs;

public class OnUsPaymentRefundAndCancelRequest
{
    public string PaymentId { get; set; }

    public string LoanId { get; set; }

    public int Amount { get; set; }
}