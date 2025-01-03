using System;
using ConnectBillPay.Core.Enums;

namespace Requests.Payee
{
    public class GlobalPayeeChangeHistoryReportRequest
    {
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public SearchType SearchType { get; set; }

        public string SearchValue { get; set; }
    }
}