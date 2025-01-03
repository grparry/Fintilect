using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Requests;
using Responses;
using Services.Abstract;

using System;
using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;

namespace Services.Implementation
{
    public class SupportNotificationService : ISupportNotificationService
    {
        private readonly IMapper _mapper;
        private readonly IWarehouseGenericRepository<SupportNotification> _supportNotificationRepository;

        public SupportNotificationService(IMapper mapper,
            IWarehouseGenericRepository<SupportNotification> supportNotificationRepository)
        {
            _mapper = mapper;
            _supportNotificationRepository = supportNotificationRepository;
        }

        public async Task<ServiceResponse> CreateAsync(SupportNotificationCreateRequest request)
        {
            var existing = await _supportNotificationRepository.GetAsync(x => x.StatusCode == request.StatusCode);
            if (existing != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            var supportNotification = _mapper.Map<SupportNotification>(request);

            _supportNotificationRepository.Add(supportNotification);
            await _supportNotificationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse<SupportNotificationListResponse>> GetAllAsync()
        {
            var all = (await _supportNotificationRepository.AllAsync())
                .Select(_mapper.Map<SupportNotificationResponse>)
                .ToList();

            var response = new SupportNotificationListResponse
            {
                SupportNotifications = all
            };

            return new ServiceResponse<SupportNotificationListResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }

        public async Task<ServiceResponse<SupportNotificationResponse>> GetAsync(Guid id)
        {
            var supportNotification = await _supportNotificationRepository.GetAsync(x => x.Id == id);
            if (supportNotification == null)
            {
                return new ServiceResponse<SupportNotificationResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<SupportNotificationResponse>(supportNotification);

            return new ServiceResponse<SupportNotificationResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }

        public async Task<ServiceResponse> UpdateAsync(SupportNotificationUpdateRequest request)
        {
            var existing = await _supportNotificationRepository.GetAsync(x => x.StatusCode == request.StatusCode && x.Id != request.Id);
            if (existing != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            var supportNotification = await _supportNotificationRepository.GetAsync(x => x.Id == request.Id);
            if (supportNotification == null)
            {
                return new ServiceResponse<SupportNotificationResponse>
                {
                    StatusCode = 404
                };
            }

            _mapper.Map(request, supportNotification);

            _supportNotificationRepository.Update(supportNotification);
            await _supportNotificationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }
    }
}
