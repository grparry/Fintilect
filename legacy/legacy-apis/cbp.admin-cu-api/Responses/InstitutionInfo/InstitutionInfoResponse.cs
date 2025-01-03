using System;

namespace ConnectBillPay.Responses
{
    public class InstitutionInfoResponse
    {
        public Guid Id { get; set; }
        public string Prefix { get; set; }
        public string Name { get; set; }
        public string PrimaryHours { get; set; }
        public string SponsorId { get; set; }
        public string RoutingNumber { get; set; }
        public string Notes { get; set; }
        public string AfterHoursContactPhone { get; set; }
        public string AfterHoursContactFirstName { get; set; }
        public string AfterHoursContactLastName { get; set; }
        public string SettlementAccountType { get; set; }
        public string SettlementGlCode { get; set; }
        public string SettlementAccountNumber { get; set; }
        public string SettlementExternalAch { get; set; }
    }
}
