using System;
using System.Threading.Tasks;
using cbp.admin_api.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Responses;
using Services.Abstract;

namespace cbp.admin_api.Controllers
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
        /// Gets all Bad Records on the given search date
        /// </summary>
        /// <param name="date">The date to search on</param>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("date/{date}")]
        [ProducesResponseType(typeof(BadRecordListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetBadRecordsOnDate(DateTime date)
        {
            var serviceResponse = await _service.GetBadRecordsAsync(date);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
