using System;

namespace Requests.Calendar
{
    public class HolidayUpdateRequest
    {
        public int Id { get; set; }
        public string SponsorId { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
