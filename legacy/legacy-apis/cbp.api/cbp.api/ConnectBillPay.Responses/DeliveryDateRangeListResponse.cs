using System.Collections.Generic;

namespace ConnectBillPay.Responses;

public class DeliveryDateRangeListResponse
{
    public List<DeliveryDateRangeResponse> PaymentDates { get; set; }
}