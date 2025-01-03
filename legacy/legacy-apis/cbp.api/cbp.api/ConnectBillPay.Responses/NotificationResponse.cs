using System;

namespace ConnectBillPay.Responses
{
    public class NotificationResponse
    {
        public Guid Id { get; set; }
        public int ErrorNumber { get; set; }
        public int? StatusCode { get; set; }
        public byte MatchMode { get; set; }
        public byte MatchOrder { get; set; }
        public string MatchText { get; set; }
        public string MessageSubject { get; set; }
        public string MessageBody { get; set; }
        public bool EmailMember { get; set; }
        public bool EmailMemberServices { get; set; }
        public bool EmailSysOp { get; set; }
        public string Notes { get; set; }
    }
}
