using ConnectBillPay.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Classes;
using System;

namespace ConnectBillPay.Services.Abstract
{
    public interface IPaymentService
    {

        Task<ServiceResponse<PaymentResponse>> AddOneTimePayment(OneTimePaymentAddRequest request);

        Task<ServiceResponse<PaymentResponse>> AddRecurringPayment(RecurringPaymentAddRequest request);

        Task<ServiceResponse> DeleteOneTimePayment(string memberId, string paymentId);

        Task<ServiceResponse> DeleteRecurringPayment(string memberId, string paymentId);

        Task<ServiceResponse> EditPayment(string paymentId, PaymentEditRequest request);

        Task<ServiceResponse<List<PayeeLastPaymentsResponse>>> GetLastPayments(string memberId);

        Task<ServiceResponse<List<MemberPayment>>> GetPendingPayments(string memberId);

        Task<ServiceResponse<List<MemberPayment>>> GetRecurringPayments(string memberId);

        Task<ServiceResponse<List<MemberPayment>>> GetRecurringPaymentsToDate(string memberId, DateTime endDate);

        Task<ServiceResponse> ReprocessAsync(PaymentReprocessRequest request);

        Task<ServiceResponse> UpdateStatusAsync(PaymentUpdateStatusRequest request);

        Task<ServiceResponse> SendConfirmationSummary();
    }
}
