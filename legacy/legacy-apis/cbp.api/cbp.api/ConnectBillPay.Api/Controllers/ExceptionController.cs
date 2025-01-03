using System.Threading.Tasks;
using ConnectBillPay.Api.Filters;
using ConnectBillPay.Core.Api.Model;
using ConnectBillPay.Requests;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConnectBillPay.Api.Controllers
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
        /// Sends a Notification to the customer
        /// </summary>
        /// <returns></returns>
        /// <response code="400">Bad request received</response>
        /// <response code="404">A bad exceptionId or PaymentId</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("send-customer-notification")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> SendCustomerNotification([FromBody] ExceptionCustomerNotificationRequest request)
        {
            var response = await _exceptionService.SendCustomerNotification(request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Sends a Notification based on status code
        /// </summary>
        /// <returns></returns>
        /// <response code="400">Bad request received</response>
        /// <response code="404">A bad exceptionId or PaymentId</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("send-notification")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> SendNotification([FromBody] ExceptionNotificationRequest request)
        {
            var response = await _exceptionService.SendNotification(request.StatusCode);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Refunds a Payment
        /// </summary>
        /// <returns></returns>
        /// <response code="400">Bad request received</response>
        /// <response code="404">A bad exceptionId or PaymentId</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("refund")]
        [ProducesResponseType(typeof(ExceptionRefundResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> CheckForRefundAdjustment([FromBody] ExceptionRefundRequest request)
        {
            var response = await _exceptionService.CheckForRefundAdjustment(request.PaymentId, request.ExceptionId);
            return StatusCode(response.StatusCode, response.Object);
        }
    }
}