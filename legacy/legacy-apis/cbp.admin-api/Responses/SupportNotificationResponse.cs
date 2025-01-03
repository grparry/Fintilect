using System;

namespace Responses
{
    public class SupportNotificationResponse
    {
        public Guid Id { get; set; }
        public int? StatusCode { get; set; }
        public string? MessageSubject { get; set; }
        public string? MessageBody { get; set; }
        public string? Notes { get; set; }
    }
}
