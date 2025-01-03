using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.AdminCuApi.Filters;
using Responses;
using Services.Abstract;

namespace ConnectBillPay.AdminCuApi.Controllers
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
        [ProducesResponseType(typeof(CbpVersionResponse), 200)]
        public async Task<IActionResult> GetVersionAsync()
        {
            var serviceResponse = await _versionService.GetVersionAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
