using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class LargePaymentListResponse
    {
        public List<LargePaymentResponse> Payments { get; set; }
    }
}