using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.Contact;
using Responses.Contact;
using Services.Abstract;
using System;
using System.Linq;
using System.Threading.Tasks;
using Requests.Customer;
using Responses.Customer;
using Services.Implementation;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<CustomerController>))]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        /// <summary>
        /// Creates a customer entry in the Customer table
        /// </summary>
        /// <param name="request">customer to be added to Customer table
        /// </param>
        /// <response code="500">Something went wrong</response>
        [HttpPost]
        [ProducesResponseType(typeof(CustomerCreateResponse), 201)]
        public async Task<IActionResult> Create(CustomerCreateRequest request)
        {
            var serviceResponse = await _customerService.Create(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
