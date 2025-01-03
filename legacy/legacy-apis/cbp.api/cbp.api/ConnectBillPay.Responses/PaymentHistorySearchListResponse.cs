using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class PaymentHistorySearchListResponse
    {
        public List<PaymentHistorySearchReport> Histories { get; set; }
    }
}
