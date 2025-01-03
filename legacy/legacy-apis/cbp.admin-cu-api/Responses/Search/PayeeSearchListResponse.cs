using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace Responses.Search
{
    public class PayeeSearchListResponse
    {
        public List<PayeeSearchReport> Payees { get; set; }
    }
}
