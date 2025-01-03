using System;

namespace ConnectBillPay.Responses
{
    public class PaymentInquiryResponse
    {
        public string PaymentId { get; set; }

        public string UserPayeeListId { get; set; }

        public string FundingAccount { get; set; }

        public int Amount { get; set; }

        public int StatusCode { get; set; }

        public string StatusCodeDescription { get; set; }

        public string Memo { get; set; }

        public string BillReference { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string PayeeId { get; set; }

        public string PayeeType { get; set; }

        public string RecurringPaymentId { get; set; }

        public DateTime? ProcessedDate { get; set; }

        public string PaymentMethod { get; set; }

        public DateTime WillProcessDate { get; set; }

        public string CheckNumber { get; set; }

        public string ConfirmationNumber { get; set; }

        public string PayeeName { get; set; }

        public string PayeeAddress1 { get; set; }

        public string PayeeAddress2 { get; set; }

        public string PayeeAddress3 { get; set; }

        public string PayeeCity { get; set; }

        public string PayeeState { get; set; }

        public string PayeeZipCode { get; set; }

        public string PayeePhone { get; set; }
    }
}
