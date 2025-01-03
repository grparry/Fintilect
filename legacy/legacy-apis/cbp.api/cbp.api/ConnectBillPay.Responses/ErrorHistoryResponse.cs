namespace ConnectBillPay.Responses
{
    public class ErrorHistoryResponse
    {
        public string FailedDate { get; set; }

        public string MemberId { get; set; }

        public string PaymentId { get; set; }

        public decimal Amount { get; set; }

        public string PayeeId { get; set; }

        public string PayeeName { get; set; }

        public string UserPayeeListId { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string Status { get; set; }

        public string HostCode { get; set; }

        public string Error { get; set; }
    }
}