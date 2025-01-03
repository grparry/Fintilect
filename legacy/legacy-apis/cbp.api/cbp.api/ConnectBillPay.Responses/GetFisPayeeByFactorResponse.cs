namespace ConnectBillPay.Responses
{
    public class GetFisPayeeByFactorResponse
    {
        public string MerchantId { get; set; }

        public string MerchantName { get; set; }

        public string Webhelp { get; set; }

        public string PayeeId { get; set; }

        public string PayeeName { get; set; }

        public string AccountNumber { get; set; }

        public string CutoffTime { get; set; }

        public string LeadDays { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Address3 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string PostalCode { get; set; }

        public string Country { get; set; }

        public string Dpbc { get; set; }

        public string BillerType { get; set; }

        public string BillerId { get; set; }

        public string Help { get; set; }

        public string Terms { get; set; }

        public bool? Valid { get; set; }
    }
}
