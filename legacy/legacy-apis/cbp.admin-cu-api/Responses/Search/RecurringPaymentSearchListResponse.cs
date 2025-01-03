using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace Responses.Search
{
    public class RecurringPaymentSearchListResponse
    {
        public List<RecurringPaymentSearchReport> RecurringPayments { get; set; }
    }
}
