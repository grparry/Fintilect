using ConnectBillPay.AdminCuApi.Filters;
using ConnectBillPay.Responses;
using Microsoft.AspNetCore.Mvc;
using Requests.Search;
using Responses.Search;
using Services.Abstract;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<SearchController>))]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        /// <summary>
        /// Searches payment histories based on the given search type and value
        /// </summary>
        /// <param name="request">
        ///     SearchType           - The type of value to search on
        ///     SearchValue          - The value to search for
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("payment-history")]
        [ProducesResponseType(typeof(PaymentHistorySearchListResponse), 200)]
        public async Task<IActionResult> SearchPaymentHistory(SearchRequest request)
        {
            var serviceResponse = await _searchService.SearchPaymentHistory(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Searches payments based on the given search type and value
        /// </summary>
        /// <param name="request">
        ///     SearchType           - The type of value to search on
        ///     SearchValue          - The value to search for
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("payment")]
        [ProducesResponseType(typeof(PaymentSearchListResponse), 200)]
        public async Task<IActionResult> SearchPayment(SearchRequest request)
        {
            var serviceResponse = await _searchService.SearchPayment(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Searches recurring payments based on the given search type and value
        /// </summary>
        /// <param name="request">
        ///     SearchType           - The type of value to search on
        ///     SearchValue          - The value to search for
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("recurring-payment")]
        [ProducesResponseType(typeof(RecurringPaymentSearchListResponse), 200)]
        public async Task<IActionResult> SearchRecurringPayment(SearchRequest request)
        {
            var serviceResponse = await _searchService.SearchRecurringPayment(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Searches error histories based on the given search type and value
        /// </summary>
        /// <param name="request">
        ///     SearchType           - The type of value to search on
        ///     SearchValue          - The value to search for
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("error-history")]
        [ProducesResponseType(typeof(ErrorHistorySearchListResponse), 200)]
        public async Task<IActionResult> SearchErrorHistory(SearchRequest request)
        {
            var serviceResponse = await _searchService.SearchErrorHistory(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Searches user payee lists based on the given search type and value
        /// </summary>
        /// <param name="request">
        ///     SearchType           - The type of value to search on
        ///     SearchValue          - The value to search for
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("user-payee-list")]
        [ProducesResponseType(typeof(UserPayeeListSearchListResponse), 200)]
        public async Task<IActionResult> SearchUserPayeeList(SearchRequest request)
        {
            var serviceResponse = await _searchService.SearchUserPayeeList(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Searches payment clears based on the given search type and value
        /// </summary>
        /// <param name="request">
        ///     SearchType           - The type of value to search on
        ///     SearchValue          - The value to search for
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("payment-clear")]
        [ProducesResponseType(typeof(PaymentClearSearchListResponse), 200)]
        public async Task<IActionResult> SearchPaymentClear(SearchRequest request)
        {
            var serviceResponse = await _searchService.SearchPaymentClear(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Searches nick names based on the given search type and value
        /// </summary>
        /// <param name="request">
        ///     SearchType           - The type of value to search on
        ///     SearchValue          - The value to search for
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("nickname")]
        [ProducesResponseType(typeof(NickNameSearchListResponse), 200)]
        public async Task<IActionResult> SearchNickName(SearchRequest request)
        {
            var serviceResponse = await _searchService.SearchNickName(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Searches payees based on the given search type and value
        /// </summary>
        /// <param name="request">
        ///     SearchType           - The type of value to search on
        ///     SearchValue          - The value to search for
        /// </param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("payee")]
        [ProducesResponseType(typeof(PayeeSearchListResponse), 200)]
        public async Task<IActionResult> SearchPayee(SearchRequest request)
        {
            var serviceResponse = await _searchService.SearchPayee(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Search Payments
        /// </summary>
        /// <param name="request"></param>
        /// <response code="500">Something went wrong.</response>
        [HttpPost("payment-information")]
        [ProducesResponseType(typeof(PaymentInformationSearchResponse), 200)]
        public async Task<IActionResult> Search(PaymentInformationSearchRequest request)
        {
            var serviceResponse = await _searchService.PaymentInformationSearchAsync(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
