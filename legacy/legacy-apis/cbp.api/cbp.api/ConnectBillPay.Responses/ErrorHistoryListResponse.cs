using System.Collections.Generic;

namespace ConnectBillPay.Responses
{
    public class ErrorHistoryListResponse
    {
        public List<ErrorHistoryResponse> ErrorHistories { get; set; }
    }
}