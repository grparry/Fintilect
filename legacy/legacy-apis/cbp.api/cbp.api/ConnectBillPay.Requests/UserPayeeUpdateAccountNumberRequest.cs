﻿namespace ConnectBillPay.Requests
{
    public class UserPayeeUpdateAccountNumberRequest
    {
        public string UserPayeeListId { get; set; }

        public string AccountNumber { get; set; }
    }
}