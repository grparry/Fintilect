using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace Responses.Search
{
    public class PaymentHistorySearchListResponse
    {
        public List<PaymentHistorySearchReport> Histories { get; set; }
    }
}
