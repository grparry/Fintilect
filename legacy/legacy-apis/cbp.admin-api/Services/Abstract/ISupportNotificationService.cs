using Requests;
using Responses;

using System;
using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;

namespace Services.Abstract
{
    public interface ISupportNotificationService
    {
        Task<ServiceResponse> CreateAsync(SupportNotificationCreateRequest request);
        Task<ServiceResponse<SupportNotificationListResponse>> GetAllAsync();
        Task<ServiceResponse<SupportNotificationResponse>> GetAsync(Guid id);
        Task<ServiceResponse> UpdateAsync(SupportNotificationUpdateRequest request);
    }
}
