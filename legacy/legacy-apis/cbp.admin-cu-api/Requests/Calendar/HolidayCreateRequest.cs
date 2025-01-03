using System;

namespace Requests.Calendar
{
    public class HolidayCreateRequest
    {
        public string SponsorId { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
