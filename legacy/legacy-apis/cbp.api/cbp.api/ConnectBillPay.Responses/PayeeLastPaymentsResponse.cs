using System;

namespace ConnectBillPay.Responses
{
    public class PayeeLastPaymentsResponse
    {
        public string UserPayeeListId { get; set; }

        public string Name { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string PaymentMethod { get; set; }

        public DateTime LastProcDate { get; set; }

        public int Amount { get; set; }

        public string ValidPayment { get; set; }
    }
}