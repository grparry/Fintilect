using System;
using System.Net;
using Newtonsoft.Json;
using NLog;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.BillPay2;
using RestSharp;

namespace Omega.Presentation.Mvc.Business
{
    public class BillPayRepository
    {
        private readonly string _psiServiceUrlBase;
        private static readonly ILogger _logger = LogManager.GetCurrentClassLogger();

        public BillPayRepository()
        {
            _psiServiceUrlBase = ApplicationConfigHelper.Config.PsiServiceUrlBase;
        }

        public GetBillPaySubscriberResponse GetBillPaySubscribers(int accountNumber)
        {
            _logger.Trace($"Getting Bill Pay Subscribers for account: {accountNumber}");

            var client = new RestClient($"{_psiServiceUrlBase}/api/bill-pay/v1/subscribers/{accountNumber}");
            var request = new RestRequest
            {
                Method = Method.GET
            };

            var response = client.Execute(request);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                _logger.Error($"Error Getting Bill Pay Subscribers for account: {accountNumber}. Returned status {response.StatusCode}");
                throw new Exception("An error occurred when requesting the Bill Pay Subscribers.");
            }

            var subscribers = JsonConvert.DeserializeObject<GetBillPaySubscriberResponse>(response.Content);

            return subscribers;
        }

        public bool DeleteBillPaySubscriber(long uuid)
        {
            _logger.Trace($"Deleting Bill Pay Subscriber uuid: {uuid}");

            var client = new RestClient($"{_psiServiceUrlBase}/api/bill-pay/v1/subscriber/{uuid}");
            var request = new RestRequest
            {
                Method = Method.DELETE
            };

            var response = client.Execute(request);

            if (response.StatusCode != HttpStatusCode.NoContent)
            {
                _logger.Error($"Error deleting Bill Pay Subscriber for uuid: {uuid}. Returned status {response.StatusCode}");
                return false;
            }
            return true;
        }
    }
}