using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.FeaturesManager;
using Psi.Data.Models.Domain.FeaturesManager;

namespace Omega.Presentation.Mvc.Business
{
    public class FeaturesManagerRepository
    {
        public List<ManagedFeature> GetFeatures()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetManagedFeaturesResponse>(new GetManagedFeaturesRequest(0));

            return response.Features;
        }
        public List<ManagedFeature> GetFeatureById(string id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetManagedFeatureByIdResponse>(new GetManagedFeatureByIdRequest(0) { FeatureId = id });

            return response.Features;
        }

        public bool AddUpdateFeature(ManagedFeature feature)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddUpdateManagedFeatureResponse>(new AddUpdateManagedFeatureRequest(0) { Feature = feature });

            return response.Success;
        }

        public bool DeleteFeature(ManagedFeature feature)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteManagedFeatureResponse>(new DeleteManagedFeatureRequest(0) { Feature = feature });

            return response.Success;
        }

        public bool ActivateFeature(ManagedFeature feature)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<ActivateManagedFeatureResponse>(new ActivateManagedFeatureRequest(0) { Feature = feature });

            return response.Success;
        }

        public List<ManagedFeatureGroup> GetFeatureGroups(int featureGroupId = 0)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetManagedFeatureGroupsResponse>(
                new GetManagedFeatureGroupsRequest(0) { FeatureGroupId = featureGroupId });

            return response.FeatureGroups;
        }

        public bool AddUpdateFeatureGroup(ManagedFeatureGroup featureGroup)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddUpdateManagedFeatureGroupResponse>(new AddUpdateManagedFeatureGroupRequest(0) { FeatureGroup = featureGroup });

            return response.Success;
        }

        public List<FeatureSetting> GetSettings(int settingId = 0)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetFeatureSettingsResponse>(new GetFeatureSettingsRequest(0) { SettingId = settingId });

            return response.Settings;
        }

        public bool AddUpdateSetting(FeatureSetting setting)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddUpdateFeatureSettingResponse>(new AddUpdateFeatureSettingRequest(0) { Setting = setting });

            return response.Success;
        }

        public List<SelectListItem> GetClients()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetClientsResponse>(new GetClientsRequest(0));

            return response.Clients.Select(client => new SelectListItem
            {
                Value = client.Id.ToString(),
                Text = client.Name
            }).ToList();
        }

        public List<ManagedFeature> GetLicensedFeaturesForClient(int clientId)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetManagedFeaturesForClientResponse>(new GetManagedFeaturesForClientRequest(0) { ClientId = clientId });

            return response.Features;
        }

        public bool EditLicense(int featureId, int clientId, bool license)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<EditManagedFeatureForClientResponse>(new EditManagedFeatureForClientRequest(0) { FeatureId = featureId, ClientId = clientId, License = license });

            return response.Success;
        }

        public List<string> GetAvailableApplicationConfigurationNames()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAvailableApplicationConfigurationNamesResponse>(new GetAvailableApplicationConfigurationNamesRequest(0));

            return response.ConfigurationNames;
        }
    }
}