using ConnectBillPay.Api.Filters;
using ConnectBillPay.Requests;
using ConnectBillPay.Services.Abstract;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ConnectBillPay.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ErrorHandler<CheckImageController>))]
    public class CheckImageController : ControllerBase
    {
        private readonly ICheckImageService _checkImageService;

        public CheckImageController(ICheckImageService checkImageService)
        {
            _checkImageService = checkImageService;
        }

        [HttpPost]
        public async Task<IActionResult> GetCheckImage(CheckImageGetRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.MemberId) ||
                string.IsNullOrWhiteSpace(request.CheckNumber))
            {
                return BadRequest();
            }

            var serviceResponse = await _checkImageService.GetCheckImage(request);
            return StatusCode(serviceResponse.StatusCode, serviceResponse.Object);
        }
    }
}
