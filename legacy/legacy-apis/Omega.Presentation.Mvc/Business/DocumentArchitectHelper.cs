using System;
using Newtonsoft.Json;
using NLog;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.DocumentArchitect;
using RestSharp;

namespace Omega.Presentation.Mvc.Business
{
    public class DocumentArchitectHelper
    {
        private readonly string _psiServiceUrlBase;
        private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();

        public DocumentArchitectHelper()
        {
            _psiServiceUrlBase = ApplicationConfigHelper.Config.PsiServiceUrlBase;
        }

        public string GetSsoUrl(string email)
        {
            try
            {
                var client = new RestClient($"{_psiServiceUrlBase}/api/document-architect/v1/sso-url/{email}");
                var request = new RestRequest
                {
                    Method = Method.GET
                };

                var result = client.Execute(request);

                if (result.IsSuccessful)
                {
                    var response = JsonConvert.DeserializeObject<GetDocumentArchitectSsoUrlResponse>(result.Content);

                    return response.SsoUrl;
                }

                Logger.Error("An error occurred when getting the Document Architect SSO URL.");
                return null;

            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return null;
            }
        }
    }
}