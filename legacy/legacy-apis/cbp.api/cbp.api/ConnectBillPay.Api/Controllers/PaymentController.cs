using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using ConnectBillPay.Api.Filters;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ConnectBillPay.Api.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<PaymentController>))]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService, ILogger<PaymentController> logger)
        {
            _paymentService = paymentService;
        }

        /// <summary>
        /// Adds a new one time payment
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="request">
        ///     UserPayeeListId          - Id of the UserPayeeList to reference
        ///     MemberId             - The payer's member Id
        ///     FundingAccount       - The account funding the payment
        ///     Amount               - The amount to pay
        ///     Memo                 - A short message to store with the payment
        ///     BillReference
        ///     SourceApplication    - The application creating the payment
        ///     WillProcessDate      - The date the payment will process
        ///     DeliveryDate         - The date the payment will deliver
        /// </param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="409">A one-time payment already exists at the given UserPayeeListId and MemberId</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("one-time")]
        [ProducesResponseType(typeof(PaymentResponse), StatusCodes.Status201Created)]
        public async Task<IActionResult> AddOneTimePayment([FromBody] OneTimePaymentAddRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.MemberId) ||
                string.IsNullOrWhiteSpace(request.FundingAccount))
            {
                return BadRequest();
            }

            var response = await _paymentService.AddOneTimePayment(request);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Adds a new recurring payment
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="request">
        ///     UserPayeeListId          - Id of the UserPayeeList to reference
        ///     MemberId             - The payer's member Id
        ///     FundingAccount       - The account funding the payment
        ///     Amount               - The amount to pay
        ///     Memo                 - A short message to store with the payment
        ///     BillReference
        ///     SourceApplication    - The application creating the payment
        ///     WillProcessDate      - The date the payment will process
        ///     DeliveryDate         - The date the payment will deliver
        ///     NumPayments          - The number of payments to make
        ///     Frequency            - The frequency to send payments at
        ///     ProcessDate          - The process date for payments
        /// </param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="409">A recurring payment already exists at the given UserPayeeListId and MemberId</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("recurring")]
        [ProducesResponseType(typeof(PaymentResponse), StatusCodes.Status201Created)]
        public async Task<IActionResult> AddRecurringPayment([FromBody] RecurringPaymentAddRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.MemberId) ||
                string.IsNullOrWhiteSpace(request.FundingAccount))
            {
                return BadRequest();
            }

            var response = await _paymentService.AddRecurringPayment(request);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Deletes a one time payment resource
        /// </summary>
        /// <param name="memberId">The member requesting</param>
        /// <param name="paymentId">The ID of the one time payment</param>
        /// <returns></returns>
        /// <response code="400">Invalid request received.</response>
        /// <response code="404">No resource found at the given memberId and paymentId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpDelete("one-time/{paymentId}/member/{memberId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteOneTimePayment(string memberId, string paymentId)
        {
            if (string.IsNullOrWhiteSpace(memberId) ||
                string.IsNullOrWhiteSpace(paymentId))
            {
                return BadRequest();
            }

            var response = await _paymentService.DeleteOneTimePayment(memberId, paymentId);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Deletes a recurring payment resource
        /// </summary>
        /// <param name="memberId">The member requesting</param>
        /// <param name="paymentId">The ID of the one time payment</param>
        /// <returns></returns>
        /// <response code="400">Invalid request received.</response>
        /// <response code="404">No resource found at the given memberId and paymentId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpDelete("recurring/{paymentId}/member/{memberId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteRecurringPayment(string memberId, string paymentId)
        {
            if (string.IsNullOrWhiteSpace(memberId) ||
                string.IsNullOrWhiteSpace(paymentId))
            {
                return BadRequest();
            }

            var response = await _paymentService.DeleteRecurringPayment(memberId, paymentId);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Edit's a payment
        /// </summary>
        /// <param name="paymentId">The ID of the payment to edit</param>
        /// <param name="request">
        ///     Account              - The account that is funding the payment
        ///     MemberId             - The payer's member Id
        ///     Amount               - The account funding the payment
        ///     WillProcessDate      - The date the payment will process
        ///     Suspended            - The date the payment will deliver
        /// </param>
        /// <returns></returns>
        /// <response code="400">Invalid request received.</response>
        /// <response code="404">No resource found at the given memberId and paymentId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut("{paymentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditPayment(string paymentId, [FromBody] PaymentEditRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(paymentId)||
                string.IsNullOrWhiteSpace(request.Account) ||
                string.IsNullOrWhiteSpace(request.MemberId))
            {
                return BadRequest();
            }

            var response = await _paymentService.EditPayment(paymentId, request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Gets a user's last payee payments
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("last-payments/{memberId}")]
        [ProducesResponseType(typeof(List<PayeeLastPaymentsResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLastPayments(string memberId)
        {
            if (string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var response = await _paymentService.GetLastPayments(memberId);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Gets a member's payments
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("member/{memberId}")]
        [ProducesResponseType(typeof(List<MemberPayment>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMemberPayments(string memberId)
        {
            if (string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var response = await _paymentService.GetPendingPayments(memberId);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Gets a member's payments
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("member-recurring/{memberId}")]
        [ProducesResponseType(typeof(List<MemberPayment>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMemberRecurringPayments(string memberId)
        {
            if (string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var response = await _paymentService.GetRecurringPayments(memberId);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Gets a member's recurring payments before a certain date
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="memberId">The user's memberId</param>
        /// <param name="endDate">Return payments before endDate</param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("member-recurring-date/{memberId}/{endDate}")]
        [ProducesResponseType(typeof(List<MemberPayment>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMemberRecurringPaymentsToDate(string memberId, string endDate)
        {
            if (string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            if (!DateTime.TryParseExact(endDate, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
            {
                return BadRequest();
            }

            var response = await _paymentService.GetRecurringPaymentsToDate(memberId, date);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Queues a payment for reprocessing
        /// </summary>
        /// <returns></returns>
        /// <response code="400">Bad request received</response>
        /// <response code="404">A payment could not be found at the given ID</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("reprocess")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Reprocess(PaymentReprocessRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.PaymentId) )
            {
                return BadRequest();
            }

            var response = await _paymentService.ReprocessAsync(request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Updates the status of a payment
        /// </summary>
        /// <returns></returns>
        /// <response code="400">Bad request received</response>
        /// <response code="404">A payment could not be found at the given ID</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("status")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateStatus(PaymentUpdateStatusRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.PaymentId) ||
                request.StatusCode == 0)
            {
                return BadRequest();
            }

            var response = await _paymentService.UpdateStatusAsync(request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Sends the payment confirmation notification to CU
        /// </summary>
        /// <returns></returns>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("confirmation")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> SendConfirmationSummary()
        {
            var response = await _paymentService.SendConfirmationSummary();
            return StatusCode(response.StatusCode);
        }
    }
}
