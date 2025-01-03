using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace cbp.admin_api.Controllers
{

    [Route("api/v1/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ICuGenericRepository<InstitutionInfo> _institutionInfoRepository;
        public readonly ILogger _logger;

        public TestController(ILogger<TestController> logger,
            ICuGenericRepository<InstitutionInfo> institutionInfoRepository)
        {
            _logger = logger;
            _institutionInfoRepository = institutionInfoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> HeartBeat()
        {
            var institution = (await _institutionInfoRepository.AllAsync())
                .FirstOrDefault();
            _logger.LogError($"heartbeat {institution.Name}");
            return Ok();
        }
    }
}

