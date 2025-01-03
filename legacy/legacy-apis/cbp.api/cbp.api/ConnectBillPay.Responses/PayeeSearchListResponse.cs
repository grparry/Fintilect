using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class PayeeSearchListResponse
    {
        public List<PayeeSearchReport> Payees { get; set; }
    }
}
