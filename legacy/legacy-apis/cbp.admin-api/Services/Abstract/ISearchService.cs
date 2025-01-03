using System.Threading.Tasks;
using ConnectBillPay.Core.Classes;
using Requests;
using Responses;


namespace Services.Abstract
{
    public interface ISearchService
    {
        Task<ServiceResponse<PaymentInformationSearchResponse>> SearchAsync(PaymentInformationSearchRequest request);
    }
}