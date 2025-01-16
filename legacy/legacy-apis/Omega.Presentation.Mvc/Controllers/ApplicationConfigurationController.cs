using System;
using System.Linq;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.ApplicationConfiguration;
using PSI.Models.ClientConfigurationModels.Agatha;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;

namespace Omega.Presentation.Mvc.Controllers
{
    public class ApplicationConfigurationController : OmegaBaseController
    {
        // GET: ApplicationConfiguration
        public ActionResult Index()
        {
            var model = new ApplicationConfigurationModel
            {
                Settings = SettingsManager.Settings.GetClientConfigurations(true)
                    .Where(x => !x.IsInternalOnly || Util.GetUser().PermissionLevel.CanView(PermissionLevel.SuperUser))
                    .Select(x => new ApplicationConfiguration(x)).ToList()
            };

            if (!model.User.PermissionLevel.CanView(PermissionLevel.Support))
            {
                return View("FeatureNotAvailable");
            }

            return View(model);
        }

        public PartialViewResult GetConfigSetting(string key)
        {
            var model = new ApplicationConfigurationEditModel
            {
                Setting = SettingsManager.Settings.GetClientConfigurations(true)
                            .Select(x => new ApplicationConfiguration(x))
                            .First(x => x.Key.Equals(key, StringComparison.InvariantCultureIgnoreCase))
            };

            var repo = new StringResourceRepository(Util.GetUser());
            var defaultSetting = repo.GetDefaultApplicationConfig(key);
            model.Setting.Description = defaultSetting.Description;
            if (model.Setting.IsInternalOnly)
            {
                model.Setting.Value = Util.DecryptSettingValue(model.Setting.Value);
            }

            if (model.Setting.SourceOfValues != SourceOfValues.None)
                model.PossibleValuesFromSource = repo.GetPossibleValuesFromSource(model.Setting.SourceOfValues);

            if (key.Equals("History.Share.DescriptionOverlayConfigurationJson", StringComparison.InvariantCultureIgnoreCase)) return PartialView("HistoryOverlayConfig", model);

            return PartialView(model);
        }

        public PartialViewResult GetDefaultConfig(string key)
        {
            var repo = new StringResourceRepository(Util.GetUser());

            var model = repo.GetDefaultApplicationConfig(key);
            if (!key.IsNullOrEmpty()) return PartialView(model);

            model.AvailableFeatures = Util.GetManagedFeatures();
            model.AvailableFeatureGroups = Util.GetManagedFeatureGroups();

            return PartialView(model);
        }

        public PartialViewResult SaveDefaultConfig(ApplicationDefaultConfigurationModel request)
        {
            var repo = new StringResourceRepository(Util.GetUser());
            request.PossibleValues = request.PossibleValuesString?.Split('\n','\r').Where(x=>x.IsNotNullOrEmptyAfterTrim()).Distinct().ToList();
            if (request.ValueIsNull) request.DefaultValue = null;
            var model = repo.ManageDefaultApplicationConfig(request);
            model.WasUpdated = true;
            SettingsManager.Settings.RefreshSettings();
            return PartialView("GetDefaultConfig", model);
        }

        public void SaveConfigSetting(ApplicationConfigurationUpdateValueModel requestModel)
        {
            var setting = SettingsManager.Settings.GetClientConfigurations().First(x => x.Key.Equals(requestModel.Key, StringComparison.InvariantCultureIgnoreCase));
            if (setting.IsInternalOnly)
            {
                requestModel.Value = Util.EncryptSettingValue(requestModel.Value);
            }

            var repo = new StringResourceRepository(Util.GetUser());
            repo.SaveApplicationConfigurationValue(setting.Key, requestModel.Value, setting.X_Application, setting.X_ItemName);
        }
       
    }
}