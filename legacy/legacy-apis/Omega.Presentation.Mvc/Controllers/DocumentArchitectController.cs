using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Models.DocumentArchitect;
using PSI.Models.ClientConfigurationModels.Agatha;
using Omega.Presentation.Mvc.Business;

namespace Omega.Presentation.Mvc.Controllers
{
    public class DocumentArchitectController : OmegaBaseController
    {
        // GET: DocumentArchitect
        public ActionResult Index()
        {
            // obtain Omega user's email
            var email = Util.GetUser().Email;

            var helper = new DocumentArchitectHelper();
            string url = helper.GetSsoUrl(email);

            var model = new DocumentArchitectViewModel()
            {
                Url = !String.IsNullOrEmpty(url) ? url : "",
                UseIframe = SettingsManager.Settings.OmegaConfiguration.DocumentArchitectSso.ShouldOpenInNewWindow,
                ErrorMessage = String.IsNullOrEmpty(url) ? "Generated Document Architect URL is invalid" : ""
            };

            return View(model);
        }
    }
}