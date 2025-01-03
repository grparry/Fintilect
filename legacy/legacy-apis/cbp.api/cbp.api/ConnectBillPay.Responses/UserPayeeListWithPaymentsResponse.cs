using System.Collections.Generic;

namespace ConnectBillPay.Responses;

public class UserPayeeListWithPaymentsResponse
{
    public List<UserPayeeWithPaymentsResponse> UserPayees { get; set; }
}