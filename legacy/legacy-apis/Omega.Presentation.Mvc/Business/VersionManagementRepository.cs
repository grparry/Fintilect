using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Omega.Presentation.Mvc.Models.VersionManagement;
using Psi.Business.ServiceContracts.RequestResponse.VersionManagement;
using Psi.Data.Models.Domain;

namespace Omega.Presentation.Mvc.Business
{
    public class VersionManagementRepository
    {
        public VersionManagementViewModel GetVersionManagementViewModel(VersionManagementViewModel model)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetVersionCountsResponse>(new GetVersionCountsRequest(0)
            {
                AndroidAppNumberOfDays = model.AndroidAppNumberOfDays,
                AndroidNumberOfDays = model.AndroidNumberOfDays,
                iOSAppNumberOfDays = model.iOSAppNumberOfDays,
                iOSNumberOfDays = model.iOSNumberOfDays
            });

            model.iOSVersions = ConvertVersionCountToAppVersion(response.iOSVersions);
            model.AndroidVersions = ConvertVersionCountToAppVersion(response.AndroidVersions);
            model.iOSAppVersions = ConvertVersionCountToAppVersion(response.iOSAppVersions);
            model.AndroidAppVersions = ConvertVersionCountToAppVersion(response.AndroidAppVersions);

            return model;
        }
        public DefaultVersionManagementModel GetDefaultVersionManagementModel(DefaultVersionManagementModel model)
        {
            var request = new GetClientContextRequest(0)
            {
                CurrentContext = ApplicationConfigHelper.Config.ClientContextName
            };
            var clientResponse = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetClientContextResponse>(request);
            model.ClientContextVersions = ConvertClientVersionToClientVersionResponse(clientResponse.ClientContextAppVersions);

            var appResponse = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAppVersionsResponse>(new GetAppVersionsRequest(0));
            model.AppVersions = ConvertAppVersionToAppVersionResponse(appResponse.DefaultAppVersions);

            return model;
        }
        public Boolean UpdateClientContextVersionViewModel(DefaultVersionManagementModel model)
        {
            var request = new UpdateClientContextRequest(0)
            {
                Context = ApplicationConfigHelper.Config.ClientContextName,
                CurrentIosAppVersion = model.ClientContextVersions.CurrentIosAppVersion,
                CurrentAndroidAppVersion = model.ClientContextVersions.CurrentAndroidAppVersion
            };
            var clientResponse = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<UpdateClientContextResponse>(request);
            return clientResponse.Success;
        }

        public Boolean AddNewVersionViewModel(DefaultVersionManagementModel model)
        {
            var clientResponse = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddAppVersionsResponse>(new AddAppVersionsRequest(0)
            {
                Version = model.NewVersion
            });
            return clientResponse.Success;
        }

        public ManageMinimumVersionViewModel GetManageMinimumVersionViewModel(int numberOfDays, string defaultValue)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAppVersionCountsResponse>(new GetAppVersionCountsRequest(0)
            {
                NumberOfDays = numberOfDays
            });

            var appVersions = ConvertVersionCountToAppVersion(response.AppVersions);
            var currentItem = "";
            var selectable = new List<SelectListItem>();

            if (defaultValue.IsNullOrEmpty())
            {
                currentItem = "None";
                selectable = ConvertAppVersionToSelectListItems(appVersions, currentItem);
            }
            else if(defaultValue.Contains("."))
            {
                selectable = ConvertAppVersionToSelectListItems(appVersions, defaultValue);
                currentItem = defaultValue;
            }
            else
            {
                currentItem = "None";
                selectable.Add(new SelectListItem { Value = "", Text = "None" });
            }

            var model = new ManageMinimumVersionViewModel()
            {
                NumberOfDays = numberOfDays,
                AppVersions = appVersions,
                AvailableVersions = selectable,
                CurrentItem = currentItem
            };

            return model;
        }

        public List<ApplicationVersion> ConvertAppVersionToAppVersionResponse(List<DefaultAppVersion> appVersions)
        {
            var result = new List<ApplicationVersion>();

            appVersions.ForEach(x => result.Add(new ApplicationVersion
            {
                ApplicationVersionId = x.ApplicationVersionId,
                Version = x.Version
            }));

            return result;
        }
        public ClientContextDetails ConvertClientVersionToClientVersionResponse(ClientContextVersion clientVersions)
        {
            return new ClientContextDetails
            {
                CurrentContext = ApplicationConfigHelper.Config.ClientContextName,
                CurrentIosAppVersion = clientVersions.CurrentIosAppVersion,
                CurrentAndroidAppVersion = clientVersions.CurrentAndroidAppVersion
            };
        }

        public List<AppVersion> ConvertVersionCountToAppVersion(List<VersionCount> versionCounts)
        {
            var totalUsers = (double)versionCounts.Sum(x => x.Count);

            var result = new List<AppVersion>();

            versionCounts.ForEach(x => result.Add(new AppVersion
            {
                Count = x.Count,
                VersionNumber = x.VersionNumber,
                Percentage = Math.Round(x.Count / totalUsers * 100, 2)
            }));

            return result;
        }

        public List<SelectListItem> ConvertAppVersionToSelectListItems(List<AppVersion> appVersions, string defaultValue)
        {
            var result = new List<SelectListItem>();

            foreach (AppVersion ap in appVersions)
            {
                if (ap.VersionNumber != defaultValue)
                {
                    result.Add(new SelectListItem
                    {
                        Value = ap.VersionNumber,
                        Text = ap.VersionNumber
                    });
                }
            }
            if (defaultValue != "None") result.Add(new SelectListItem { Value = "", Text = "None" });

            return result;
        }
    }
}