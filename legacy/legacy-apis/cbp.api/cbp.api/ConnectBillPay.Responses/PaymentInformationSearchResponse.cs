using System.Collections.Generic;
using ConnectBillPay.Core.Models;

namespace ConnectBillPay.Responses
{
    public class PaymentInformationSearchResponse
    {
        public List<PaymentInformationReport> PaymentInformationList { get; set; }
    }
}