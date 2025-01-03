using ConnectBillPay.AdminCuApi.Filters;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using Microsoft.AspNetCore.Mvc;
using Services.Abstract;
using System;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<InstitutionInfoController>))]
    public class InstitutionInfoController : ControllerBase
    {
        private readonly IInstitutionInfoService _institutionInfoService;

        public InstitutionInfoController(IInstitutionInfoService institutionInfoService)
        {
            _institutionInfoService = institutionInfoService;
        }

        /// <summary>
        /// Creates an institution information entry in the InstitutionInfo table / only one is allowed
        /// </summary>
        /// <param name="request">institution information to be added to InstitutionInfo table
        /// </param>
        /// <response code="409">Institution Info already exists</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<IActionResult> Create(InstitutionInfoCreateRequest request)
        {
            var serviceResponse = await _institutionInfoService.CreateAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Brings back the institutionInfo record if it exists
        /// </summary>
        /// <response code="400">No institutionInfo record exists</response>
        /// <response code="500">Something went wrong</response>
        [ProducesResponseType(typeof(InstitutionInfoResponse), 200)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var serviceResponse = await _institutionInfoService.GetAsync();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Edits an record within the InstitutionInfo table.
        /// </summary>
        /// <param name="request">The updated institution information keyed by the request Id.</param>
        /// <response code="400">The request Id in invalid.</response>
        /// <response code="404">An institution info record was not found at the request Id.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Update(InstitutionInfoUpdateRequest request)
        {
            if (request.Id == Guid.Empty)
            {
                return BadRequest();
            }

            var serviceResponse = await _institutionInfoService.UpdateAsync(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}
