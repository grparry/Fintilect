using System.Collections.Generic;

namespace ConnectBillPay.Requests
{
    public class NotificationSendSupportRequest
    {
        public int StatusCode { get; set; }

        public Dictionary<string, string> Tokens { get; set; }
    }
}
