using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace Responses.Search
{
    public class PaymentSearchListResponse
    {
        public List<PaymentSearchReport> Payments { get; set; }
    }
}
