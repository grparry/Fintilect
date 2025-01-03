using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Responses;
using Services.Abstract;

using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using Microsoft.Extensions.Logging;
using Requests;

namespace Services.Implementation
{
    public class CreditUnionService : ICreditUnionService
    {
        private readonly IWarehouseGenericRepository<CreditUnion> _creditUnionRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<ExceptionService> _logger;

        public CreditUnionService(IWarehouseGenericRepository<CreditUnion> creditUnionRepository,
            IMapper mapper, ILogger<ExceptionService> logger)
        {
            _creditUnionRepository = creditUnionRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ServiceResponse<CreditUnionListResponse>> GetAllAsync()
        {
            var creditUnions = (await _creditUnionRepository.AllAsync())
                .Select(_mapper.Map<CreditUnionResponse>)
                .ToList();

            return new ServiceResponse<CreditUnionListResponse>
            {
                StatusCode = 200,
                Object = new CreditUnionListResponse
                {
                    CreditUnions = creditUnions
                }
            };
        }

        public async Task<ServiceResponse<CreditUnionResponse>> GetAsync(string sponsorId)
        {
            var creditUnion = await _creditUnionRepository.GetAsync(x => x.SponsorId == sponsorId);
            if (creditUnion == null)
            {
                return new ServiceResponse<CreditUnionResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<CreditUnionResponse>(creditUnion);

            return new ServiceResponse<CreditUnionResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }

        public async Task<ServiceResponse> AddAsync(CreditUnionAddRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.SponsorId))
            {
                request.SponsorId = "0";
            }

            var existing = await _creditUnionRepository.GetAsync(x => (x.SponsorId == request.SponsorId));

            if (existing != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409 // conflict
                };
            }

            var creditUnion = _mapper.Map<CreditUnion>(request);

            _creditUnionRepository.Add(creditUnion);
            await _creditUnionRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 201 // created
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string sponsorId)
        {
            var creditUnion = await _creditUnionRepository.GetAsync(x => x.SponsorId == sponsorId);

            if (creditUnion == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            creditUnion.Deleted = true;

             _creditUnionRepository.Update(creditUnion);
            await _creditUnionRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> EditAsync(CreditUnionEditRequest request)
        {
            var creditUnion = await _creditUnionRepository.GetAsync(x => x.SponsorId == request.SponsorId);

            if (creditUnion == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            _mapper.Map(request, creditUnion);

            _creditUnionRepository.Update(creditUnion);
            await _creditUnionRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }
    }
}
