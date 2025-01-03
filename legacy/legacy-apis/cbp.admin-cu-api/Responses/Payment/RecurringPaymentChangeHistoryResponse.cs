using System;

namespace Responses.Payment
{
	public class RecurringPaymentChangeHistoryResponse
	{
		public string MemberId { get; set; }
		public string UpdatedBy { get; set; }
		public DateTime UpdatedOn { get; set; }
		public string Reason { get; set; }
		public string ChangeType { get; set; }
		public string RecurringPaymentId { get; set; }
		public string PayeeId { get; set; }
		public string FisPayeeId { get; set; }
		public string PayeeName { get; set; }
		public string Account { get; set; }
		public bool Active { get; set; }
		public int Amount { get; set; }
		public DateTime? LastProcessedDate { get; set; }
		public DateTime NextProcessDate { get; set; }
		public DateTime? NextDueDate { get; set; }
		public short NumberOfPayments { get; set; }
		public string Frequency { get; set; }
		public string Memo { get; set; }
		public string SourceApplication { get; set; }
		public string PayeeType { get; set; }
	}
}
