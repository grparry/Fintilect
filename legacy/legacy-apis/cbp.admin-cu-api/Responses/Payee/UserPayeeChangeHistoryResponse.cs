using System;

namespace Responses.Payee
{
    public class UserPayeeChangeHistoryResponse
    {
        public string MemberId { get; set; }

        public string UserPayeeListId { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public string Reason { get; set; }

        public string ChangeType { get; set; }

        public string PayeeId { get; set; }

        public string FisPayeeId { get; set; }

        public string PayeeName { get; set; }

        public string UsersAccountAtPayee { get; set; }

        public string NameOnAccount { get; set; }

        public string PaymentMethod { get; set; }

        public bool? Active { get; set; }

        public string PayeeType { get; set; }
    }
}
