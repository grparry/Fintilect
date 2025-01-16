using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.QrCodeGenerator;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Business
{
    public class QrCodeGeneratorRepository
    {
        public List<WebServiceUrl> GetWebServiceUrls()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetWebServiceUrlResponse>(new GetWebServiceUrlRequest(0));

            return response.WebServiceUrls;
        }

        public List<SelectListItem> GetWebServiceUrlsSelectList()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetWebServiceUrlResponse>(new GetWebServiceUrlRequest(0));

            return ConvertWebServiceUrLsToSelectListItems(response.WebServiceUrls);
        }

        public bool AddUpdateWebServiceUrl(WebServiceUrl webServiceUrl)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(new AddUpdateWebServiceUrlRequest(0) { WebServiceUrl = webServiceUrl });

            return response.WasSuccessful;
        }

        public bool DeleteWebServiceUrl(long urlId)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(new DeleteWebServiceUrlRequest(0) { WebserviceUrlId = urlId });

            return response.WasSuccessful;
        }

        public List<SelectListItem> ConvertWebServiceUrLsToSelectListItems(List<WebServiceUrl> webServiceUrls)
        {
            var result = new List<SelectListItem>();

            if (SettingsManager.Settings.Application.OnlineBanking.Version < 2017.2)
            {
                result.AddRange(webServiceUrls.Select(url => new SelectListItem
                {
                    Value = url.EnvironmentUrl,
                    Text = url.EnvironmentName
                }));
            }
            else
            {
                //New model available
                result.AddRange(webServiceUrls.Select(url => new SelectListItem
                {
                    Value = url.UrlIdentifier.ToString(),
                    Text = url.EnvironmentName
                }));
            }

            return result;
        }
    }
}