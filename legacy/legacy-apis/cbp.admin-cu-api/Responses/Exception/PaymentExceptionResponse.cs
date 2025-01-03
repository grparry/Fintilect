using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Responses.Exception
{
    public class PaymentExceptionResponse
    {
        public int Id { get; set; }
        public string RecordType { get; set; }
        public string SponsorTransactionId { get; set; }
        public string SponsorId { get; set; }
        public string SponsorName { get; set; }
        public string CustomerId { get; set; }
        public string CustomerChangeIndicator { get; set; }
        public string PrimaryCustomerFirstName { get; set; }
        public string PrimaryCustomerLastName { get; set; }
        public string PrimaryCustomerSsn { get; set; }
        public string SecondaryCustomerFirstName { get; set; }
        public string SecondaryCustomerLastName { get; set; }
        public string SecondaryCustomerSsn { get; set; }
        public string BusinessName { get; set; }
        public string FederalTaxId { get; set; }
        public string CustomerAddress1 { get; set; }
        public string CustomerAddress2 { get; set; }
        public string CustomerCity { get; set; }
        public string CustomerState { get; set; }
        public string CustomerZip { get; set; }
        public string CustomerCountry { get; set; }
        public string CustomerTelephone { get; set; }
        public string InternalPayeeId { get; set; }
        public string PayeeChangeIndicator { get; set; }
        public string PayeeName { get; set; }
        public string PayeeAttentionLine { get; set; }
        public string PayeeTelephoneNumber { get; set; }
        public string PayeeAddress1 { get; set; }
        public string PayeeAddress2 { get; set; }
        public string PayeeCity { get; set; }
        public string PayeeState { get; set; }
        public string PayeeZip { get; set; }
        public string PayeeCountry { get; set; }
        public string PayeeNickname { get; set; }
        public string CustomerPayeeId { get; set; }
        public string CustomerPayeeAccountNumber { get; set; }
        public string ConfirmationNumber { get; set; }
        public string TransactionAmount { get; set; }
        public string MemoLineInfo { get; set; }
        public string ServiceRequestNumber { get; set; }
        public DateTime ServiceRequestDate { get; set; }
        public string ServiceRequestTime { get; set; }
        public string ServiceRequestType { get; set; }
        public string ProblemCauseType { get; set; }
        public string EffectiveDate { get; set; }
        public string DeliverByDate { get; set; }
        public string CheckNumber { get; set; }
        public DateTime Created { get; set; }
    }
}
