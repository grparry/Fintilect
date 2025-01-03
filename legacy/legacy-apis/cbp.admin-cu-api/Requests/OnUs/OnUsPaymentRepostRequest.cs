using System;

namespace Requests.OnUs
{
    public class OnUsPaymentRepostRequest
    {
        public string PaymentId { get; set; }
        public string LoanId { get; set; }
        public bool MarkPaymentPaid { get; set; }
    }
}