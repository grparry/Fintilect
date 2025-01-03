using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.Calendar;
using Responses.Calendar;
using Services.Abstract;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<CalendarController>))]
    public class CalendarController : ControllerBase
    {
        private readonly ICalendarService _calendarService;

        public CalendarController(ICalendarService calendarService)
        {
            _calendarService = calendarService;
        }

        /// <summary>
        /// Adds a new holiday
        /// </summary>
        /// <param name="request"></param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="409">The requested holiday conflicts with an existing holday (same date).</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("holiday")]
        [ProducesResponseType(201)]
        public async Task<IActionResult> CreateHoliday(HolidayCreateRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            var serviceResponse = await _calendarService.AddHolidayAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Deletes a holiday
        /// </summary>
        /// <param name="holidayId">The id of the holiday to delete</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">The requested holiday could not be found</response>
        /// <response code="500">Something went wrong.</response>
        [HttpDelete("holiday/{holidayId}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> DeleteHoliday(int holidayId)
        {
            var serviceResponse = await _calendarService.DeleteHolidayAsync(holidayId);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Edits an existing credit union holiday
        /// </summary>
        /// <param name="request"></param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">The requested holiday could not be found</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut("holiday")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateHoliday(HolidayUpdateRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            var serviceResponse = await _calendarService.EditHolidayAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Gets an existing credit union holiday
        /// </summary>
        /// <param name="holidayId">The id of the holiday to get</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">The requested holiday could not be found</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("holiday/{holidayId}")]
        [ProducesResponseType(typeof(HolidayResponse), 200)]
        public async Task<IActionResult> GetHoliday(int holidayId)
        {
            var serviceResponse = await _calendarService.GetHolidayAsync(holidayId);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Gets all credit union holidays
        /// </summary>
        /// <param name="sponsorId">The credit union sponsor id (0 for global only)</param>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("holiday/all/{sponsorId}")]
        [ProducesResponseType(typeof(HolidayListResponse), 200)]
        public async Task<IActionResult> GetAllHoliday(string sponsorId)
        {
            var serviceResponse = await _calendarService.GetAllHolidaysAsync(sponsorId);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
