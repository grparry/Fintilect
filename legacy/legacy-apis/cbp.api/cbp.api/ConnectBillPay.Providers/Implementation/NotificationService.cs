using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Requests;
using ConnectBillPay.Requests.Classes;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Implementation
{
    public class NotificationService : INotificationService
    {
        private readonly IMapper _mapper;
        private readonly ICuGenericRepository<Notification> _notificationRepository;
        private readonly ICuGenericRepository<SavedNotification> _savedNotificationRepository;
        private readonly ICuGenericRepository<StatusCode> _statusCodeRepository;
        private readonly INotificationProvider _notificationProvider;

        public NotificationService(IMapper mapper,
            ICuGenericRepository<Notification> notificationRepository,
            ICuGenericRepository<SavedNotification> savedNotificationRepository,
            ICuGenericRepository<StatusCode> statusCodeRepository,
            INotificationProvider notificationProvider)
        {
            _mapper = mapper;
            _notificationRepository = notificationRepository;
            _savedNotificationRepository = savedNotificationRepository;
            _statusCodeRepository = statusCodeRepository;
            _notificationProvider = notificationProvider;
        }
        
        public async Task<ServiceResponse> SendSupportNotificationAsync(NotificationSendSupportRequest request)
        {
            await _notificationProvider.SendSupportNotification(request.StatusCode, request.Tokens);

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }
    }
}
