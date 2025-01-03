using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ConnectBillPay.Responses;
using ConnectBillPay.Requests;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Http;
using ConnectBillPay.Api.Filters;

namespace ConnectBillPay.Api.Controllers
{
    [ApiController] 
    [Route("api/v1/[controller]")]
    [ServiceFilter(typeof(ErrorHandler<PayeeController>))]
    public class PayeeController : ControllerBase
    {
        private readonly IPayeeService _payeeService;

        public PayeeController(IPayeeService payeeService)
        {
            _payeeService = payeeService;
        }

        /// <summary>
        ///  Adds a Payee that the user has selected from the list in the UI
        /// </summary>
        /// <param name="request">
        /// Active              - Whether the payee is active
        /// Address1            - Address 1 line used in the Bill Pay system
        /// Address2            - Address 2 line used in the Bill Pay system
        /// Address3            - Address 3 line used in the Bill Pay system
        /// City                - City used in the Bill Pay system
        /// Country             - Country used in the Bill Pay system
        /// Favorite            - Whether this payee is a favorite
        /// MemberID            - User's Id on core
        /// Name                - Name used in the Bill Pay system
        /// NameOnAccount       - The name the user uses at the payee
        /// NickName            - The nickname used in the Bill Pay system
        /// PayeeID             - Id of payee select from list
        /// PayeeType           - Payee Type ("G" = Global, "P" = Personal, "O" = OnUs)
        /// Phone               - Phone used in the Bill Pay system
        /// PostalCode          - Postal Code used in the Bill Pay system
        /// State               - State used in the Bill Pay system
        /// UsersAccountAtPayee - The account id used at the payee
        /// </param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="409">A payee already existed for the given request</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost]
        [ProducesResponseType(typeof(AddPayeeResponse), StatusCodes.Status201Created)]
        public async Task<IActionResult> AddPayee(PayeeAddRequest request)
        {
            var response = await _payeeService.AddPayee(request);
            return StatusCode(response.StatusCode, response.Object);
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
        /// Deletes a user's personal payee record
        /// </summary>
        /// <remarks>
        /// If no payments are pending record gets marked delete
        /// If pending  marks record inactive for user payee
        /// </remarks>
        /// <param name="userPayeeListId">The user's payee ID</param>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">No User payee found at the given UserPayeeId and MemberId</response>
        /// <response code="409">Existing payments exists for the given UserPayee</response>
        /// <response code="500">Something went wrong.</response>
        [HttpDelete("user-payee/{userPayeeListId}/member/{memberId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteUserPayee(string userPayeeListId, string memberId)
        {
            if (string.IsNullOrWhiteSpace(userPayeeListId) ||
                string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var response = await _payeeService.DeleteUserPayee(userPayeeListId, memberId);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Edit select details on a Managed Payee
        /// </summary>
        /// <remarks>The payees Nickname, Account Number, Account Name, Active Flag
        /// and Favorite Flag can be edited
        /// </remarks>
        /// <param name="request">
        /// UserPayeeId - 
        /// AccountName - Account Name
        /// AccountNumber - Account Number of the Payee
        /// Active - Determines whether Payee is Active
        /// Favorite - Determines whether Payee is a Favorite
        /// Nickname - Nickname of the Payee
        /// </param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">No user payee found at the given UserPayeeId</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut("global-payee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditGlobalPayee([FromBody] GlobalPayeeEditRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            var response = await _payeeService.EditGlobalPayee(request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Edits a user's personal payee information
        /// </summary>
        /// <remarks> 
        /// </remarks>
        /// <param name="request">
        ///     MemberId             - User's Id on core
        ///     PayeeId              - Id of the payee to edit
        ///     Name
        ///     Address1
        ///     Address2
        ///     Address3
        ///     City
        ///     State
        ///     PostalCode
        ///     Country
        ///     Phone
        ///     UsersAccountAtPayee  - The account id used at the payee
        ///     NameOnAccount        - The name the user uses at the payee
        ///     NickName             - The nickname used in the Bill Pay system
        ///     Active
        ///     Favorite
        /// </param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">No personal payee found at the given PayeeId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut("personal-payee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditPersonalPayee([FromBody] PersonalPayeeEditRequest request)
        {
            if (request == null ||
                request.UserPayeeListId == null)
            {
                return BadRequest();
            }

            var response = await _payeeService.EditPersonalPayee(request);
            return StatusCode(response.StatusCode);
        }

        /// <summary>
        /// Gets a global payee from the given Internal Payee Id
        /// </summary>
        /// <param name="internalPayeeId">The Internal Payee Id of the global payee</param>
        /// <response code="400">Invalid Internal Payee Id.</response>
        /// <response code="404">Unable to find global payee at the given Internal Payee Id.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("global-payee/{internalPayeeId}")]
        [ProducesResponseType(typeof(GlobalPayeeResponse), 200)]
        public async Task<IActionResult> GetGlobalPayee(string internalPayeeId)
        {
            if (string.IsNullOrWhiteSpace(internalPayeeId))
            {
                return BadRequest();
            }

            var serviceResponse = await _payeeService.GetGlobalPayeeAsync(internalPayeeId);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Brings back a list of payees based on a partial name or full name
        /// </summary>
        /// <remarks>The payees global data base will be searched and the data returned will be rows where
        /// the PayeeName starts with the partialName parameter
        /// </remarks>
        /// <param name="partialName">a partial name or full name to be used for search
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("global-payee/name/{partialName}")]
        [ProducesResponseType(typeof(PayeeListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGlobalPayeesByName(string partialName)
        {
            var serviceResponse = await _payeeService.GetGlobalPayeesByName(partialName);
            if (serviceResponse.StatusCode >= 300)
            {
                return StatusCode(serviceResponse.StatusCode);
            }

            var response = new PayeeListResponse
            {
                Payees = serviceResponse.Object
            };
            return StatusCode(serviceResponse.StatusCode, response);
        }

        /// <summary>
        /// Brings back a list of payees based on a partial name a partial zip or full zip
        /// </summary>
        /// <remarks>The payees global data base will be searched and the data returned will be rows where
        /// the Zip starts with the partial Zip parameter
        /// </remarks>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("global-payee/zip/{partialZip}")]
        [ProducesResponseType(typeof(PayeeListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGlobalPayeesByZip(string partialZip)
        {
            var serviceResponse = await _payeeService.GetGlobalPayeesByZip(partialZip);
            if (serviceResponse.StatusCode >= 300)
            {
                return StatusCode(serviceResponse.StatusCode);
            }

            var response = new PayeeListResponse
            {
                Payees = serviceResponse.Object
            };
            return StatusCode(serviceResponse.StatusCode, response);
        }

        /// <summary>
        /// Brings back a list of payees based on a (partial name or full name) and  (a partial zip or full zip)
        /// </summary>
        /// <remarks>The payees global data base will be searched and the data returned will be rows where
        /// the PayeeName starts with the partial Name parameter and Zip starts with the partial Zip parameter
        /// </remarks>
        /// <param name="partialName">a partial name or full name to be used for search
        /// </param>
        /// <param name="partialZip">no url encoding needed</param>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("global-payee/name/{partialName}/zip/{partialZip}")]
        [ProducesResponseType(typeof(PayeeListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGlobalPayeesByNameZip(string partialName, string partialZip)
        {
            var serviceResponse = await _payeeService.GetGlobalPayeesByNameZip(partialName, partialZip);
            if (serviceResponse.StatusCode >= 300)
            {
                return StatusCode(serviceResponse.StatusCode);
            }

            var response = new PayeeListResponse
            {
                Payees = serviceResponse.Object
            };
            return StatusCode(serviceResponse.StatusCode, response);
        }

        /// <summary>
        /// Gets a user's active personal payee information
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="payeeId">The user's payee ID</param>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">No user payee found at the given PayeeId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("user-payee/{payeeId}/member/{memberId}")]
        [ProducesResponseType(typeof(UserPayeeResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserPayee(string payeeId, string memberId)
        {
            if (string.IsNullOrWhiteSpace(payeeId) || string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var response = await _payeeService.GetUserPayee(memberId, payeeId);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Gets a user's personal payee information - active or inactive
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="payeeId">The user's payee ID</param>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">No user payee found at the given PayeeId.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("user-payee-all/{payeeId}/member/{memberId}")]
        [ProducesResponseType(typeof(UserPayeeResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserPayeeAllStatus(string payeeId, string memberId)
        {
            if (string.IsNullOrWhiteSpace(payeeId) || string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var response = await _payeeService.GetUserPayee(memberId, payeeId, false);
            return StatusCode(response.StatusCode, response.Object);
        }
        
        /// <summary>
        /// Gets a all payees for a user found at the given memberId
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("payees/{memberId}")]
        [ProducesResponseType(typeof(UserPayeeListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserPayees(string memberId)
        {
            if (string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var serviceResponse = await _payeeService.GetUserPayees(memberId);
            if (serviceResponse.StatusCode >= 300)
            {
                return StatusCode(serviceResponse.StatusCode);
            }

            var listResponse = new UserPayeeListResponse
            {
                UserPayees = serviceResponse.Object
            };
            return StatusCode(serviceResponse.StatusCode, listResponse);
        }

        /// <summary>
        /// Gets a all payees for a user found at the given memberId
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="memberId">The user's membership ID</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("payees-payments/{memberId}")]
        [ProducesResponseType(typeof(UserPayeeWithPaymentsResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserPayeesWithPayments(string memberId)
        {
            if (string.IsNullOrWhiteSpace(memberId))
            {
                return BadRequest();
            }

            var serviceResponse = await _payeeService.GetUserPayeesWithPayments(memberId);
            if (serviceResponse.StatusCode >= 300)
            {
                return StatusCode(serviceResponse.StatusCode);
            }

            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Updates the UsersAcocuntAtPayee for a UserPayeeList
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("user/account-number")]
        [ProducesResponseType(typeof(UserPayeeUpdateAccountNumberResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateUserPayeeAccountNumber(UserPayeeUpdateAccountNumberRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.AccountNumber))
            {
                return BadRequest(new UserPayeeUpdateAccountNumberResponse { ErrorMessage = "UserPayeeListId and AccountNumber must be supplied on the request" });
            }

            var response = await _payeeService.UpdateUserPayeeAccountNumberAsync(request);
            return StatusCode(response.StatusCode, response.Object);
        }

        /// <summary>
        /// Updates the FisPayeeId for a UserPayeeList
        /// </summary>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">A user payee was not found at the given ID</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("user/fis-payee-id")]
        [ProducesResponseType(typeof(UserPayeeUpdateFisPayeeIdResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateUserPayeeFisPayeeId(UserPayeeUpdateFisPayeeIdRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserPayeeListId) ||
                string.IsNullOrWhiteSpace(request.FisPayeeId))
            {
                return BadRequest(new UserPayeeUpdateFisPayeeIdResponse { ErrorMessage = "UserPayeeListId and FisPayeeId must be supplied on the request" });
            }

            var response = await _payeeService.UpdateUserPayeeFisPayeeIdAsync(request);
            return StatusCode(response.StatusCode, response.Object);
        }
    }
}
