using System;
using System.Collections.Generic;

namespace Requests.Search
{
    public class PaymentInformationSearchRequest
    {
        public DateTime? Date { get; set; }

        public DateTime? EndDate { get; set; }

        public List<string> SponsorIds { get; set; }

        public string PaymentId { get; set; }

        public string MemberId { get; set; }

        public string UserPayeeListId { get; set; }

        public string FisPayeeId { get; set; }

        public List<int> StatusCodes { get; set; }

        public List<string> ResolutionTypes { get; set; }

        public List<string> ProblemCauseTypes { get; set; }
    }
}