using System.Collections.Generic;
using ConnectBillPay.Core.Models;

namespace ConnectBillPay.Responses
{
    public class FailedOnUsListResponse
    {
        public List<FailedOnUsReport> FailedRecords { get; set; }
    }
}