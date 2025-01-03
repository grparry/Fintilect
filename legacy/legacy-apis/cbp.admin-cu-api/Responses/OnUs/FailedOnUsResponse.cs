namespace Responses.OnUs
{
    public class FailedOnUsResponse
    {
        public string PaymentId { get; set; }

        public string PayeeId { get; set; }

        public string UserPayeeListId { get; set; }

        public string MemberId { get; set; }

        public string FundingAccount { get; set; }

        public decimal Amount { get; set; }

        public string ProcessedDate { get; set; }

        public string FailedDate { get; set; }

        public string RecurringPaymentId { get; set; }

        public string StatusCode { get; set; }

        public string Status { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string MemberFirstName { get; set; }

        public string MemberLastName { get; set; }

        public string PayeeName { get; set; }
    }
}
