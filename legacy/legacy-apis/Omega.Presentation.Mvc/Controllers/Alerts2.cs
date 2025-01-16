using System.Web.Mvc;
using Omega.Presentation.Mvc.Models.Alerts2;
using Psi.Data.Models.Domain.OmegaUsers;

namespace Omega.Presentation.Mvc.Controllers
{
    public class Alerts2Controller : OmegaBaseController
    {
        // GET: Alerts2
        public ActionResult Index()
        {
            var model = new Alerts2Model();
            if (!model.User.CanView(OmegaFeatureAccessPermission.AlertsAdmin))
            {
                return View("FeatureNotAvailable");
            }

            ViewBag.BaseModel = model;  // for user authentication

            return View();
        }
    }
}