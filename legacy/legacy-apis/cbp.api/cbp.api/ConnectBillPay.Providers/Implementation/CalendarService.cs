using AutoMapper;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Classes;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Providers.Model;

namespace ConnectBillPay.Services.Implementation
{
    public class CalendarService : ICalendarService
    {
        private readonly IWarehouseGenericRepository<Holiday> _holidayRepository;
        private readonly ICuGenericRepository<InstitutionInfo> _institutionInfoRepository;
        private readonly IMapper _mapper;
        private readonly ConnectBillPaySettings _settings;
        private readonly ICalendarProvider _calendarProvider;

        public CalendarService(IWarehouseGenericRepository<Holiday> holidayRepository,
            ICuGenericRepository<InstitutionInfo> institutionInfoRepository,
            IMapper mapper,
            ConnectBillPaySettings settings, ICalendarProvider calendarProvider)
        {
            _holidayRepository = holidayRepository;
            _institutionInfoRepository = institutionInfoRepository;
            _mapper = mapper;
            _settings = settings;
            _calendarProvider = calendarProvider;
        }

        public async Task<ServiceResponse<DeliveryDatesResponse>> GetDeliveryDates(DateTime beginDate)
        {
            var response = await _calendarProvider.GetDeliveryDates(beginDate);

            return new ServiceResponse<DeliveryDatesResponse>
            {
                Object = response,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<DeliveryDateRangeListResponse>> GetDeliveryDates(DateTime beginDate, int count)
        {
            var dates = new List<DeliveryDateRangeResponse>();
            for (int i = 0; i <= count; i++)
            {
                var date = beginDate.AddDays(i);
                var response = await _calendarProvider.GetDeliveryDates(date);
                dates.Add(new DeliveryDateRangeResponse
                {
                    PaymentDate = date,
                    CheckDeliveryDate = response.CheckDeliveryDate ?? DateTime.Now,
                    ElectronicDeliveryDate = response.ElectronicDeliveryDate ?? DateTime.Now
                });
            }
            
            return new ServiceResponse<DeliveryDateRangeListResponse>
            {
                Object = new DeliveryDateRangeListResponse
                {
                    PaymentDates = dates
                },
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<IsHolidayResponse>> GetIsHoliday(DateTime date)
        {
            var institution = (await _institutionInfoRepository.AllAsync()).FirstOrDefault();

            if (institution == null)
            {
                return new ServiceResponse<IsHolidayResponse>
                {
                    StatusCode = 404
                };
            }

            var holiday = await _holidayRepository.GetAsync(x => x.Date.Date == date.Date && (x.SponsorId == "0" || x.SponsorId == institution.SponsorId));

            var response = new IsHolidayResponse
            {
                IsHoliday = holiday != null
            };

            return new ServiceResponse<IsHolidayResponse>
            {
                Object = response,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<NonProcessingDatesResponse>> GetNonProcessingDates(DateTime fromDate)
        {
            var institution = (await _institutionInfoRepository.AllAsync())
                .FirstOrDefault();

            if (institution == null)
            {
                return new ServiceResponse<NonProcessingDatesResponse>
                {
                    StatusCode = 400
                };
            }

            var processingDays = _settings.ProcessDays;
            var nonProcessingDates = new List<DateTime>();

            // get global and CU holidays from now to 2 years
            var minDate = fromDate.Date;
            var maxDate = minDate.AddYears(2);

            var holidays = (await _holidayRepository.FindAsync(x => x.Date >= minDate && x.Date <= maxDate && (x.SponsorId == "0" || x.SponsorId == institution.SponsorId)))
                .GroupBy(x => x.Date.Date)
                .ToDictionary(x => x.First().Date.Date);

            // loop the dates and check for holidays and day of the week
            var date = minDate;
            do
            {
                if (!processingDays.Any(x => x.Equals(date.DayOfWeek.ToString(), StringComparison.InvariantCultureIgnoreCase)) ||
                    holidays.TryGetValue(date, out var holidayGroup))
                {
                    nonProcessingDates.Add(date);
                }

                date = date.AddDays(1);
            }
            while (date <= maxDate);

            return new ServiceResponse<NonProcessingDatesResponse>
            {
                StatusCode = 200,
                Object = new NonProcessingDatesResponse
                {
                    Dates = nonProcessingDates
                }
            };
        }
    }
}
