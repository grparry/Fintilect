using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.OnlineBankingApi;
using Psi.Business.ServiceContracts.RequestResponse.OnlineBankingApi;
using Psi.Data.Models.Domain.OnlineBankingApi;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class OnlineBankingApiController : OmegaBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var model = new OnlineBankingApiViewModel
            {
                Credentials = Util.GetApiCredentials()
            };

            if (!model.User.PermissionLevel.CanView(PermissionLevel.Support))
            {
                return View("FeatureNotAvailable");
            }

            return View("Index", model);
        }

        [HttpGet]
        public ActionResult GetApiCredentialsList()
        {
            var model = new OnlineBankingApiViewModel
            {
                Credentials = Util.GetApiCredentials()
            };

            return PartialView("GetApiCredentialsList", model);
        }

        [HttpGet]
        public ActionResult GetCredentials(int credentialsId)
        {
            var model = new EditApiCredentialsViewModel
            {
                Credentials = credentialsId == 0 ? new ApiCredentials() : Util.GetApiCredentials().First(x => x.Id == credentialsId)
            };
            
            return PartialView("AddUpdateApiCredentials", model);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateCredentials(EditApiCredentialsViewModel model, string button)
        {
            var credentials = new AddUpdateApiCredentialsRequest(0)
            {
                Credentials = model.Credentials, 
                NewSharedKey = model.NewSharedKey
            };

            if (button == "Delete")
            {
                var success = Util.DeleteApiCredentials(model.Credentials);

                if (!success)
                {
                    throw new Exception($"There was an error deleting the credentials for {model.Credentials.Username}");
                }
            }
            else
            {
                if (model.Credentials.Id <= 0) //Creating a new record. Compute the expiration time.
                {
                    model.Credentials.Expires = DateTime.UtcNow.AddYears(SettingsManager.Settings.OnlineBankingApi.CredentialsExpirationTime);
                }

                var success = Util.UpdateApiCredentials(credentials);

                if (!success)
                {
                    throw new Exception($"There was an error saving the credentials for {model.Credentials.Username}");
                }
            }

            return RedirectToAction("Index");
        }
    }
}
