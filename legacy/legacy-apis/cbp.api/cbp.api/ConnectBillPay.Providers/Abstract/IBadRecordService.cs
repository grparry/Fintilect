using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;
using System;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Abstract
{
    public interface IBadRecordService
    {
        Task<ServiceResponse<BadRecordListResponse>> GetBadRecordsFromDate(DateTime fromDate);
    }
}
