using System;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Models.Forms;
using Psi.Data.Models.Domain.OmegaUsers;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class FormsDesignerController : OmegaBaseController
    {
        // GET: SecureFormsDesigner
        public ActionResult Index()
        {
            // set up the view model
            string url = SettingsManager.Settings.SecureFormsDesignerSettings.SecureFormsDesignerUrl;
            var model = new FormsDesignerViewModel() { iFrameUrl = url };

            // Make sure the user is authorized to be here
            if (!SettingsManager.Settings.SecureFormsDesignerSettings.Enabled || !model.User.CanView(OmegaFeatureAccessPermission.SecureFormsDesigner))
            {
                return View("FeatureNotAvailable");
            }

            return View(model);
        }
    }
}