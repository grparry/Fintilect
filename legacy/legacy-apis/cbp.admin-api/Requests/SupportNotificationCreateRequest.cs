namespace Requests
{
    public class SupportNotificationCreateRequest
    {
        public int? StatusCode { get; set; }
        public string? MessageSubject { get; set; }
        public string? MessageBody { get; set; }
        public string? Notes { get; set; }
    }
}
