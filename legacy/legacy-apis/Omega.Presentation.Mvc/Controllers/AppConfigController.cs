using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.AppConfig;

namespace Omega.Presentation.Mvc.Controllers
{
    public class AppConfigController : OmegaBaseController
    {
        // GET: AppConfig
        public ActionResult Index()
        {
            var model = new AppConfigModel();
            if (!model.User.PermissionLevel.CanView(PermissionLevel.Dev))
            {
                return View("FeatureNotAvailable");
            }

            model.Configs = new StringResourceRepository(Util.GetUser()).GetAppConfigs();
            return View("index", model);
        }

        public PartialViewResult GetConfigSetting(string name, AppConfigApplication application)
        {
            var model = new GetConfigSettingModel();
            model.Config = new StringResourceRepository(Util.GetUser()).GetAppConfig(name, application);
            return PartialView("GetConfigSetting", model);
        }

        public PartialViewResult SaveConfigSetting(SaveAppConfigRequest request)
        {
            var model = new GetConfigSettingModel();
            model.Config = new StringResourceRepository(Util.GetUser()).SaveAppConfig(request);
            model.ConfigChanged = true;
            return PartialView("GetConfigSetting", model);
        }

        public PartialViewResult GetConfigDetail(string name, AppConfigApplication application)
        {
            var model = new GetConfigSettingDetialModel();
            model.Config = new StringResourceRepository(Util.GetUser()).GetAppConfigDetail(name, application);

            return PartialView("GetConfigSettingDetial", model);
        }
    }
}