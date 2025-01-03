using System;

namespace ConnectBillPay.Requests
{
    public class PendingPaymentsRequest
    {
        public DateTime Date { get; set; }

        public bool CheckHoliday { get; set; }
    }
}
