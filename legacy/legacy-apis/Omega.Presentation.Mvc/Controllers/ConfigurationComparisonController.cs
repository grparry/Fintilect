using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using NLog;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models.ApplicationConfiguration;
using Omega.Presentation.Mvc.Models.ConfigurationComparison;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;
using PSI.Models.ClientConfigurationModels.Agatha;

namespace Omega.Presentation.Mvc.Controllers
{
    public class ConfigurationComparisonController : OmegaBaseController
    {
        private readonly Dictionary<string, EnvironmentConfiguration> _environmentConfigurations;
        private readonly StringResourceRepository _stringResourceRepository;

        public ConfigurationComparisonController()
        {
            _environmentConfigurations = JsonConvert.DeserializeObject<Dictionary<string, EnvironmentConfiguration>>(Util.DecryptSettingValue(SettingsManager.Settings.OmegaConfiguration.EnvironmentConnections));
            _stringResourceRepository = new StringResourceRepository(Util.GetUser());
        }

        // show the initial view:
        [HttpGet]
        public ActionResult Index()
        {
            if (!SettingsManager.Settings.OmegaConfiguration.Features.ConfigurationComparisonEnabled) return Content("sorry, this feature is not enabled right now.");
            
            var items = _environmentConfigurations.Select(x => new SelectListItem {Text = x.Key, Value = x.Key}).ToList();

            var model = new ConfigurationComparisonModel {Environments = items};

            return View(model);
        }


        // Handle the 'Get Settings' button click event from AJAX _getConfigurationSettings method:
        [HttpGet]
        public ActionResult GetSettings(bool includeEnvironmentSpecificSettings, string source, string destination)
        {
            var settingsList = GetSettingDifferencesList(source, destination, includeEnvironmentSpecificSettings);
            return PartialView("_ConfigurationComparisonsView", settingsList);
        }


        // Handle the 'Destination Value' link click event from the _ConfigurationComparisonsView.cshtml file:
        [HttpGet]
        public ActionResult GetSettingForModal(string key, string destination)
        {
            var model = new ApplicationConfigurationEditModel
            {
                Setting = new ApplicationConfiguration(GetClientConfigurationSettings(destination).Single(x => x.Key == key)),
                Environment = destination
            };

            return PartialView("_SettingModal", model);
        }


        // Save an individual config setting from the Modal [POST]
        public bool SaveConfigSetting(ApplicationConfigurationUpdateValueModel requestModel)
        {
            try
            {
                var repo = new StringResourceRepository(Util.GetUser());
                var settingDetails = SettingsManager.Settings.GetClientConfigurations().First(x => x.Key.Equals(requestModel.Key, StringComparison.InvariantCultureIgnoreCase));

                repo.SaveApplicationConfigurationValue(settingDetails.Key,
                    requestModel.Value,
                    settingDetails.X_Application,
                    settingDetails.X_ItemName,
                    _environmentConfigurations[requestModel.Environment].ClientContext,
                    _environmentConfigurations[requestModel.Environment].ConnectionString,
                    _environmentConfigurations[requestModel.Environment].MetaConnectionString);

                return true;
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString(), ": Could not save configuration setting to " + requestModel.Environment);
                return false;
            }
        }


        // Handle the 'Get Settings' button click event from AJAX _getConfigurationSettings method: ValidateInput is false because of the <set me> tags. Besides, there is no user inputted data.
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult SetSettings(ConfigurationComparisonViewModel model) // change to model (see layeredSecurityController.cs as an example
        {
            if (!ModelState.IsValid) return RedirectToAction("Index");

            // get form results:
            var updateList = new List<ConfigurationComparisonPresentationModel>();

            if (model.SettingComparisons.Count > 0) updateList = model.SettingComparisons.Where(x => x.IsSelected).ToList();

            var repo = new StringResourceRepository(Util.GetUser());
            foreach (var setting in updateList)
            {
                var settingDetails = SettingsManager.Settings.GetClientConfigurations().First(x => x.Key.Equals(setting.Key, StringComparison.InvariantCultureIgnoreCase));
                repo.SaveApplicationConfigurationValue(settingDetails.Key,
                    setting.SourceValue,
                    settingDetails.X_Application,
                    settingDetails.X_ItemName,
                    _environmentConfigurations[model.DestinationEnvironment].ClientContext,
                    _environmentConfigurations[model.DestinationEnvironment].ConnectionString);
            }

            return Content("success");
        }


        // Get the client config settings from the databases and build presentation model:
        private ConfigurationComparisonViewModel GetSettingDifferencesList(string source, string destination, bool shouldIncludeEnvironmentSpecific)
        {
            var viewModel = new ConfigurationComparisonViewModel
            {
                DestinationEnvironment = destination,
                SourceEnvironment = source
            };

            var sourceSettings = Task.Run(() => GetClientConfigurationSettings(source));
            var destinationSettings = Task.Run(() => GetClientConfigurationSettings(destination));
            Task.WaitAll(sourceSettings, destinationSettings);

            // Get Source context settings:
            var sourceModel = sourceSettings.Result.Where(x => ShouldBeIncluded(x, shouldIncludeEnvironmentSpecific))
                .Select(x => new ApplicationConfiguration(x)).ToList();

            // Get Source context settings:
            var destinationModel = destinationSettings.Result.Where(x => ShouldBeIncluded(x, shouldIncludeEnvironmentSpecific))
                .Select(x => new ApplicationConfiguration(x)).ToDictionary(x => x.Key.ToLower());

            var changeList = new List<ConfigurationComparisonPresentationModel>();
            
            // compare source with destination to find differences... add it to the presentation model if it is NOT a match:
            if (sourceModel.Any() && destinationModel.Any())
            {
                foreach (var setting in sourceModel)
                {
                    destinationModel.TryGetValue(setting.Key.ToLower(), out var destinationSetting);
                    if (destinationSetting == null) Logger.Trace("Destination Setting is null.");
                    // add model to list if there is no match in the 'Value' Property:
                    if (!string.Equals(setting.Value, destinationSetting?.Value, StringComparison.InvariantCultureIgnoreCase))
                    {
                        var settingItem = new ConfigurationComparisonPresentationModel
                        {
                            Id = setting.ClientConfigurationId,
                            Key = setting.Key,
                            SourceValue = setting.Value,
                            DestinationValue = destinationSetting?.Value,
                            Description = GetSettingDescription(setting.Key) ?? "No Description Set",
                            DefaultValue = setting.DefaultValue,
                            IsEnvironmentSpecific = setting.IsEnvironmentSpecific
                        };

                        changeList.Add(settingItem);
                    }
                }
            }

            viewModel.SettingComparisons = changeList.OrderBy(x => x.Key).ToList();

            return viewModel;
        }

        private string GetSettingDescription(string key)
        {
            return _stringResourceRepository.GetDefaultApplicationConfig(key).Description;
        }

        private bool ShouldBeIncluded(ClientConfigurationSetting configSetting, bool shouldIncludeEnvironmentSpecific)
        {
            return shouldIncludeEnvironmentSpecific || configSetting.IsEnvironmentSpecific == false;
        }

        private IEnumerable<ClientConfigurationSetting> GetClientConfigurationSettings(string environment)
        {
            var request = new GetClientConfigurationRequest(0)
            {
                ConnectionString = _environmentConfigurations[environment].ConnectionString,
                ClientContext = _environmentConfigurations[environment].ClientContext,
                MetaConnectionString = _environmentConfigurations[environment].MetaConnectionString
            };

            var settings = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha
                .Get<GetClientConfigurationResponse>(request).ClientConfigurations;
            return settings;
        }
    }

    public class EnvironmentConfiguration
    {
        public string ConnectionString { get; set; }
        public string ClientContext { get; set; }
        public string MetaConnectionString { get; set; }
    }
}