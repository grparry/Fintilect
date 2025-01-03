using System;
using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class MemberPayment
    {
        public string Id { get; set; }

        public string UserPayeeListId { get; set; }

        public string FundingAccount { get; set; }

        public int Amount { get; set; }

        public int StatusCode { get; set; }

        public string FriendlyName { get; set; }

        public string Memo { get; set; }

        public DateTime WillProcessDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string RecurringPaymentId { get; set; }

        public bool Suspended { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string NickName { get; set; }

        public string PayeeID { get; set; }

        public string PayeeType { get; set; }

        public int MinDaysToPay { get; set; }

        public string PaymentMethod { get; set; }

        public string PayeeName { get; set; }

        public int? NumPayments { get; set; }

        public short? PaymentsProcessed { get; set; }

        public int? Frequency { get; set; }

#pragma warning disable CS8632 // The annotation for nullable reference types should only be used in code within a '#nullable' annotations context.
        public string? FrequencyDescription { get; set; }
#pragma warning restore CS8632 // The annotation for nullable reference types should only be used in code within a '#nullable' annotations context.

        public List<DateTime> FuturePaymentDates { get; set; }
    }
}