using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Microsoft.AspNetCore.Http;
using Responses;
using Requests;
using Services.Abstract;

using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;

namespace Services.Implementation
{
    public class PayeeService : IPayeeService
    {
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly IMapper _mapper;
        private readonly IFisApiService _fisApiService;

        public PayeeService(IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository, IMapper mapper, IFisApiService fisApiService)
        {
            _globalPayeeRepository = globalPayeeRepository;
            _mapper = mapper;
            _fisApiService = fisApiService;
        }

        public async Task<ServiceResponse<GlobalPayeeResponse>> GetGlobalPayeeAsync(string internalPayeeId)
        {
            var payee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == internalPayeeId);
            if (payee == null)
            {
                return new ServiceResponse<GlobalPayeeResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<GlobalPayeeResponse>(payee);
            return new ServiceResponse<GlobalPayeeResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }

        public async Task<ServiceResponse<GetPayeeResponse>> GetPayeeFromFisAsync(GetPayeeRequest request)
        {
            if (request == null)
            {
                return new ServiceResponse<GetPayeeResponse>
                {
                    Object = new GetPayeeResponse
                    {
                        PayeeId = string.Empty,
                        Message = "No FIS Payee Id Found"
                    },
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
                     
            var payeeId = await GetPayeeIdByFactor(request.Address1, request.City, request.Name, request.PostalCode, request.State, request.UsersAccountAtPayee);

            // Payee was not found on FIS side (Global)
            if (payeeId == null)
            {
                return new ServiceResponse<GetPayeeResponse>
                {
                    Object = new GetPayeeResponse
                    {
                        PayeeId = string.Empty,
                        Message = "No FIS Payee Id Found"
                    },
                    StatusCode = StatusCodes.Status409Conflict
                };
            }

            return new ServiceResponse<GetPayeeResponse>
            {
                Object = new GetPayeeResponse
                {
                    PayeeId = payeeId,
                    Message = ""
                },
                StatusCode = StatusCodes.Status201Created
            };
        }

        private async Task<string> GetPayeeIdByFactor(string address1, string city, string payeeName, string postalCode, string state, string usersAccountAtPayee)
        {
            string payeeId = null;

            // Check to see if we get a match from the Fis System
            var fisPayeeByFactorRequest = new GetFisPayeeByFactorRequest
            {
                Address1 = address1,
                City = city,
                PayeeName = payeeName,
                ZipCode = postalCode,
                State = state,
                UsersAccountAtPayee = usersAccountAtPayee
            };
            var matchPayee = await _fisApiService.GetPayeeByFactor(fisPayeeByFactorRequest);
            if (matchPayee != null && !string.IsNullOrEmpty(matchPayee.PayeeId))
            {
                payeeId = matchPayee.PayeeId;
            }

            return payeeId;
        }
    }
}
