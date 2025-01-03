namespace ConnectBillPay.Requests
{
    public class InstitutionInfoCreateRequest
    {
        public string AfterHoursContactFirstName { get; set; }

        public string AfterHoursContactLastName { get; set; }

        public string AfterHoursContactPhone { get; set; }

        public string SponsorId { get; set; }

        public string Name { get; set; }

        public string Prefix { get; set; }

        public string Notes { get; set; }

        public string PrimaryHours { get; set; }

        public string RoutingNumber { get; set; }
    }
}
