using System;

namespace ConnectBillPay.Responses;

public class DeliveryDateRangeResponse
{
    public DateTime PaymentDate { get; set; }

    public DateTime CheckDeliveryDate { get; set; }

    public DateTime ElectronicDeliveryDate { get; set; }
}