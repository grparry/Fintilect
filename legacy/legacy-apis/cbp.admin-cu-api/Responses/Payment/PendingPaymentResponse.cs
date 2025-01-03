using System;

namespace Responses.Payment
{
    public class PendingPaymentResponse
    {
        public string Id { get; set; }

        public string UserPayeeListId { get; set; }

        public string FundingAccount { get; set; }

        public int Amount { get; set; }

        public int StatusCode { get; set; }

        public string FriendlyName { get; set; }

        public string Memo { get; set; }

        public DateTime WillProcessDate { get; set; }

        public string RecurringPaymentId { get; set; }

        public bool Suspended { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string PayeeID { get; set; }

        public string FisPayeeId { get; set; }

        public string PayeeName { get; set; }

        public string PayeeType { get; set; }

        public string PaymentMethod { get; set; }

        public short? NumPayments { get; set; }

        public short? PaymentsProcessed { get; set; }

        public int? Frequency { get; set; }

        public string MemberId { get; set; }

        public string Source { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public DateTime EntryDate { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
