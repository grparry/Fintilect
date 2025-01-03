using System;

namespace Requests.Notification
{
    public class NotificationUpdateRequest
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
        public bool? Symmetry { get; set; }
        public bool? Emerge { get; set; }
    }
}