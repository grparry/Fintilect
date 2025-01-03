using cbp.admin_api.Filters;
using Microsoft.AspNetCore.Mvc;
using Responses;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Requests;

namespace cbp.admin_api.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<CreditUnionController>))]
    public class CreditUnionController : ControllerBase
    {
        private readonly ICreditUnionService _creditUnionService;

        public CreditUnionController(ICreditUnionService creditUnionService)
        {
            _creditUnionService = creditUnionService;
        }

        /// <summary>
        /// Gets a Credit Union by a given SponsorId
        /// </summary>
        /// <param name="sponsorId">The sponsor Id of the Credit Union to get</param>
        /// <response code="404">No Credit Union at the given sponsorId</response>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("{sponsorId}")]
        [ProducesResponseType(typeof(CreditUnionResponse), 200)]
        public async Task<IActionResult> Get(string sponsorId)
        {
            if (string.IsNullOrEmpty(sponsorId))
            {
                return BadRequest();
            }

            var serviceResponse = await _creditUnionService.GetAsync(sponsorId);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Gets all Credit Unions
        /// </summary>
        /// <response code="500">Something went wrong.</response>
        [HttpGet("all")]
        [ProducesResponseType(typeof(CreditUnionListResponse), 200)]
        public async Task<IActionResult> GetAll()
        {
            var serviceResponse = await _creditUnionService.GetAllAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Adds a new credit union
        /// </summary>
        /// <param name="request"></param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="409">The requested credit union conflicts with an existing credit union.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> AddCreditUnion(CreditUnionAddRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            var serviceResponse = await _creditUnionService.AddAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Deletes a credit union
        /// </summary>
        /// <param name="sponsorId">The sponsorId of the credit union to delete</param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">The requested holiday could not be found</response>
        /// <response code="500">Something went wrong.</response>
        [HttpDelete("{sponsorId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteCreditUnion(string sponsorId)
        {
            var serviceResponse = await _creditUnionService.DeleteAsync(sponsorId);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Edits an existing credit union
        /// </summary>
        /// <param name="request"></param>
        /// <response code="400">Invalid request syntax.</response>
        /// <response code="404">The requested credit union could not be found</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> EditCreditUnion(CreditUnionEditRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            var serviceResponse = await _creditUnionService.EditAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}
