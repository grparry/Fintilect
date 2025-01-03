using System;

namespace Requests.Payment
{
    public class PendingPaymentsRequest
    {
        public DateTime Date { get; set; }

        public bool CheckHoliday { get; set; }
    }
}
