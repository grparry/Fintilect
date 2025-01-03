using System;

namespace Requests
{
    public class ManualRunCreateRequest
    {
        public string? SponsorId { get; set; }

        public DateTime? ProcessDate { get; set; }

        public bool ReprocessOnly { get; set; }
    }
}
