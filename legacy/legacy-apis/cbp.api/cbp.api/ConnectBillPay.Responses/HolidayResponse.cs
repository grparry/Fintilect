using System;

namespace ConnectBillPay.Responses
{
    public class HolidayResponse
    {
        public int Id { get; set; }
        public string SponsorId { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
