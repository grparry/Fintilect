using System.Collections.Generic;
using ConnectBillPay.Core.Models;

namespace Responses.Payment
{
    public class PendingPaymentSearchResponse
    {
        public List<PendingPaymentReport> Payments { get; set; }
    }
}