using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using Requests.Run;
using Services.Abstract;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class RunService : IRunService
    {
        private readonly ICuGenericRepository<ManualRun> _manualRunRepository;

        public RunService(ICuGenericRepository<ManualRun> manualRunRepository)
        {
            _manualRunRepository = manualRunRepository;
        }

        public async Task<ServiceResponse> CreateManualRunAsync(ManualRunCreateRequest request)
        {
            var manualRun = new ManualRun
            {
                ProcessDate = request.ProcessDate.Value,
                ReprocessOnly = request.ReprocessOnly
            };

            _manualRunRepository.Add(manualRun);
            await _manualRunRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }
    }
}
