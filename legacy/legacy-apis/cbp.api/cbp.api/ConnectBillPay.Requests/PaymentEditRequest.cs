using System;

namespace ConnectBillPay.Requests
{
    public class PaymentEditRequest
    {
        public string Account { get; set; }

        public int Amount { get; set; }

        public DateTime WillProcessDate { get; set; }

        public bool Suspended { get; set; }

        public string MemberId { get; set; }

        public string Memo { get; set; }
    }
}