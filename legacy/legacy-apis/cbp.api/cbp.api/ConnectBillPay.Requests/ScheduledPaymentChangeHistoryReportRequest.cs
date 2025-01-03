using ConnectBillPay.Core.Enums;
using System;

namespace ConnectBillPay.Requests
{
    public class ScheduledPaymentChangeHistoryReportRequest
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public SearchType SearchType { get; set; }

        public string SearchValue { get; set; }
    }
}
