using ConnectBillPay.Api.Filters;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ConnectBillPay.Api.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<StatusController>))]
    public class StatusController : ControllerBase
    {
        private readonly IStatusService _statusService;

        public StatusController(IStatusService statusService)
        {
            _statusService = statusService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStatus()
        {
            var response = await _statusService.GetStatus();
            return StatusCode(response.StatusCode, response.Object);
        }
    }
}
