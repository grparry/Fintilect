using System;

namespace ConnectBillPay.Responses
{
    public class SavedNotificationResponse
    {
        public int Id { get; set; }
        public int StatusCode { get; set; }
        public string StatusCodeDescription { get; set; }
        public DateTime Date { get; set; }
        public string MemberId { get; set; }
        public string PaymentId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string Name { get; set; }
        public string MemberEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
