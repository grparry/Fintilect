using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.Payee;
using Services.Abstract;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using Responses.Payee;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<PayeeController>))]
    public class PayeeController : ControllerBase
    {
        private readonly IPayeeService _payeeService;

        public PayeeController(IPayeeService payeeService)
        {
            _payeeService = payeeService;
        }

        /// <summary>
        /// Closed an FIS global payee
        /// </summary>
        /// <response code="400">Invalid request syntax</response>
        /// <response code="404">No global payee found at the given FisPayeeId</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost("global/close")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CloseGlobalPayee(PayeeCloseGlobalRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.FisPayeeId))
            {
                return BadRequest();
            }

            var response = await _payeeService.CloseGlobalPayeeAsync(request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Creates a new UserPayeeList entry with the old data and the new memberid
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("copy-payees")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> CopyMemberPayees(CopyMemberPayeesRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.MemberId) ||
                string.IsNullOrWhiteSpace(request.NewMemberId))
            {
                return BadRequest();
            }

            var serviceResponse = await _payeeService.CopyMemberPayeesAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Runs the report on user payee change histories
        /// </summary>
        /// <param name="request">The request parameters of the report</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("user/change-history")]
        [ProducesResponseType(typeof(UserPayeeChangeHistoryListResponse), 200)]
        public async Task<IActionResult> UserPayeeChangeHistory(UserPayeeChangeHistoryReportRequest request)
        {
            var serviceResponse = await _payeeService.UserPayeeChangeHistoryAsync(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Runs the report on global payee change histories
        /// </summary>
        /// <param name="request">The request parameters of the report</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("global/change-history")]
        [ProducesResponseType(typeof(GlobalPayeeChangeHistoryListResponse), 200)]
        public async Task<IActionResult> GlobalPayeeChangeHistory(GlobalPayeeChangeHistoryReportRequest request)
        {
            var serviceResponse = await _payeeService.GlobalPayeeChangeHistoryAsync(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Updates the UsersAccountAtPayee for a UserPayeeList
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("user/account-number")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateUserPayeeAccountNumber(UserPayeeUpdateAccountNumberRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.AccountNumber))
            {
                return BadRequest(new ServiceResponse { Error = "UserPayeeListId and AccountNumber must be supplied on the request" });
            }

            var response = await _payeeService.UpdateUserPayeeAccountNumberAsync(request);
            return StatusCode(response.StatusCode, response.Error);
        }

        /// <summary>
        /// Updates the UsersAccountAtPayee for a UserPayeeList and resubmits the payment
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("account-number-reprocess")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateAccountNumberAndReprocess(UpdateAccountAndReprocessRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.AccountNumber))
            {
                return BadRequest(new ServiceResponse { Error = "UserPayeeListId and AccountNumber must be supplied on the request" });
            }

            var response = await _payeeService.UpdateAccountNumberAndReprocessAsync(request);
            return StatusCode(response.StatusCode, response.Error);
        }

        /// <summary>
        /// Updates the UsersAccountAtPayee for a UserPayeeList and resubmits the payment
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("account-number-refund")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateAccountNumberAndRefund(UpdateAccountAndRefund request)
        {
            if (string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.AccountNumber))
            {
                return BadRequest(new ServiceResponse { Error = "UserPayeeListId and AccountNumber must be supplied on the request" });
            }

            var response = await _payeeService.UpdateAccountNumberAndRefund(request);
            return StatusCode(response.StatusCode, response.Error);
        }


        /// <summary>
        /// Updates the FisPayeeId for a UserPayeeList
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("user/fis-payee-id")]
        [ProducesResponseType(typeof(ServiceResponse), 200)]
        public async Task<IActionResult> UpdateUserPayeeFisPayeeId(UserPayeeUpdateFisPayeeIdRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.FisPayeeId))
            {
                return BadRequest(new ServiceResponse { Error = "UserPayeeListId and FisPayeeId must be supplied on the request" });
            }

            var response = await _payeeService.UpdateUserPayeeFisPayeeIdAsync(request);
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Updates the FisPayeeId for a UserPayeeList and refunds the payment
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("user/fis-payee-refund")]
        [ProducesResponseType(typeof(ServiceResponse), 200)]
        public async Task<IActionResult> UpdateFisPayeeIdAndRefund(UpdateFisPayeeIdAndRefundRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.FisPayeeId))
            {
                return BadRequest(new ServiceResponse { Error = "UserPayeeListId and FisPayeeId must be supplied on the request" });
            }

            var response = await _payeeService.UpdateFisPayeeIdAndRefundAsync(request);
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Performs a manual update on exception and refunds the payment
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("manual-exception-reprocess")]
        [ProducesResponseType(typeof(ServiceResponse), 200)]
        public async Task<IActionResult> UpdateManualAsync(ManualUpdateRequest request)
        {
            if (request.FisExceptionId == 0)
            {
                return BadRequest(new ServiceResponse { Error = "FisExceptionId must be supplied on the request" });
            }

            var response = await _payeeService.UpdateManualAndReprocessAsync(request);
            return StatusCode(response.StatusCode, response);
        }


    }
}
