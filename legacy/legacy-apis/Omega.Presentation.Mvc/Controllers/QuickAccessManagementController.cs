using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.QuickAccessManagement;
using Psi.Data.Models.Domain.OmegaUsers;
using Psi.Data.Models.Domain.UserDevices;

namespace Omega.Presentation.Mvc.Controllers
{
    public class QuickAccessManagementController : OmegaBaseController
    {
        public ActionResult Index()
        {
            var model = new QuickAccessManagementIndexModel();

            if (!model.User.CanView(OmegaFeatureAccessPermission.QuickAccessManagement))
            {
                return View("FeatureNotAvailable");
            }

            return View("Index", model);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult GetUserDevices(long uuid)
        {
            var model = new QuickAccessManagementDisplayDevicesModel
            {
                Devices = Util.GetQuickAccessDevices(uuid)
            };
            
            return PartialView("UserDeviceList", model);
        }

        [HttpPost]
        [AllowAnonymous]
        public bool DeleteQuickAccessTokens(QuickAccessDevice device)
        {
            return Util.DeleteQuickAccessTokens(device);
        }
    }
}