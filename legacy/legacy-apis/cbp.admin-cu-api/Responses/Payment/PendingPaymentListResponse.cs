using System.Collections.Generic;

namespace Responses.Payment
{
    public class PendingPaymentListResponse
    {
        public List<PendingPaymentResponse> PendingPayments { get; set; }
    }
}
