using System;

namespace Requests.Payment
{
    public class PaymentEditRequest
    {
        public string Account { get; set; }

        public int Amount { get; set; }

        public DateTime WillProcessDate { get; set; }

        public string MemberId { get; set; }

        public int Frequency { get; set; }

        public int NumPayments { get; set; }
    }
}