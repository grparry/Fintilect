using cbp.admin_api.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests;
using Responses;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cbp.admin_api.Controllers
{
    [Route("api/v1/[controller]/")]
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
        /// Gets a global payee from the given Internal Payee Id
        /// </summary>
        /// <param name="internalPayeeId">The Internal Payee Id of the global payee</param>
        /// <response code="400">Invalid Internal Payee Id.</response>
        /// <response code="404">Unable to find global payee at the given Internal Payee Id.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("global/{internalPayeeId}")]
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
        /// Gets a global payee from FIS Web Service
        /// </summary>
        /// <param name="request">request to send to fis(Name, Address1, City, State, PostalCode, UsersAccountAtPayee)</param>
        /// <response code="400">Invalid Payee.</response>
        /// <response code="404">Unable to find global payee.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("fis-payee")]
        [ProducesResponseType(typeof(GetPayeeResponse), 200)]
        public async Task<IActionResult> GetPayeeFromFis(GetPayeeRequest request)
        {
            var serviceResponse = await _payeeService.GetPayeeFromFisAsync(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
