using ConnectBillPay.Core.Classes;
using ConnectBillPay.Responses;
using Requests.Notification;
using System;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface INotificationService
    {
        Task<ServiceResponse> ClearSavedNotificationsAsync(DateTime clearUpToDate);
        Task<ServiceResponse> CreateAsync(NotificationCreateRequest request);
        Task<ServiceResponse> DeleteAsync(Guid notificationId);
        Task<ServiceResponse<NotificationResponse>> GetAsync(Guid notificationId);
        Task<ServiceResponse<NotificationListResponse>> GetAllAsync();
        Task<ServiceResponse<NotificationListResponse>> GetConfiguredAsync();
        Task<ServiceResponse<SavedNotificationListResponse>> SearchAsync(SavedNotificationSearchRequest request);
        Task<ServiceResponse> SendCustomerNotificationAsync(NotificationSendCustomerRequest request);
        Task<ServiceResponse> SendNotificationAsync(int statusCode);
        Task<ServiceResponse> SendSupportNotificationAsync(NotificationSendSupportRequest request);
        Task<ServiceResponse> UpdateAsync(NotificationUpdateRequest request);
    }
}