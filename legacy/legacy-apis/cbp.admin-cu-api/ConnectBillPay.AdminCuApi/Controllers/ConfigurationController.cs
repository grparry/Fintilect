using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.Configuration;
using Responses.Configuration;
using Services.Abstract;
using System;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<ConfigurationController>))]
    public class ConfigurationController : ControllerBase
    {
        private readonly IConfigurationService _configurationService;

        public ConfigurationController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        /// <summary>
        /// Creates a configuration entry in the configuration table
        /// </summary>
        /// <param name="request">configuration to be added to configuration table
        /// </param>
        /// <response code="409">Configuration already exists with the given ConfigName</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<IActionResult> Create(ConfigurationCreateRequest request)
        {
            var serviceResponse = await _configurationService.CreateAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Deletes a configuration entry with the given config name
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A configuration at the given name was not found.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var serviceResponse = await _configurationService.DeleteAsync(id);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Brings back a configuration entry from the configuration table
        /// </summary>
        /// <param name="id">id of configuration be looked for
        /// </param>
        /// <response code="500">Something went wrong</response>
        /// <response code="400">config was null</response>
        /// <response code="404">Not Found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ConfigurationResponse), 200)]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var serviceResponse = await _configurationService.GetAsync(id);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Brings back a all configurations  from the configuration table
        /// </summary>
        /// <response code="500">Something went wrong</response>
        [HttpGet("all")]
        [ProducesResponseType(typeof(ConfigurationListResponse), 200)]
        public async Task<IActionResult> GetAll()
        {
            var serviceResponse = await _configurationService.GetAllAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Refreshes stored configuration settings
        /// </summary>
        /// <response code="500">Something went wrong</response>
        [HttpPost("refresh")]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Refresh()
        {
            var serviceResponse = await _configurationService.RefreshAsync();
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Creates a configuration entry in the configuration table
        /// </summary>
        /// <param name="request">configuration to be updated
        /// </param>
        /// <response code="404">Could not fine config to update</response>
        /// <response code="409">Configuration already exists with the given ConfigName</response>
        /// <response code="500">Something went wrong</response>
        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Update(ConfigurationUpdateRequest request)
        {
            var serviceResponse = await _configurationService.UpdateAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}
