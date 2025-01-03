using System.Threading.Tasks;
using cbp.admin_api.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Requests;
using Responses;
using Services.Abstract;

namespace cbp.admin_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<ExceptionController>))]
    public class ExceptionController : ControllerBase
    {
        private readonly IExceptionService _exceptionService;

        public ExceptionController(IExceptionService exceptionService)
        {
            _exceptionService = exceptionService;
        }

        /// <summary>
        /// Search exceptions based on request parameters
        /// </summary>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("search")]
        [ProducesResponseType(typeof(ExceptionListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> Search(ExceptionSearchRequest request)
        {
            var serviceResponse = await _exceptionService.SearchAsync(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Update exception correction to set a correction made
        /// </summary>
        /// <response code="500">Something went wrong.</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(ExceptionUpdateRequest request)
        {
            var serviceResponse = await _exceptionService.UpdateAsync(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Error);
        }
    }
}
