using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ConnectBillPay.Api.Filters;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConnectBillPay.Api.Controllers
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
        /// Gets a user's payment history from a give search date
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="memberId">The user's membership ID</param>
        /// <param name="fromDate">The date to retrieve history for</param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("member/{memberId}/fromDate/{fromDate}")]
        [ProducesResponseType(typeof(PaymentHistoryListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetHistoryFromDate(string memberId, DateTime fromDate)
        {
            if (string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var serviceResponse = await _paymentHistoryService.GetHistoryFromDate(memberId, fromDate);
            if (serviceResponse.StatusCode >= 300)
            {
                return StatusCode(serviceResponse.StatusCode);
            }

            var response = new PaymentHistoryListResponse
            {
                PaymentHistories = serviceResponse.Object
            };
            return StatusCode(serviceResponse.StatusCode, response);
        }

        /// <summary>
        /// Gets a user's payment history with a payee
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="payeeId">The user's payee ID</param>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("member/{memberId}/payee/{payeeId}")]
        [ProducesResponseType(typeof(List<PayeeHistoryResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPayeeHistory(string payeeId, string memberId)
        {
            if (string.IsNullOrWhiteSpace(payeeId) ||
                string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var response = await _paymentHistoryService.GetPayeeHistory(memberId, payeeId);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Gets a payment history by ID for a given member
        /// </summary>
        /// <param name="memberId">The ID of the member to get the payment from</param>
        /// <param name="paymentId">The ID of the payment to get</param>
        /// <returns></returns>
        /// <response code="400">Invalid request received.</response>
        /// <response code="404">No resource found at the given memberId and paymentId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("member/{memberId}/payment/{paymentId}")]
        [ProducesResponseType(typeof(PaymentInquiryResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPayment(string memberId, string paymentId)
        {
            if (string.IsNullOrWhiteSpace(memberId) ||
                string.IsNullOrWhiteSpace(paymentId))
            {
                return BadRequest();
            }

            var response = await _paymentHistoryService.GetPayment(memberId, paymentId);
            return StatusCode(response.StatusCode, response.Object);
        }
    }
}
