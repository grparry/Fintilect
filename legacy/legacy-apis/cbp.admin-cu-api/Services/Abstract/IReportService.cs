using ConnectBillPay.Core.Classes;
using Responses.Report;
using System.Threading.Tasks;

namespace Services.Abstract
{
    public interface IReportService
    {
        Task<ServiceResponse<ReportResponse>> RunReport(string name, string arguments);
    }
}
