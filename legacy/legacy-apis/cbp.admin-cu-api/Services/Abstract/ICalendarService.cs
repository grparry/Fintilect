using Requests.Calendar;
using Responses.Calendar;
using System;
using System.Threading.Tasks;
using ConnectBillPay.Core.Providers.Model;
using ConnectBillPay.Core.Classes;

namespace Services.Abstract
{
    public interface ICalendarService
    {
        Task<ServiceResponse> AddHolidayAsync(HolidayCreateRequest request);

        Task<ServiceResponse> DeleteHolidayAsync(int holidayId);

        Task<ServiceResponse> EditHolidayAsync(HolidayUpdateRequest request);

        Task<ServiceResponse<HolidayListResponse>> GetAllHolidaysAsync(string sponsorId);

        Task<ServiceResponse<HolidayResponse>> GetHolidayAsync(int holidayId);
    }
}
