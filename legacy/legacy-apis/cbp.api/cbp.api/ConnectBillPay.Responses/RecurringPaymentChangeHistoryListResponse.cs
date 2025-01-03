using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class RecurringPaymentChangeHistoryListResponse
    {
        public List<RecurringPaymentChangeHistoryResponse> Histories { get; set; }
    }
}
