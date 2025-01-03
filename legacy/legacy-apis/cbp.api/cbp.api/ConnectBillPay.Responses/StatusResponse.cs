namespace ConnectBillPay.Responses
{
    public class StatusResponse
    {
        public string Version { get; set; }

        public bool DbConnection { get; set; }

        public bool FisApiConnection { get; set; }
    }
}