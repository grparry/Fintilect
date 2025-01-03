using System;

namespace Responses.Payment
{
    public class PaymentActivityResponse
    {
        public string MemberID { get; set; }
        public string PaymentID { get; set; }
        public string PayeeID { get; set; }
        public string FisPayeeId { get; set; }
        public string PayeeName { get; set; }
        public DateTime? DateProcessed { get; set; }
        public DateTime? DueDate { get; set; }
        public int StatusCode { get; set; }
        public string StatusName { get; set; }
        public string PaymentMethod { get; set; }
        public int Amount { get; set; }
    }
}