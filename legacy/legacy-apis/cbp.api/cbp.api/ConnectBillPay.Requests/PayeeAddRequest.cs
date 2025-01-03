namespace ConnectBillPay.Requests
{
    public class PayeeAddRequest
    {
        public bool Active { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Address3 { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public bool Favorite { get; set; }

        public string MemberId { get; set; }

        public string Name { get; set; }

        public string NameOnAccount { get; set; }

        public string NickName { get; set; }

        public string PayeeId { get; set; }

        public string PayeeType { get; set; }

        public string Phone { get; set; }

        public string PostalCode { get; set; }

        public string State { get; set; }

        public string UsersAccountAtPayee { get; set; }
    }
}
