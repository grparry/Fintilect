using System;
using System.Collections.Generic;

namespace Requests
{
    public class ExceptionSearchRequest
    {
        public DateTime? Date { get; set; }

        public DateTime? EndDate { get; set; }

        public List<string>? SponsorIds { get; set; }

        public bool? CorrectionMade { get; set; }
    }
}
