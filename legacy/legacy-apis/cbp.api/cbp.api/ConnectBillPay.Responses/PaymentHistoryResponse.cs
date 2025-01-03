using System;

namespace ConnectBillPay.Responses
{
    public class PaymentHistoryResponse
    {
        public long Id { get; set; }

        public string PaymentId { get; set; }

        public string UserPayeeListId { get; set; }

        public string FundingAccount { get; set; }

        public int Amount { get; set; }

        public int StatusCode { get; set; }

        public string FriendlyStatusCodeName { get; set; }

        public string Memo { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string PayeeId { get; set; }

        public string RecurringPaymentId { get; set; }

        public DateTime? ProcessedDate { get; set; }

        public string PayeeType { get; set; }

        public string PaymentMethod { get; set; }

        public DateTime WillProcessDate { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public string CheckNumber { get; set; }

        public string PayeeName { get; set; }

        public string NickName { get; set; }

        public string SortName { get; set; }

        public DateTime? ClearedDate { get; set; }

        public string ConfirmationNumber { get; set; }
    }
}
