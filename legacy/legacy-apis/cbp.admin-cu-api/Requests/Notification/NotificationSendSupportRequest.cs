using System.Collections.Generic;

namespace Requests.Notification
{
    public class NotificationSendSupportRequest
    {
        public int StatusCode { get; set; }

        public Dictionary<string, string> Tokens { get; set; }
    }
}
