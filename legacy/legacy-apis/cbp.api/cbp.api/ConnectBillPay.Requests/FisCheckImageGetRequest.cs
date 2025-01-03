namespace ConnectBillPay.Requests
{
    public class FisCheckImageGetRequest
    {
        public string RoutingId { get; set; }

        public string MemberId { get; set; }

        public string ConfirmationNumber { get; set; }
    }
}
