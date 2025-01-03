using System;

namespace ConnectBillPay.Requests
{
    public class ManualRunCreateRequest
    {
        public DateTime? ProcessDate { get; set; }

        public bool ReprocessOnly { get; set; }
    }
}
