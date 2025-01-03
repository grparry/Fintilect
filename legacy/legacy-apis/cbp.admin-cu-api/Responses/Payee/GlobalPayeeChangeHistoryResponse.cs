using System;

namespace Responses.Payee;

public class GlobalPayeeChangeHistoryResponse
{
    public int Id { get; set; }
    public string RecordType { get; set; }
    public string InternalPayeeId { get; set; }
    public string PayeeName { get; set; }
    public string UserPayeeListId { get; set; }
    public string MemberId { get; set; }
    public string MemberFirstName { get; set; }
    public string MemberMiddleName { get; set; }
    public string MemberLastName { get; set; }
    public string AttentionLine { get; set; }
    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string CountryCode { get; set; }
    public string PhoneNumber { get; set; }
    public string PayeeStatus { get; set; }
    public string DisbursementType { get; set; }
    public string PayeeLevelType { get; set; }
    public string CustomerId { get; set; }
    public string ElectronicLeadTime { get; set; }
    public string CheckLeadTime { get; set; }
    public string Ofacstatus { get; set; }
    public string CloseReason { get; set; }
    public string FileCreatorCutoffTime { get; set; }
    public string IndustryCode { get; set; }
    public string Reason { get; set; }
    public DateTime InsertDate { get; set; }
}