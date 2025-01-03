using System;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using Responses;


namespace Services.Abstract
{
    public interface IBadRecordService
    {
        Task<ServiceResponse<BadRecordListResponse>> GetBadRecordsAsync(DateTime fromDate);
    }
}
