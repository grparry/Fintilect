namespace ConnectBillPay.Responses
{
    public class UserPayeeResponse
    {
        public PayeeResponse Payee { get; set; }

        public string UserPayeeListId { get; set; }

        public string MemberId { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string NickName { get; set; }

        public string AttentionLine { get; set; }

        public string PaymentMethod { get; set; }

        public string PayeeType { get; set; }

        public bool Active { get; set; }

        public bool Favorite { get; set; }

        public MemberPayment LastPayment { get; set; }
    }
}
