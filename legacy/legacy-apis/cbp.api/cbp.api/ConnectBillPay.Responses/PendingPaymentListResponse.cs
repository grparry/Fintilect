using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class PendingPaymentListResponse
    {
        public List<PendingPaymentResponse> PendingPayments { get; set; }
    }
}
