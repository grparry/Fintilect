using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace Responses.Search
{
    public class PaymentClearSearchListResponse
    {
        public List<PaymentClearSearchReport> PaymentClears { get; set; }
    }
}
