using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.OnUs;
using Responses.OnUs;
using Services.Abstract;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<OnUsController>))]
    public class OnUsController : ControllerBase
    {
        private readonly IOnUsService _onUsService;

        public OnUsController(IOnUsService onUsService)
        {
            _onUsService = onUsService;
        }

        /// <summary>
        /// Gets an OnUsPayment by its ID
        /// </summary>
        /// <param name="id">The ID of the OnUsPayment to get</param>
        /// <response code="404">No OnUsPayment resource found at the given ID.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("payment/{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetOnUsPayment(long id)
        {
            var serviceResponse = await _onUsService.GetOnUsPayment(id);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Reposts an OnUsPayment with updated values
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">No OnUsPayment resource found at the given ID.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut("payment/repost")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> RepostOnUsPayment(OnUsPaymentRepostRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.PaymentId) ||
                string.IsNullOrWhiteSpace(request.LoanId))
            {
                return BadRequest(new ServiceResponse { Error = "PaymentId and LoanId must be supplied on the request" });
            }

            var serviceResponse = await _onUsService.RepostOnUsPayment(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Error);
        }

        /// <summary>
        /// Refunds an OnUsPayment
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">No OnUsPayment resource found at the given ID.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut("payment/refund")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> RefundAndCancelOnUsPayment(OnUsPaymentRefundAndCancelRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.PaymentId) ||
                string.IsNullOrWhiteSpace(request.LoanId) ||
                request.Amount == 0)
            {
                return BadRequest(new ServiceResponse { Error = "PaymentId, loanId and amount must be supplied on the request" });
            }

            var serviceResponse = await _onUsService.RefundAndCancelOnUsPayment(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Error);
        }

        /// <summary>
        /// Runs the report on FailedOnUs
        /// </summary>
        /// <param name="request">The request parameters of the report</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("failed-on-us")]
        [ProducesResponseType(typeof(FailedOnUsListResponse), 200)]
        public async Task<IActionResult> FailedOnUsReport(FailedOnUsRequest request)
        {
            var serviceResponse = await _onUsService.FailedOnUsReport(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
