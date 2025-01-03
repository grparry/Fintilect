using System;

namespace ConnectBillPay.Requests
{
    public class OneTimePaymentAddRequest
    {
        public string UserPayeeListId { get; set; }

        public string MemberId { get; set; }

        public string FundingAccount { get; set; }

        public int Amount { get; set; }

        public string Memo { get; set; }

        public string SourceApplication { get; set; }

        public DateTime WillProcessDate { get; set; }

        public DateTime DeliveryDate { get; set; }
    }
}
