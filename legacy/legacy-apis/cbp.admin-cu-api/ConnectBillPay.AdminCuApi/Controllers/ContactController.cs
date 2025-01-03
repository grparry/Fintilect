using ConnectBillPay.AdminCuApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Requests.Contact;
using Responses.Contact;
using Services.Abstract;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectBillPay.AdminCuApi.Controllers
{
    [Route("api/v1/[controller]/")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<ContactController>))]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Creates a contact entry in the Contact table
        /// </summary>
        /// <param name="request">contact to be added to Contact table
        /// </param>
        /// <response code="409">Contact already exists</response>
        /// <response code="500">Something went wrong</response>
        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<IActionResult> Create(ContactCreateRequest request)
        {
            var serviceResponse = await _contactService.Create(request);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Deletes a contact entry in the Contact table as the given ID
        /// </summary>
        /// <param name="id">The id of the contact to delete</param>
        /// <response code="404">Unable to find a contact at the given ID</response>
        /// <response code="500">Something went wrong</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var serviceResponse = await _contactService.Delete(id);
            return StatusCode(serviceResponse.StatusCode);
        }

        /// <summary>
        /// Brings back a list of all contacts from the Contact table
        /// </summary>
        /// <response code="500">Something went wrong</response>
        [HttpGet("all")]
        [ProducesResponseType(typeof(ContactListResponse), 200)]
        public async Task<IActionResult> GetAll()
        {
            var serviceResponse = await _contactService.GetAll();
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }

        /// <summary>
        /// Edits a record in the Contact table
        /// </summary>
        /// <param name="request">The updated contact record data with the record Id</param>
        /// <response code="400">Request Id is invalid.</response>
        /// <response code="404">Unable to find contact record with the given request Id.</response>
        /// <response code="500">Something went wrong.</response>
        [HttpPut]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Update(ContactUpdateRequest request)
        {
            if (request.Id == Guid.Empty)
            {
                return BadRequest();
            }

            var serviceResponse = await _contactService.Update(request);
            return StatusCode(serviceResponse.StatusCode);
        }
    }
}
