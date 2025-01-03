using System.Collections.Generic;

namespace Responses.PaymentHistory
{
    public class LargePaymentListResponse
    {
        public List<LargePaymentResponse> Payments { get; set; }
    }
}