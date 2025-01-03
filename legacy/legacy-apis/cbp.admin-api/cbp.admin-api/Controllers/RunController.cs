using cbp.admin_api.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests;
using Services.Abstract;
using System.Threading.Tasks;

namespace cbp.admin_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<RunController>))]
    public class RunController : ControllerBase
    {
        private readonly IRunService _runService;

        public RunController(IRunService runService)
        {
            _runService = runService;
        }

        /// <summary>
        /// Creates a manual payment processing run for a given CU
        /// </summary>
        /// <response code="400">Given sponsorId or date is invalid</response>
        /// <response code="404">No CU found at the given sponsorId</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("manual")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CreateManualRun(ManualRunCreateRequest request)
        {
            if (request.ProcessDate == null)
            {
                return BadRequest();
            }

            var response = await _runService.CreateManualRunAsync(request);
            return StatusCode(response.StatusCode);
        }
    }
}
