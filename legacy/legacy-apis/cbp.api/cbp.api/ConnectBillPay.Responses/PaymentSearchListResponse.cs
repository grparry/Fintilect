using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class PaymentSearchListResponse
    {
        public List<PaymentSearchReport> Payments { get; set; }
    }
}
