using System.Collections.Generic;
using AutoMapper.Internal;

namespace ConnectBillPay.Responses;

public class UserPayeeWithPaymentsResponse
{
    public UserPayeeResponse UserPayee { get; set; }

    public List<MemberPayment> Payments { get; set; }
}