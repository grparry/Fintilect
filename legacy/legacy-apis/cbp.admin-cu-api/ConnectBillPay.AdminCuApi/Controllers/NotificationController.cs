using ConnectBillPay.AdminCuApi.Filters;
using ConnectBillPay.Responses;
using Microsoft.AspNetCore.Mvc;
using Requests.Notification;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
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
        /// Clears all saved notifications up to a given date
        /// </summary>
        /// <param name="request"></param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("saved/clear")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> ClearSavedNotifications(SavedNotificationClearRequest request)
        {
            var serviceResponse = await _notificationService.ClearSavedNotificationsAsync(request.ClearUpToDate);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Adds a new notification
        /// </summary>
        /// <param name="request"></param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="409">The requested notification conflicts with an existing notification (same status code or error code).</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<IActionResult> Create(NotificationCreateRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.MessageSubject) ||
                string.IsNullOrWhiteSpace(request.MessageBody))
            {
                return BadRequest();
            }

            var serviceResponse = await _notificationService.CreateAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Deletes a notification
        /// </summary>
        /// <param name="notificationId">The id of the notification to delete</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">The requested notification could not be found</response>
        /// <response code="500">Something went wrong.</response>
        [HttpDelete("{notificationId}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Delete(Guid notificationId)
        {
            if (notificationId == Guid.Empty)
            {
                return BadRequest();
            }

            var serviceResponse = await _notificationService.DeleteAsync(notificationId);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Gets an existing notification
        /// </summary>
        /// <param name="notificationId">The id of the notification to get</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">The requested notification could not be found</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("{notificationId}")]
        [ProducesResponseType(typeof(NotificationResponse), 200)]
        public async Task<IActionResult> Get(Guid notificationId)
        {
            if (notificationId == Guid.Empty)
            {
                return BadRequest();
            }

            var serviceResponse = await _notificationService.GetAsync(notificationId);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Gets all notifications
        /// </summary>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("all")]
        [ProducesResponseType(typeof(NotificationListResponse), 200)]
        public async Task<IActionResult> GetAll()
        {
            var serviceResponse = await _notificationService.GetAllAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Gets configured notifications for symmetry or Emerge
        /// </summary>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("configured")]
        [ProducesResponseType(typeof(NotificationListResponse), 200)]
        public async Task<IActionResult> GetConfigured()
        {
            var serviceResponse = await _notificationService.GetConfiguredAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Searched saved notifications
        /// </summary>
        /// <param name="request"></param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("search")]
        [ProducesResponseType(typeof(SavedNotificationListResponse), 200)]
        public async Task<IActionResult> Search(SavedNotificationSearchRequest request)
        {
            var serviceResponse = await _notificationService.SearchAsync(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Sends a Notification to the customer
        /// </summary>
        /// <returns></returns>
        /// <response code="400">Bad request received</response>
        /// <response code="404">A bad exceptionId or PaymentId</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("send/customer")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> SendCustomerNotification([FromBody] NotificationSendCustomerRequest request)
        {
            var response = await _notificationService.SendCustomerNotificationAsync(request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Sends a Notification based on status code
        /// </summary>
        /// <returns></returns>
        /// <response code="400">Bad request received</response>
        /// <response code="404">A bad exceptionId or PaymentId</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("send")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> SendNotification([FromBody] NotificationSendRequest request)
        {
            var response = await _notificationService.SendNotificationAsync(request.StatusCode);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Sends a support notification
        /// </summary>
        /// <param name="request"></param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("send/support")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> SendSupportNotification(NotificationSendSupportRequest request)
        {
            var serviceResponse = await _notificationService.SendSupportNotificationAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Edits an existing notification
        /// </summary>
        /// <param name="request"></param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">The requested notification could not be found</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Update(NotificationUpdateRequest request)
        {
            if (request == null ||
                request.Id == Guid.Empty ||
                string.IsNullOrWhiteSpace(request.MessageSubject) ||
                string.IsNullOrWhiteSpace(request.MessageBody))
            {
                return BadRequest();
            }

            var serviceResponse = await _notificationService.UpdateAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}
