using System;

namespace ConnectBillPay.Responses
{
    public class ScheduledPaymentChangeHistoryResponse
	{
		public string MemberId { get; set; }
		public string UpdatedBy { get; set; }
		public DateTime UpdatedOn { get; set; }
		public string Reason { get; set; }
		public string ChangeType { get; set; }
		public string PaymentId { get; set; }
		public string PayeeId { get; set; }
		public string FisPayeeId { get; set; }
		public string PayeeName { get; set; }
		public string Account { get; set; }
		public int Amount { get; set; }
		public DateTime WillProcessDate { get; set; }
		public DateTime? DueDate { get; set; }
		public string Status { get; set; }
		public string Memo { get; set; }
		public string SourceApplication { get; set; }
		public string PayeeType { get; set; }
	}
}
