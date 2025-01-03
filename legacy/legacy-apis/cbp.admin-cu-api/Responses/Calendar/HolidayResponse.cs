using System;

namespace Responses.Calendar
{
    public class HolidayResponse
    {
        public int Id { get; set; }
        public string SponsorId { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
