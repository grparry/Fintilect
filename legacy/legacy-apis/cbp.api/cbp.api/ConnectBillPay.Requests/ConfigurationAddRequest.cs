namespace ConnectBillPay.Requests
{
    public class ConfigurationAddRequest
    {
        public string ConfigName { get; set; }
        public string ConfigValue { get; set; }
        public string Description { get; set; }
        public string DataType { get; set; }
        public string CreditUnionAccess { get; set; }
        public string ConnectSupportAccess { get; set; }
        public string ConnectManagerAccess { get; set; }
        public string LastUpdatedBy { get; set; }
        public string FriendlyName { get; set; }
    }
}
