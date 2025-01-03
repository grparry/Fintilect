using cbp.admin_api.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests;
using Services.Abstract;
using System.Threading.Tasks;

namespace cbp.admin_api.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<ConfigurationController>))]
    public class ConfigurationController : ControllerBase
    {
        private readonly IConfigurationService _configurationService;

        public ConfigurationController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        [HttpPost("refresh")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Refresh(ConfigurationRefreshRequest request)
        {
            var serviceResponse = await _configurationService.RefreshAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}
