using ConnectBillPay.Api.Filters;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ConnectBillPay.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<VersionController>))]
    public class VersionController : ControllerBase
    {

        private readonly IVersionService _versionService;

        public VersionController(IVersionService versionService)
        {
            _versionService = versionService;
        }

        /// <summary>
        /// Gets versions of all Global services
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(VersionResponse), 200)]
        public async Task<IActionResult> GetVersionAsync()
        {
            var serviceResponse = await _versionService.GetVersionAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
