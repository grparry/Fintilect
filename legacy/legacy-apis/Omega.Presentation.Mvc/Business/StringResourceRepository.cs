using System.Collections.Generic;
using System.Linq;
using Omega.Presentation.Mvc.Models;
using Omega.Presentation.Mvc.Models.AppConfig;
using Omega.Presentation.Mvc.Models.ApplicationConfiguration;
using Omega.Presentation.Mvc.Models.StringResources;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;

namespace Omega.Presentation.Mvc.Business
{
    public class StringResourceRepository
    {
        private readonly User _user;

        public StringResourceRepository(User user)
        {
            _user = user;
        }

        public List<ResourceSet> GetResourceSets()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<StringResourcesGetResourceSetsResponse>(
                new StringResourcesGetResourceSetsRequest(0));

            return response.ResourceSets.Select(x=> new ResourceSet(x)).ToList();
        }

        public List<Resource> GetResources(string name)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<StringResourcesGetResourcesResponse>(
                new StringResourcesGetResourcesRequest(0)
                {
                    Name = name
                });

            return response.Resources.Select(x=> new Resource(x)).ToList();
        }

        public FullResouce GetDefaultKey(string key, string set)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<StringResourcesGetDefaultKeyResponse>(
                new StringResourcesGetDefaultKeyRequest(0)
                {
                    Key = key,
                    Set = set
                });

            return new FullResouce(response.Resources);
        }

        public IEnumerable<FullResouce> GetKeys(string key, string set)
        {

            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<StringResourcesGetKeysResponse>(
                new StringResourcesGetKeysRequest(0)
                {
                    Key = key,
                    Set = set
                });

            return response.Resources.Select(x=> new FullResouce(x));
        }

        public FullResouce GetKey(string key, string set, int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<StringResourcesGetKeyResponse>(
            new StringResourcesGetKeyRequest(0)
            {
                Key = key,
                Set = set,
                Id = id
            });

            return new FullResouce(response.Resource);
        }

        public void SaveDefaultResource(DefaultResource resource)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<StringResourcesSaveDefaultResourceResponse>(
                new StringResourcesSaveDefaultResourceRequest(0)
                {
                    Resource = new Psi.Data.Models.Domain.StringResources.DefaultResource()
                    {
                        Culture = resource.Culture,
                        Id = resource.Id,
                        Key = resource.Key,
                        PermissionLevel = resource.PermissionLevel,
                        ResourceSet = resource.ResourceSet,
                        Value = resource.Value
                    } 
                });

            resource.Id = response.Resource.Id;
        }

        public void SaveResource(FullResouce resource)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<StringResourcesSaveResourceResponse>(
                new StringResourcesSaveResourceRequest(0)
                {
                    Resource = new Psi.Data.Models.Domain.StringResources.FullResouce()
                    {
                        Culture = resource.Culture,
                        Id = resource.Id,
                        Key = resource.Key,
                        PermissionLevel = resource.PermissionLevel,
                        ResourceSet = resource.ResourceSet,
                        Value = resource.Value,
                        CreatedAt = resource.CreatedAt,
                        EndAt = resource.EndAt,
                        StartAt = resource.StartAt
                    }
                });

            resource.Id = response.Resource.Id;
        }

        public void SaveApplicationConfigurationValue(string key, string value, string application, string itemName, string clientContext = null, string connectionString = null, string metaConnectionString = null)
        {
			// Don't allow nulls
	        if (value == null)
		        value = string.Empty;

            Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(
                new ApplicationConfigurationRequests.ApplicationConfigurationSetValueRequest(0)
                {
                    Key = key.Trim(),
                    Value = value,
                    Application = application,
                    ItemName = itemName,
                    ClientContext = clientContext,
                    ConnectionString = connectionString,
                    AdminUsername = _user.Name,
                    MetaConnectionString = metaConnectionString
                });
        }

        public Dictionary<string, string> GetPossibleValuesFromSource(SourceOfValues sourceOfValues)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetPossibleValuesFromSourceResponse>(
                new GetPossibleValuesFromSourceRequest(0)
                {
                    SourceOfValues = sourceOfValues,
                });

            return response.PossibleValues;
        }

        public ApplicationDefaultConfigurationModel GetDefaultApplicationConfig(string key)
        {
            if(key.IsNullOrEmpty()) return new ApplicationDefaultConfigurationModel() {PossibleValues = new List<string>()};

            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetApplicationDefaultConfigResponse>(
                new GetApplicationDefaultConfigRequest(0)
                {
                    Key = key.Trim()
                });

            return new ApplicationDefaultConfigurationModel
            {
                Description = response.Description,
                DefaultValue = response.DefaultValue,
                Key = response.Key, 
                PossibleValues = response.PossibleValues??new List<string>(),
                SourceOfValues = response.SourceOfValues,
                ValueType = response.ValueType,
                Version = response.Version,
                IsEnvironmentSpecific = response.IsEnvironmentSpecific,
                MustProductionValueBeUnique = response.MustProductionValueBeUnique,
                IsInternalOnly = response.IsInternalOnly
            };
            
        }

        public ApplicationDefaultConfigurationModel ManageDefaultApplicationConfig(ApplicationDefaultConfigurationModel request)
        {
            Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(new ManageApplicationDefaultConfigRequest(0)
            {
                Key = request.Key.Trim(),
                Description = request.Description,
                DefaultValue = request.DefaultValue,
                PossibleValues = request.PossibleValues,
                ValueType = request.ValueType,
                Version = request.Version,
                IsEnvironmentSpecific = request.IsEnvironmentSpecific,
                MustProductionValueBeUnique = request.MustProductionValueBeUnique,
                FeatureId = request.FeatureId,
                FeatureGroupId = request.FeatureGroupId,
                SourceOfValues = request.SourceOfValues,
                IsInternalOnly = request.IsInternalOnly
            });

            return request;
        }

        public List<AppConfig> GetAppConfigs()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAppConfigsResponse>(new GetAppConfigsRequest(0));
            return response.Configs.Select(x => new AppConfig(x)).ToList();
        }

        public AppConfig GetAppConfig(string name, AppConfigApplication application)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAppConfigResponse>(new GetAppConfigRequest(0) {Name = name, Application = AppConfig.GetApplication(application)});
            return new AppConfig(response.Config);
        }

        public AppConfig SaveAppConfig(SaveAppConfigRequest request)
        {
	        // Only allow nulls when explicitly set
	        if (request.ValueIsNull)
		        request.Value = null;
	        else if (request.Value == null)
		        request.Value = "";

			Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(
                new ManageAppConfigRequest(0) { User= _user.Email, Config = 
                    new Psi.Data.Models.Domain.AppConfig
                        {
                            Value = request.Value,
                            Application = AppConfig.GetApplication(request.Application),
                            Name = request.Name
                        } });
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAppConfigResponse>(new GetAppConfigRequest(0) { Name = request.Name, Application = AppConfig.GetApplication(request.Application) });
            return new AppConfig(response.Config);
        }

        public AppConfigDetail GetAppConfigDetail(string name, AppConfigApplication application)
        {
            if(name.IsNullOrEmpty()) return new AppConfigDetail() {Application = application};
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAppConfigDetailResponse>(
                new GetAppConfigDetailRequest(0)
                {
                   ItemName = name,
                   FilterApplication = AppConfig.GetApplication(application)
                });

            return new AppConfigDetail(response.Config);
        }
    }
}
