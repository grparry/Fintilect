using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.Exception;
using Responses.Exception;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
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
        /// Gets exceptions for a given date
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="date">The date of the exceptions</param>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("{date}")]
        [ProducesResponseType(typeof(PaymentExceptionListResponse), 200)]
        public async Task<IActionResult> GetExceptionsBySingleDate(DateTime date)
        {
            var response = await _exceptionService.GetExceptionsBySingleDateAsync(date);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Refunds a Payment
        /// </summary>
        /// <returns></returns>
        /// <response code="400">Bad request received</response>
        /// <response code="404">A bad exceptionId or PaymentId</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("refund")]
        [ProducesResponseType(typeof(ExceptionRefundResponse), 200)]
        public async Task<IActionResult> CheckForRefundAdjustment([FromBody] ExceptionRefundRequest request)
        {
            var response = await _exceptionService.CheckForRefundAdjustmentAsync(request.PaymentId, request.ExceptionId);
            return StatusCode(response.StatusCode, response.Object);
        }
    }
}
