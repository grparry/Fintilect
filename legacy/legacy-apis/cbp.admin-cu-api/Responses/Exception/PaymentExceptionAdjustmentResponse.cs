using System;

namespace Responses.Exception
{
    public class PaymentExceptionAdjustmentResponse
    {
        public long Id { get; set; }
        public int PaymentExceptionId { get; set; }
        public long PaymentHistoryId { get; set; }
        public bool Successful { get; set; }
        public long Amount { get; set; }
        public DateTime Created { get; set; }
        public string Type { get; set; }
    }
}
