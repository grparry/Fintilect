using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Responses;
using ConnectBillPay.Requests;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Api.Filters;
using System;

namespace ConnectBillPay.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<ConfigurationController>))]
    public class ConfigurationController : ControllerBase
    {
        private readonly IConfigurationService _configurationService;
        private readonly IMapper _mapper;

        public ConfigurationController(IConfigurationService configurationService,
            IMapper mapper)
        {
            _configurationService = configurationService;
            _mapper = mapper;
        }

        /// <summary>
        /// Brings back a configuration entry from the configuration table
        /// </summary>
        /// <param name="id">id of configuration be looked for
        /// </param>
        /// <response code="500">Something went wrong</response>
        /// <response code="400">config was null</response>
        /// <response code="404">Not Found</response>

        [ProducesResponseType(typeof(ConfigurationResponse), StatusCodes.Status200OK)]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            var configuration = await _configurationService.Get(id);
            if (configuration == null)
                return NotFound();

            var response = _mapper.Map<ConfigurationResponse>(configuration);
            return Ok(response);
        }

        /// <summary>
        /// Brings back a all configurations  from the configuration table
        /// </summary>
        /// <response code="500">Something went wrong</response>

        [ProducesResponseType(typeof(ConfigurationListResponse), StatusCodes.Status200OK)]
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var list = await _configurationService.GetAll();
            return Ok(new ConfigurationListResponse
            {
                Configurations = list.ToList()
            });
        }

        /// <summary>
        /// Creates a configuration entry in the configuration table
        /// </summary>
        /// <param name="configurationAddRequest">configuration to be added to configuration table
        /// </param>
        /// <response code="500">Something went wrong</response>
        /// <response code="409">Config Already Exists</response>

        [ProducesResponseType( StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<IActionResult> Create(ConfigurationAddRequest configurationAddRequest)
        {
            var httpStatus = await _configurationService.Create(configurationAddRequest);
            if (httpStatus)
            {
                return StatusCode(201);
            }
            else
            {
                return Conflict();
            }
        }

        /// <summary>
        /// Creates a configuration entry in the configuration table
        /// </summary>
        /// <param name="configurationUpdateRequest">configuration to be updated
        /// </param>
        /// <response code="500">Something went wrong</response>
        /// <response code="404">Could not fine config to update</response>

        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPut("")]
        public async Task<IActionResult> Update(ConfigurationUpdateRequest configurationUpdateRequest)
        {
            var httpStatus = await _configurationService.Update(configurationUpdateRequest);
            if (httpStatus)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Deletes a configuration entry with the given config name
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A configuration at the given name was not found.</response>
        /// <response code="500">Something went wrong.</response>

        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest();
            }

            bool found = await _configurationService.Delete(id);
            if (found)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
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
    }
}
