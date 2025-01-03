namespace Requests.Payee;

public class UpdateFisPayeeIdAndRefundRequest
{
    public string UserPayeeListId { get; set; }

    public string FisPayeeId { get; set; }

    public string PaymentId { get; set; }

    public int ExceptionId { get; set; }
}