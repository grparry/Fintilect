using Microsoft.AspNetCore.Mvc;
using Requests.Payment;
using Services.Abstract;
using System.Threading.Tasks;
using ConnectBillPay.Requests;
using Microsoft.AspNetCore.Http;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        
        /// <summary>
        /// Returns scheduled payment change history within the given start and end date with a matching search value
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("change-history")]
        public async Task<IActionResult> GetScheduledPaymentChangeHistory(ScheduledPaymentChangeHistoryReportRequest request)
        {
            var response = await _paymentService.GetScheduledPaymentChangeHistory(request);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Returns recurring payment change history within the given start and end date with a matching search value
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("recurring/change-history")]
        public async Task<IActionResult> GetRecurringPaymentChangeHistory(RecurringPaymentChangeHistoryReportRequest request)
        {
            var response = await _paymentService.GetRecurringPaymentChangeHistory(request);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Returns pending payments on the given search date as well as other payments in the same batch
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("pending")]
        public async Task<IActionResult> GetPendingPaymentsByDate(PendingPaymentsRequest request)
        {
            var response = await _paymentService.GetPendingPayments(request);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Returns pending payments on the given search date as well as other payments in the same batch
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("pending-payments")]
        public async Task<IActionResult> GetPendingPayments(PendingPaymentSearchRequest request)
        {
            var response = await _paymentService.GetPendingPaymentsAsync(request);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Returns payment activity as specified in the request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("activity")]
        public async Task<IActionResult> GetPaymentActivity(PaymentActivityRequest request)
        {
            var response = await _paymentService.GetPaymentActivity(request);
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
            if (string.IsNullOrWhiteSpace(request.PaymentId))
            {
                return BadRequest();
            }

            var response = await _paymentService.ReprocessAsync(request);
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
        /// Edit's a payment
        /// </summary>
        /// <param name="paymentId">The ID of the payment to edit</param>
        /// <param name="request">
        ///     Account              - The account that is funding the payment
        ///     MemberId             - The payer's member Id
        ///     Amount               - The account funding the payment
        ///     WillProcessDate      - The date the payment will process
        ///     Frequency            - Frequency for Recurring Payments
        ///     NumPayments          - NumPayments for Recurring Payments
        /// </param>
        /// <returns></returns>
        /// <response code="400">Invalid request received.</response>
        /// <response code="404">No resource found at the given memberId and paymentId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut("{paymentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditPayment(string paymentId, [FromBody] PaymentEditRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(paymentId))
            {
                return BadRequest();
            }

            var response = await _paymentService.EditPayment(paymentId, request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Cancels a payment based on id
        /// </summary>
        /// <param name="paymentId">The ID of the payment</param>
        /// <returns></returns>
        /// <response code="400">Invalid request received.</response>
        /// <response code="404">No payment found with requested paymentId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpDelete("{paymentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CancelPayment(string paymentId)
        {
            if (string.IsNullOrWhiteSpace(paymentId))
            {
                return BadRequest();
            }

            var response = await _paymentService.CancelPayment(paymentId);
            return StatusCode(response.StatusCode);
        }


        /// <summary>
        /// Cancels a payment based on paymentId and refunds based on exceptionId
        /// </summary>
        /// <param name="request">
        ///     PaymentId              - The Connect Bill Pay PaymentId
        ///     ExceptionId            - The ExceptionId from Fis
        /// </param>
        /// <response code="400">Invalid request received.</response>
        /// <response code="404">No payment found with requested paymentId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("cancel-payment-refund")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CancelPaymentAndRefund(CancelPaymentAndRefundRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.PaymentId))
            {
                return BadRequest();
            }

            var response = await _paymentService.CancelPaymentAndRefund(request);
            return StatusCode(response.StatusCode);
        }
    }
}
