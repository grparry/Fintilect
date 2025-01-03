using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Services.Abstract;
using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using Requests.Calendar;
using Responses.Calendar;

namespace Services.Implementation
{
    public class CalendarService : ICalendarService
    {
        private readonly IWarehouseGenericRepository<Holiday> _holidayRepository;
        private readonly IMapper _mapper;

        public CalendarService(IWarehouseGenericRepository<Holiday> holidayRepository,
            IMapper mapper)
        {
            _holidayRepository = holidayRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> AddHolidayAsync(HolidayCreateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.SponsorId))
            {
                request.SponsorId = "0";
            }

            var existing = await _holidayRepository.GetAsync(x => (x.SponsorId == request.SponsorId || x.SponsorId == "0") && x.Date == request.Date);

            if (existing != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409 // conflict
                };
            }

            var holiday = _mapper.Map<Holiday>(request);

            _holidayRepository.Add(holiday);
            await _holidayRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 201 // created
            };
        }

        public async Task<ServiceResponse> DeleteHolidayAsync(int holidayId)
        {
            var holiday = await _holidayRepository.GetAsync(x => x.Id == holidayId);

            if (holiday == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            _holidayRepository.Remove(holiday);
            await _holidayRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> EditHolidayAsync(HolidayUpdateRequest request)
        {
            var holiday = await _holidayRepository.GetAsync(x => x.Id == request.Id);

            if (holiday == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            _mapper.Map(request, holiday);

            _holidayRepository.Update(holiday);
            await _holidayRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse<HolidayListResponse>> GetAllHolidaysAsync(string sponsorId)
        {
            var holidays = (await _holidayRepository.FindAsync(x => x.SponsorId == sponsorId || x.SponsorId == "0"))
                .Select(x => _mapper.Map<HolidayResponse>(x))
                .ToList();

            return new ServiceResponse<HolidayListResponse>
            {
                StatusCode = 200,
                Object = new HolidayListResponse
                {
                    Holidays = holidays
                }
            };
        }

        public async Task<ServiceResponse<HolidayResponse>> GetHolidayAsync(int holidayId)
        {
            var holiday = await _holidayRepository.GetAsync(x => x.Id == holidayId);

            if (holiday == null)
            {
                return new ServiceResponse<HolidayResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<HolidayResponse>(holiday);

            return new ServiceResponse<HolidayResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }
    }
}
