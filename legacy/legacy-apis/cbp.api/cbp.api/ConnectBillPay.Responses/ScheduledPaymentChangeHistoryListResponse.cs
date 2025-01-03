using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class ScheduledPaymentChangeHistoryListResponse
    {
        public List<ScheduledPaymentChangeHistoryResponse> Histories { get; set; }
    }
}
