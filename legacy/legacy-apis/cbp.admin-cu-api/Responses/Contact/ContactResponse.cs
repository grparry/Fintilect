using System;

namespace Responses.Contact
{
    public class ContactResponse
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PhoneExt { get; set; }
        public DateTime Created { get; set; }
        public bool Deleted { get; set; }
    }
}
