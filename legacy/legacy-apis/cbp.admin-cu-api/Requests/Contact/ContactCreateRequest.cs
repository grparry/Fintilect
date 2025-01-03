namespace Requests.Contact
{
    public class ContactCreateRequest
    {
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string PhoneExt { get; set; }

        public string Title { get; set; }
    }
}
