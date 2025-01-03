using System;

namespace ConnectBillPay.Requests
{
    public class GlobalPayeeEditRequest
    {
        public string UserPayeeListId { get; set; }

        public string PayeeId { get; set; }

        public string AccountName { get; set; }

        public string AccountNumber { get; set; }

        public bool Active { get; set; }

        public bool Favorite { get; set; }

        public string Nickname { get; set; }

        public string MemberId { get; set; }

    }
}