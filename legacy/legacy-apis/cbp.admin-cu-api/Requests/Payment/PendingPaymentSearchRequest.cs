using System;

namespace Requests.Payment
{
    public class PendingPaymentSearchRequest
    {
        public DateTime? Date { get; set; }

        public DateTime? EndDate { get; set; }

        public string PaymentId { get; set; }

        public string MemberId { get; set; }
    }
}