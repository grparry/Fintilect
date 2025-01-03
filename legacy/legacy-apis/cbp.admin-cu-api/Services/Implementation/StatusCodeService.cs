using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using Responses.StatusCode;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class StatusCodeService : IStatusCodeService
    {
        private readonly IMapper _mapper;
        private readonly ICuGenericRepository<StatusCode> _statusCodeRepository;

        public StatusCodeService(IMapper mapper,
            ICuGenericRepository<StatusCode> statusCodeRepository)
        {
            _mapper = mapper;
            _statusCodeRepository = statusCodeRepository;
        }

        public async Task<ServiceResponse<StatusCodeListResponse>> GetAllAsync()
        {
            var statusCodes = (await _statusCodeRepository.AllAsync())
                .Select(_mapper.Map<StatusCodeResponse>)
                .ToList();

            return new ServiceResponse<StatusCodeListResponse>
            {
                StatusCode = 200,
                Object = new StatusCodeListResponse
                {
                    StatusCodes = statusCodes
                }
            };
        }

        public async Task<ServiceResponse<StatusCodeResponse>> GetAsync(int code)
        {
            var statusCode = await _statusCodeRepository.GetAsync(x => x.Code == code);
            if (statusCode == null)
            {
                return new ServiceResponse<StatusCodeResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<StatusCodeResponse>(statusCode);

            return new ServiceResponse<StatusCodeResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }
    }
}
