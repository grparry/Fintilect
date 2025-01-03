namespace ConnectBillPay.Requests
{
    public class GetFisPayeeByFactorRequest
    {
        public string PayeeName { get; set; }
        
        public string UsersAccountAtPayee { get; set; }
        
        public string Address1 { get; set; }
        
        public string City { get; set; }
        
        public string State { get; set; }
        
        public string ZipCode { get; set; }
    }
}
