using ConnectBillPay.Api.Filters;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ConnectBillPay.Api.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<BadRecordController>))]
    public class BadRecordController : ControllerBase
    {
        private readonly IBadRecordService _service;

        public BadRecordController(IBadRecordService service)
        {
            _service = service;
        }

        /// <summary>
        /// Gets all Bad Records on or after the given search date
        /// </summary>
        /// <param name="fromDate">The date to search from</param>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("from-date/{fromDate}")]
        [ProducesResponseType(typeof(BadRecordListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetBadRecordsFromDate(DateTime fromDate)
        {
            var serviceResponse = await _service.GetBadRecordsFromDate(fromDate);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}