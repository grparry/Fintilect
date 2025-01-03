namespace ConnectBillPay.Requests
{
    public class ErrorHistoryReportRequest
    {
        public ErrorHistorySearchType SearchType { get; set; }

        public string SearchValue { get; set; }
    }
}