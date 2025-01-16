using System;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.LicenseManager;

namespace Omega.Presentation.Mvc.Controllers
{
    public class LicenseManagerController : OmegaBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var model = new ManageLicensesModel
            {
                Clients = Util.GetClients()
            };

            return View("Index", model);
        }

        [HttpGet]
        public ActionResult GetFeaturesForClient(int selectedClientId)
        {
            var model = new ClientFeaturesModel
            {
                ClientFeatures = Util.GetLicensedFeaturesForClient(selectedClientId),
                SelectedClientId = selectedClientId
            };

            return PartialView("GetFeaturesForClient", model);
        }
        
        [HttpPost]
        public void EditLicense(int featureId, int clientId, bool license)
        {
            var success = Util.EditLicense(featureId, clientId, license);

            if (!success)
            {
                throw new Exception("Editing a license failed miserably. Cry some more.");
            }
        }
    }
}