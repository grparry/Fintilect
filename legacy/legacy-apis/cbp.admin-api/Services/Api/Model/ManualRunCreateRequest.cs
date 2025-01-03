using System;

namespace Services.Api.Model
{
    public class ManualRunCreateRequest
    {
        public DateTime? ProcessDate { get; set; }

        public bool ReprocessOnly { get; set; }
    }
}
