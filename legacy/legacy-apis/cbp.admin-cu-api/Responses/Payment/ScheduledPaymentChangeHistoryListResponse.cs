using System.Collections.Generic;

namespace Responses.Payment
{
    public class ScheduledPaymentChangeHistoryListResponse
    {
        public List<ScheduledPaymentChangeHistoryResponse> Histories { get; set; }
    }
}
