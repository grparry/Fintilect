using ConnectBillPay.Core.Classes;
using Requests.Search;
using Responses.Search;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface ISearchService
    {
        Task<ServiceResponse<PaymentInformationSearchResponse>> PaymentInformationSearchAsync(PaymentInformationSearchRequest request);
        Task<ServiceResponse<ErrorHistorySearchListResponse>> SearchErrorHistory(SearchRequest request);
        Task<ServiceResponse<NickNameSearchListResponse>> SearchNickName(SearchRequest request);
        Task<ServiceResponse<PayeeSearchListResponse>> SearchPayee(SearchRequest request);
        Task<ServiceResponse<PaymentSearchListResponse>> SearchPayment(SearchRequest request);
        Task<ServiceResponse<PaymentClearSearchListResponse>> SearchPaymentClear(SearchRequest request);
        Task<ServiceResponse<PaymentHistorySearchListResponse>> SearchPaymentHistory(SearchRequest request);
        Task<ServiceResponse<RecurringPaymentSearchListResponse>> SearchRecurringPayment(SearchRequest request);
        Task<ServiceResponse<UserPayeeListSearchListResponse>> SearchUserPayeeList(SearchRequest request);
    }
}
