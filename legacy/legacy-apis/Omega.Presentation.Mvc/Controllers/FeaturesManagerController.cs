using System;
using System.Linq;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.ApplicationConfiguration;
using Omega.Presentation.Mvc.Models.FeaturesManager;
using Psi.Data.Models.Domain.FeaturesManager;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class FeaturesManagerController : OmegaBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var model = new ManagedFeaturesModel { Features = Util.GetManagedFeatures() };
            if (!model.User.PermissionLevel.CanView(PermissionLevel.Support))
            {
                return View("FeatureNotAvailable");
            }

            return View("Index", model);
        }

        [HttpGet]
        public ActionResult EditFeature(string id)
        {

            var model = new AddUpdateFeatureModel
            {
                Feature = id.ToInt() > 0 ? Util.GetManagedFeatureById(id).First() : new ManagedFeature()
            };

            return PartialView("AddUpdateFeature", model);
        }

        [HttpPost]
        public ActionResult AddUpdateFeature(ManagedFeature feature)
        {
            var success = Util.AddUpdateManagedFeature(feature);

            if (!success)
            {
                throw new Exception("Adding or updating a feature failed miserably. Cry some more.");
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult DeleteFeature(ManagedFeature feature)
        {
            var success = Util.DeleteManagedFeature(feature);

            if (!success)
            {
                throw new Exception("Deleting a feature failed miserably. Cry some more.");
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult ActivateFeature(ManagedFeature feature)
        {
            var success = Util.ActivateManagedFeature(feature);

            if (!success)
            {
                throw new Exception("Activating a feature failed miserably. Cry some more.");
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult ViewFeatureGroups(int featureId = 0)
        {
            var model = new FeatureGroupsModel();
            if (featureId == 0)
            {
                model.FeatureGroups = Util.GetManagedFeatureGroups();
            }
            else
            {
                model.Feature = Util.GetManagedFeatureById(featureId.ToString()).First();
                model.FeatureGroups = model.Feature.FeatureGroups;
            }

            return View("ViewFeatureGroups", model);
        }

        [HttpGet]
        public ActionResult EditFeatureGroup(int id, int featureId)
        {
            var model = new AddUpdateFeatureGroupModel
            {
                FeatureGroup = id > 0 ? Util.GetManagedFeatureGroups().First(x => x.Id == id) : new ManagedFeatureGroup { FeatureId = featureId }
            };

            return PartialView("AddUpdateFeatureGroup", model);
        }

        [HttpPost]
        public void AddUpdateFeatureGroup(ManagedFeatureGroup featureGroup)
        {
            var success = Util.AddUpdateManagedFeatureGroup(featureGroup);

            if (!success)
            {
                throw new Exception("Adding or updating a feature group failed miserably. Cry some more.");
            }
        }

        [HttpGet]
        public ActionResult ViewSettings(int featureId = 0, int groupId = 0)
        {
            var model = new SettingsModel();

            if (featureId != 0)
            {
                model.Feature = Util.GetManagedFeatures().First(x => x.Id == featureId);

                if (groupId != 0)
                {
                    model.FeatureGroup = model.Feature.FeatureGroups.First(x => x.Id == groupId);
                    model.Settings = model.FeatureGroup.Settings;
                }
                else
                {
                    model.Settings = model.Feature.FeatureGroups.First().Settings;
                }
            }
            else
            {
                model.Settings = Util.GetFeatureSettings();
            }

            model.Settings.ForEach(x => x.CurrentConfigValue = SettingsManager.Settings.GetClientConfigurations()
                    .Select(y => new ApplicationConfiguration(y))
                    .FirstOrDefault(y => y.Key.Equals(x.Name, StringComparison.InvariantCultureIgnoreCase))?.Value);

            return View("ViewSettings", model);
        }

        [HttpGet]
        public ActionResult EditSetting(int id, int featureId, int groupId)
        {
            var model = new AddUpdateSettingModel
            {
                Setting = id > 0 ? Util.GetFeatureSettings(id).First(x => x.Id == id) : new FeatureSetting { FeatureId = featureId, GroupId = groupId },
                ApplicationConfigurationNames = Util.GetAvailableApplicationConfigurationNames()
            };

            return PartialView("AddUpdateSetting", model);
        }

        [HttpPost]
        public void AddUpdateSetting(FeatureSetting setting)
        {
            var success = Util.AddUpdateFeatureSetting(setting);

            if (!success)
            {
                throw new Exception("Adding or updating a setting failed miserably. Cry some more.");
            }
        }

        [HttpGet]
        public PartialViewResult GetFeatureList(string activeListItem = "")
        {
            var model = new ManagedFeaturesModel() { Features = Util.GetManagedFeatures() };

            ViewBag.ActiveListItem = activeListItem;

            return PartialView("GetFeatureList", model);
        }

        [HttpGet]
        public PartialViewResult GetFeature(string id, bool? licensed = null, int? selectedClientId = null)
        {
            var model = new AddUpdateFeatureModel
            {
                Feature = Util.GetManagedFeatureById(id).First(),
                Licensed = licensed,
                SelectedClientId = selectedClientId
            };

            return PartialView("GetFeature", model);
        }

        [HttpGet]
        public PartialViewResult GetFeatureGroupList(int featureId = 0)
        {
            var model = new FeatureGroupsModel();
            if (featureId == 0)
            {
                model.FeatureGroups = Util.GetManagedFeatureGroups();
            }
            else
            {
                model.Feature = Util.GetManagedFeatures().First(x => x.Id == featureId);
                model.FeatureGroups = Util.GetManagedFeatureGroups().Where(x => x.FeatureId == featureId).ToList();
            }
            return PartialView("GetFeatureGroupList", model);
        }

        [HttpGet]
        public PartialViewResult GetFeatureGroup(int id)
        {
            var model = new AddUpdateFeatureGroupModel();
            if (id > 0)
            {
                model.FeatureGroup = Util.GetManagedFeatureGroups(id).First();
            }
            return PartialView("GetFeatureGroup", model);
        }

        [HttpGet]
        public PartialViewResult GetSettingList(int featureId = 0, int groupId = 0)
        {
            var model = new SettingsModel { Settings = Util.GetFeatureSettings() };
            if (featureId != 0)
            {
                model.Feature = Util.GetManagedFeatureById(featureId.ToString()).First();
                model.Settings = model.Settings.Where(x => x.FeatureId == featureId).ToList();
            }
            if (groupId != 0)
            {
                model.FeatureGroup = Util.GetManagedFeatureGroups().First(x => x.Id == groupId);
                model.Settings = model.Settings.Where(x => x.GroupId == groupId).ToList();
            }
            return PartialView("GetSettingList", model);
        }

        [HttpGet]
        public PartialViewResult GetSetting(int id)
        {
            var model = new AddUpdateSettingModel();
            if (id > 0)
            {
                model.Setting = Util.GetFeatureSettings(id).First();
	            model.Setting.CurrentConfigValue = SettingsManager.Settings.GetClientConfigurations()
		            .Select(y => new ApplicationConfiguration(y))
		            .FirstOrDefault(y => y.Key.Equals(model.Setting.Name, StringComparison.InvariantCultureIgnoreCase))?.Value;
            }
			return PartialView("GetSetting", model);
        }

        [HttpGet]
        public string GetSettingDescription(string key)
        {
            var repo = new StringResourceRepository(Util.GetUser());
            var defaultSetting = repo.GetDefaultApplicationConfig(key);
            return defaultSetting.Description;
        }
    }
}