using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using Microsoft.Data.SqlClient;
using Responses.Report;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class ReportService : IReportService
    {
        private readonly ICuGenericRepository<Report> _reportRepository;

        public ReportService(ICuGenericRepository<Report> reportRepository)
        {
            _reportRepository = reportRepository;
        }

        public async Task<ServiceResponse<ReportResponse>> RunReport(string name, string arguments)
        {
            var databaseArguments = _reportRepository.GetAsync(x => x.StoredProcedureName == name).Result;

            var parameters = new List<SqlParameter>();

            var reportList = new List<ReportResult>();
            if (databaseArguments != null)
            {
                var databaseParameters = databaseArguments.Arguments.Split(',');
                var inputParameters = arguments.Split(',');

                foreach (var databaseParameter in databaseParameters)
                {
                    foreach (var inputParameter in inputParameters)
                    {
                        var input = inputParameter.Split('=');
                        if (input[0].Trim() == databaseParameter.Trim())
                        {
                            parameters.Add(new SqlParameter(databaseParameter.Trim(), input[1].Trim()));
                            break;
                        }
                    }
                }

                reportList = await _reportRepository.CallReportStoredProcedure($"exec {name} {arguments}", parameters);
            }

            var response = new ReportResponse
            {
                JsonResponse = reportList.FirstOrDefault()?.Result
            };

            return new ServiceResponse<ReportResponse>
            {
                Object = response,
                StatusCode = 200
            };
        }
    }
}
