namespace Requests.Customer;

public class CustomerCreateRequest
{
    public int Id { get; set; }

    public string MemberId { get; set; }

    public string FirstName { get; set; }

    public string MiddleInitial { get; set; }

    public string LastName { get; set; }

    public string Address1 { get; set; }

    public string Address2 { get; set; }

    public string City { get; set; }

    public string State { get; set; }

    public string ZipCode { get; set; }

    public string Country { get; set; }

    public string Email { get; set; }

    public string HomePhone { get; set; }

    public string WorkPhone { get; set; }

    public string WorkPhoneExt { get; set; }
}