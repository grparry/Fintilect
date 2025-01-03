using ConnectBillPay.Core.Enums;

namespace Requests
{
    public class ExceptionUpdateRequest
    {
        public int Id { get; set; }

        public ExceptionCorrectionType CorrectionType { get; set; }

        public string? UsersAccountAtPayee { get; set; }

        public string? ManualDescription { get; set; }

        public string? FisPayeeId { get; set; }
    }
}
