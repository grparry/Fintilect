using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;

namespace ConnectBillPay.Services.Abstract
{
    public interface IPaymentHistoryService
    {
        Task<ServiceResponse<List<PaymentHistoryResponse>>> GetHistoryFromDate(string memberId, DateTime searchDate);

        Task<ServiceResponse<List<PayeeHistoryResponse>>> GetPayeeHistory(string memberId, string userPayeeListId);

        Task<ServiceResponse<PaymentInquiryResponse>> GetPayment(string memberId, string paymentId);
    }
}
