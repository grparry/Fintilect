namespace ConnectBillPay.Requests
{
    public class PersonalPayeeEditRequest
    {
        public string UserPayeeListId { get; set; }

        public string MemberId { get; set; }

        public string PayeeName { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string AddressLine3 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string CountryCode { get; set; }

        public string ZipCode { get; set; }

        public string PhoneNumber { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string NickName { get; set; }

        public bool Active { get; set; }

        public bool Favorite { get; set; }
    }
}