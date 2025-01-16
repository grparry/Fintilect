using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.QrCodeGenerator;
using Psi.Business.ServiceContracts.RequestResponse.QrCodeGenerator;
using Psi.Data.Models.Domain.OmegaUsers;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class QrCodeGeneratorController : OmegaBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {            
            var model = new QrCodeGeneratorViewModel();

            if (!SettingsManager.Settings.OmegaConfiguration.Features.QRCodeGeneratorEnabled || !model.User.PermissionLevel.CanView(PermissionLevel.Owner) || !model.User.CanView(OmegaFeatureAccessPermission.QrCodeGenerator))
            {
                return View("FeatureNotAvailable");
            }

            model.WebServiceUrls = Util.GetWebServiceUrlsSelectList();

            return View("Index", model);
        }

        [HttpGet]
        public ActionResult CreateAuthorizationCode(QrCodeGeneratorViewModel model, string button)
        {
            if (!SettingsManager.Settings.OmegaConfiguration.Features.QRCodeGeneratorEnabled || !model.User.PermissionLevel.CanView(PermissionLevel.Owner) || !model.User.CanView(OmegaFeatureAccessPermission.QrCodeGenerator))
            {
                return View("FeatureNotAvailable");
            }

            model.WebServiceUrls = Util.GetWebServiceUrlsSelectList();
            if (button == "Get Authorization Code")
            {
                model.QrCode = Util.GenerateAuthorizationCode();
            }
            else if (button == "Get URL Code")
            {
                model.QrCode = Util.GenerateQrCode(model.CurrentItem);
            }

            return View("Index", model);
        }

        [HttpGet]
        public ActionResult EditUrls()
        {
            var model = new EditUrlsModel();

            if (!SettingsManager.Settings.OmegaConfiguration.Features.QRCodeGeneratorEnabled || !model.User.PermissionLevel.CanView(PermissionLevel.Owner) || !model.User.CanView(OmegaFeatureAccessPermission.QrCodeGenerator))
            {
                return View("FeatureNotAvailable");
            }

            model.WebServiceUrls = Util.GetWebServiceUrls();

            return View("EditUrls", model);
        }

        [HttpGet]
        public ActionResult AddUpdateUrl(int urlId)
        {
            var model = new AddUpdateUrlModel();

            if (!SettingsManager.Settings.OmegaConfiguration.Features.QRCodeGeneratorEnabled || !model.User.PermissionLevel.CanView(PermissionLevel.Owner) || !model.User.CanView(OmegaFeatureAccessPermission.QrCodeGenerator))
            {
                return View("FeatureNotAvailable");
            }

            model.WebServiceUrl = urlId > 0 ? Util.GetWebServiceUrls().First(x => x.Id == urlId) : new WebServiceUrl();

            return View("AddUpdateUrl", model);
        }

        [HttpPost]
        public async Task<ActionResult> AddUpdateUrl(AddUpdateUrlModel model, string button)
        {
            if (button == "Delete URL")
            {
                Util.DeleteWebServiceUrl(model.WebServiceUrl.Id);

                return RedirectToAction("EditUrls");
            }

            if (model.WebServiceUrl.Id == 0)
            {
                model.WebServiceUrl.UrlIdentifier = Guid.NewGuid();
            }

            var success = Util.AddUpdateWebServiceUrl(model.WebServiceUrl);

            return RedirectToAction("EditUrls");
        }
    }
}
