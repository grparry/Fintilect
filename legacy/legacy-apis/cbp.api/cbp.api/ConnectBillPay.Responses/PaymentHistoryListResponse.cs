using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class PaymentHistoryListResponse
    {
        public List<PaymentHistoryResponse> PaymentHistories { get; set; }
    }
}
