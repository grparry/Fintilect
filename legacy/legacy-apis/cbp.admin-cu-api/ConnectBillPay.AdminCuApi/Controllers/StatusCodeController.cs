using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Responses.StatusCode;
using Services.Abstract;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<StatusCodeController>))]
    public class StatusCodeController : ControllerBase
    {
        private readonly IStatusCodeService _statusCodeService;

        public StatusCodeController(IStatusCodeService statusCodeService)
        {
            _statusCodeService = statusCodeService;
        }

        /// <summary>
        /// Returns a status code object of the given integer code
        /// </summary>
        /// <param name="code">The integer code to get</param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="404">No status code found at the given integer code.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("{code}")]
        [ProducesResponseType(typeof(StatusCodeResponse), 200)]
        public async Task<IActionResult> Get(int code)
        {
            var serviceResponse = await _statusCodeService.GetAsync(code);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Returns a list of all status code objects
        /// </summary>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("all")]
        [ProducesResponseType(typeof(StatusCodeListResponse), 200)]
        public async Task<IActionResult> GetAll()
        {
            var serviceResponse = await _statusCodeService.GetAllAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
