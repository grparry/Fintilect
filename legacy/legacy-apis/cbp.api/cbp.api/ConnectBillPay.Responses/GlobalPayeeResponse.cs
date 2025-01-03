namespace ConnectBillPay.Responses
{
    public class GlobalPayeeResponse
    {
        public string RecordType { get; set; }
        public string InternalPayeeId { get; set; }
        public string PayeeName { get; set; }
        public string AttentionLine { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string CountryCode { get; set; }
        public string PhoneNumber { get; set; }
        public string PayeeStatus { get; set; }
        public string DisbursementType { get; set; }
        public string PayeeLevelType { get; set; }
        public string CustomerId { get; set; }
        public string PositionHolder1 { get; set; }
        public string ElectronicLeadTime { get; set; }
        public string CheckLeadTime { get; set; }
        public string PositionHolder2 { get; set; }
        public string OfacStatus { get; set; }
        public string CloseReason { get; set; }
        public string FileCreatorCutoffTime { get; set; }
        public string IndustryCode { get; set; }
    }
}
