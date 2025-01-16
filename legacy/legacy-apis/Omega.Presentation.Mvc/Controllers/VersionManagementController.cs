using System;
using System.Linq;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.ApplicationConfiguration;
using Omega.Presentation.Mvc.Models.VersionManagement;
using Psi.Data.Models.Domain.OmegaUsers;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class VersionManagementController : OmegaBaseController
    {
        public const string DeprecatedVersion = "Mobile.OsDeprecatedAppVersion";
        public ActionResult Index(VersionManagementViewModel model)
        {
            model = Util.GetVersionManagementViewModel(model);
            if (!model.User.CanView(OmegaFeatureAccessPermission.VersionManagement))
            {
                return View("FeatureNotAvailable");
            }

            return View("Index", model);
        }

        public ActionResult DefaultVersions(DefaultVersionManagementModel model)
        {
            model = Util.GetDefaultVersionManagementModel(model);

            return View("DefaultVersionManagement", model);
        }

        [HttpPost]
        public ActionResult UpdateClients(DefaultVersionManagementModel model)
        {
            // Update Client Context Version
            Util.UpdateClientContextVersionViewModel(model);

            return RedirectToAction("DefaultVersions");
        }

        [HttpPost]
        public ActionResult AddNewVersion(DefaultVersionManagementModel model)
        {
            Util.AddNewVersionViewModel(model);

            return RedirectToAction("DefaultVersions");
        }
        

        public ActionResult GetMinimumVersion(ManageMinimumVersionViewModel model)
        {
            var configModel = new ApplicationConfigurationEditModel();
            configModel.Setting = SettingsManager.Settings.GetClientConfigurations()
                    .Select(x => new ApplicationConfiguration(x))
                    .First(x => x.Key.Equals(DeprecatedVersion, StringComparison.InvariantCultureIgnoreCase));
            model = Util.GetManageMinimumVersionViewModel(model.NumberOfDays, configModel.Setting.Value);

            return PartialView("ManageMinimumAppVersion", model);
        }

        [HttpPost]
        public ActionResult SetMinimumVersion(ManageMinimumVersionViewModel model)
        {
            var setting = SettingsManager.Settings.GetClientConfigurations().First(x => x.Key.Equals(DeprecatedVersion, StringComparison.InvariantCultureIgnoreCase));
            setting.Value = model.CurrentItem;

            var repo = new StringResourceRepository(Util.GetUser());
            repo.SaveApplicationConfigurationValue(setting.Key, model.CurrentItem, setting.X_Application, setting.X_ItemName);

            return RedirectToAction("Index");
        }
    }
}