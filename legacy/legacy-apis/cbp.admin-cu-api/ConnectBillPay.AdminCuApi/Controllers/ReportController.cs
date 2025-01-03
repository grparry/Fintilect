using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Requests.Report;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<ReportController>))]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        /// <summary>
        /// Runs the report on the specified request
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="request">The stored procedure string and the arguments to the procedure</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">Endpoint was not found.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("run")]
        [ProducesResponseType(typeof(string), 200)]
        public async Task<IActionResult> RunReport([FromBody] ReportRunRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
            {
                return BadRequest();
            }

            var response = await _reportService.RunReport(request.Name, request.Arguments);
            dynamic jsonResponse = JsonConvert.DeserializeObject(response.Object.JsonResponse);
            return StatusCode(response.StatusCode, new { jsonResponse });
        }
    }
}
