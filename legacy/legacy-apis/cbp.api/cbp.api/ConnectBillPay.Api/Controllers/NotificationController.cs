using System;
using System.Threading.Tasks;
using ConnectBillPay.Api.Filters;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConnectBillPay.Api.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<NotificationController>))]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }
        
        /// <summary>
        /// Sends a support notification
        /// </summary>
        /// <param name="request"></param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("send/support")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> SendSupport(NotificationSendSupportRequest request)
        {
            var serviceResponse = await _notificationService.SendSupportNotificationAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}
