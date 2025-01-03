using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;
using System;
using System.Threading.Tasks;

namespace ConnectBillPay.Services.Abstract
{
    public interface INotificationService
    {
        Task<ServiceResponse> SendSupportNotificationAsync(NotificationSendSupportRequest request);
    }
}
