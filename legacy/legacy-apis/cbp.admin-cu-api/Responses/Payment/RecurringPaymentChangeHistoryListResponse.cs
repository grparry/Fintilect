using System.Collections.Generic;

namespace Responses.Payment
{
    public class RecurringPaymentChangeHistoryListResponse
    {
        public List<RecurringPaymentChangeHistoryResponse> Histories { get; set; }
    }
}
