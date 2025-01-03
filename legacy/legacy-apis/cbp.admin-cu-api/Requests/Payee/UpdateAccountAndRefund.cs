namespace Requests.Payee;

public class UpdateAccountAndRefund
{
    public string UserPayeeListId { get; set; }

    public string AccountNumber { get; set; }

    public string PaymentId { get; set; }

    public int ExceptionId { get; set; }
}