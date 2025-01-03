using cbp.admin_api.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests;
using Responses;
using Services.Abstract;
using System;
using System.Threading.Tasks;

namespace cbp.admin_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<SupportNotificationController>))]
    public class SupportNotificationController : ControllerBase
    {
        private readonly ISupportNotificationService _supportNotificationService;

        public SupportNotificationController(ISupportNotificationService supportNotificationService)
        {
            _supportNotificationService = supportNotificationService;
        }

        /// <summary>
        /// Creates a new Support Notification
        /// </summary>
        /// <param name="request"></param>
        /// <response code="400">No status code provided in the request</response>
        /// <response code="409">A support notification already exists at the given status code</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Create(SupportNotificationCreateRequest request)
        {
            if (request.StatusCode == null)
            {
                return BadRequest();
            }

            var serviceResponse = await _supportNotificationService.CreateAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Get a Support Notification at a given Id
        /// </summary>
        /// <param name="id">The id of the support notification to get</param>
        /// <response code="400">Invalid Id given</response>
        /// <response code="500">Something went wrong</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(SupportNotificationResponse), 200)]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var serviceResponse = await _supportNotificationService.GetAsync(id);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Gets all Support Notifications
        /// </summary>
        /// <response code="500">Something went wrong</response>
        [HttpGet("all")]
        [ProducesResponseType(typeof(SupportNotificationListResponse), 200)]
        public async Task<IActionResult> GetAll()
        {
            var serviceResponse = await _supportNotificationService.GetAllAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Updates a Support Notification at the given Id
        /// </summary>
        /// <response code="400">Invalid Id or status code given</response>
        /// <response code="409">A support notification already exists at the given status code</response>
        /// <response code="500">Something went wrong</response>
        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Update(SupportNotificationUpdateRequest request)
        {
            if (request.Id == Guid.Empty ||
                request.StatusCode == null)
            {
                return BadRequest();
            }

            var serviceResponse = await _supportNotificationService.UpdateAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}
