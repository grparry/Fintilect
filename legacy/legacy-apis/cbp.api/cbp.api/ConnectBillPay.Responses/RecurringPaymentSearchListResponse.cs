using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class RecurringPaymentSearchListResponse
    {
        public List<RecurringPaymentSearchReport> RecurringPayments { get; set; }
    }
}
