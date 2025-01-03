using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.PaymentHistory;
using Responses.PaymentHistory;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<PaymentHistoryController>))]
    public class PaymentHistoryController : ControllerBase
    {
        private readonly IPaymentHistoryService _paymentHistoryService;

        public PaymentHistoryController(IPaymentHistoryService paymentHistoryService)
        {
            _paymentHistoryService = paymentHistoryService;
        }
        /// <summary>
        /// Runs the report on ErrorRecap
        /// </summary>
        /// <param name="request">
        /// SearchType of Type "ErrorHistorySearchType"
        ///   Valid Values
        ///   0 -  PaymentId, 1 - MemberId, 2 - UserPayeeListId, 3 - StatusCode, 4 - Date, 5 - PayeeId, 6 - PayeeName
        /// </param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("error-recap")]
        [ProducesResponseType(typeof(ErrorHistoryListResponse), 200)]
        public async Task<IActionResult> ErrorHistoryReport(ErrorHistoryReportRequest request)
        {
            var serviceResponse = await _paymentHistoryService.ErrorHistory(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Runs the report on ErrorRecap
        /// </summary>
        /// <param name="runDate">The runDate of the report</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("large-payment/{runDate}")]
        [ProducesResponseType(typeof(LargePaymentListResponse), 200)]
        public async Task<IActionResult> ErrorHistoryReport(string runDate)
        {
            var serviceResponse = await _paymentHistoryService.GetLargePayments(runDate);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
