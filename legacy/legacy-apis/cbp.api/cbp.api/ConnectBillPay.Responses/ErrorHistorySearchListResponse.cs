using ConnectBillPay.Core.Models;
using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class ErrorHistorySearchListResponse
    {
        public List<ErrorHistory> Errors { get; set; }
    }
}
