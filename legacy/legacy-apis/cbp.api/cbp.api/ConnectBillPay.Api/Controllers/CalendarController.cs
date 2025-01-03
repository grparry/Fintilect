using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ConnectBillPay.Api.Filters;
using ConnectBillPay.Core.Providers.Model;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConnectBillPay.Api.Controllers
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
        /// Gets the delivery dates for a given begin date
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="beginDate">The beginning date - 2000-01-01T00:00:00.000 format</param>
        /// <response code="404">A DeliveryDate at the given beginDate was not found.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("delivery-date/{beginDate}")]
        [ProducesResponseType(typeof(DeliveryDatesResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeliveryDates(DateTime beginDate)
        {
            var response = await _calendarService.GetDeliveryDates(beginDate);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Gets the delivery dates for a given begin date
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="beginDate">The beginning date - 2000-01-01T00:00:00.000 format</param>
        /// <param name="count">The number of dates returned</param>
        /// <response code="404">A DeliveryDate at the given beginDate was not found.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("delivery-date/{beginDate}/{count}")]
        [ProducesResponseType(typeof(DeliveryDateRangeListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeliveryDates(DateTime beginDate, int count)
        {
            var response = await _calendarService.GetDeliveryDates(beginDate, count);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Gets if a given date is a holiday
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="date">The date to check - 2000-01-01T00:00:00.000 format</param>
        /// <response code="404">Unable to find current institution info.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("holiday/date/{date}")]
        [ProducesResponseType(typeof(IsHolidayResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetIsHoliday(DateTime date)
        {
            var response = await _calendarService.GetIsHoliday(date);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Gets all non processing dates for the next 2 years
        /// </summary>
        /// <response code="400">Institution Info is missing</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("non-processing")]
        [ProducesResponseType(typeof(NonProcessingDatesResponse), 200)]
        public async Task<IActionResult> GetNonProcessingDates()
        {
            var serviceResponse = await _calendarService.GetNonProcessingDates(DateTime.Now);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
