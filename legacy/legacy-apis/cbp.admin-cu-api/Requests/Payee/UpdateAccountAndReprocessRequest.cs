namespace Requests.Payee;

public class UpdateAccountAndReprocessRequest
{
    public string UserPayeeListId { get; set; }

    public string AccountNumber { get; set; }

    public string PaymentId { get; set; }
}