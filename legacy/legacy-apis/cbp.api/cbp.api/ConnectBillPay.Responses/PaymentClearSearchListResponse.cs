using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class PaymentClearSearchListResponse
    {
        public List<PaymentClearSearchReport> PaymentClears { get; set; }
    }
}
