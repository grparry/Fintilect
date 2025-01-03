using System;

namespace ConnectBillPay.Responses
{
    public class PayeeHistoryResponse
    {
        public long Id { get; set; }

        public string PaymentId { get; set; }

        public string UserPayeeListId { get; set; }

        public string MemberId { get; set; }

        public string FundingAccount { get; set; }

        public int Amount { get; set; }

        public string CheckNum { get; set; }

        public DateTime WillProcessDate { get; set; }

        public DateTime? ProcessedDate { get; set; }

        public DateTime? FailedDate { get; set; }

        public DateTime? CancelledDate { get; set; }

        public string RecurringPaymentId { get; set; }

        public int StatusCode { get; set; }

        public string Memo { get; set; }

        public DateTime? EntryDate { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public string SourceApplication { get; set; }

        public string PayeeId { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string PaymentMethod { get; set; }

        public int? RunId { get; set; }

        public string ConfirmationNumber { get; set; }
    }
}