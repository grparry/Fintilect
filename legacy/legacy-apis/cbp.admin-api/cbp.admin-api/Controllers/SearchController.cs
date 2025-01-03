using System;
using System.Threading.Tasks;
using cbp.admin_api.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Requests;
using Responses;
using Services.Abstract;

namespace cbp.admin_api.Controllers
{

    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<SearchController>))]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _service;

        public SearchController(ISearchService service)
        {
            _service = service;
        }

        /// <summary>
        /// Search payments based on request parameters
        /// </summary>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("payment-information")]
        [ProducesResponseType(typeof(PaymentInformationSearchResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> Search(PaymentInformationSearchRequest request)
        {
            var serviceResponse = await _service.SearchAsync(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}