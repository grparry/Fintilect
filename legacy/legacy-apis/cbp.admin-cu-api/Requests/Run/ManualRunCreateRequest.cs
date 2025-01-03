using System;

namespace Requests.Run
{
    public class ManualRunCreateRequest
    {
        public DateTime? ProcessDate { get; set; }

        public bool ReprocessOnly { get; set; }
    }
}
