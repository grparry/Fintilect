using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;
using System;
using System.Threading.Tasks;
using ConnectBillPay.Core.Providers.Model;
using System.Collections.Generic;

namespace ConnectBillPay.Services.Abstract
{
    public interface ICalendarService
    {
        Task<ServiceResponse<DeliveryDatesResponse>> GetDeliveryDates(DateTime beginDate);

        Task<ServiceResponse<DeliveryDateRangeListResponse>> GetDeliveryDates(DateTime beginDate, int count);

        Task<ServiceResponse<IsHolidayResponse>> GetIsHoliday(DateTime date);

        Task<ServiceResponse<NonProcessingDatesResponse>> GetNonProcessingDates(DateTime fromDate);
    }
}
