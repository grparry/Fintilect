using System.Collections.Generic;
using ConnectBillPay.Core.Models;

namespace Responses.Search
{
    public class PaymentInformationSearchResponse
    {
        public List<PaymentInformationReport> PaymentInformationList { get; set; }
    }
}