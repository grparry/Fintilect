﻿using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.Run;
using Services.Abstract;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]/")]
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
        /// Creates and queues a new manual payment processing run
        /// </summary>
        /// <response code="400">Invalid process date.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("manual")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CreateManualRun(ManualRunCreateRequest request)
        {
            if (request.ProcessDate == null)
            {
                return BadRequest();
            }

            var serviceResponse = await _runService.CreateManualRunAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}