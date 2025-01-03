using System;

namespace Responses.OnUs
{
    public class OnUsPaymentExceptionResponse
    {
        public long Id { get; set; }

        public string PaymentId { get; set; }

        public string MemberId { get; set; }

        public string AccountId { get; set; }

        public string LoanId { get; set; }

        public decimal Amount { get; set; }

        public string Comment { get; set; }

        public string Glcode { get; set; }

        public int RunId { get; set; }

        public string ErrorCode { get; set; }

        public string ErrorDesc { get; set; }

        public string SourceApp { get; set; }

        public DateTime EntryDate { get; set; }
    }
}
