using System;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.Application.Omega
{
    public class Feature : SettingsBaseHelper
    {
        private AccountNumberAssociation _accountNumberAssociation;

        public Feature(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Omega.Features.RemoveBillSubscribersEnabled")]
        public bool RemoveBillSubscribersEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.XAppConfigEnabled")]
        public bool XAppConfigEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.StringResourcesEnabled")]
        public bool StringResourcesEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.ApplicationConfigEnabled")]
        public bool ApplicationConfigEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.AddNewUserEnabled")]
        public bool AddNewUserEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.EditUserPermissionsEnabled")]
        public bool EditUserPermissionsEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.VersionManagementEnabled")]
        public bool VersionManagementEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.QRCodeGeneratorEnabled")]
        public bool QRCodeGeneratorEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.LayeredSecurityEnabled")]
        public bool LayeredSecurityEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.FeaturesManagerEnabled")]
        public bool FeaturesManagerEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.LicenseManagerEnabled")]
        public bool LicenseManagerEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.CreditUnionContactInfoEnabled")]
        public bool CreditUnionContactInfoEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.OnlineBankingApiEnabled")]
        public bool OnlineBankingApiEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.LayeredSecurity.MaximumRequiredMethods")]
        public int LayeredSecurityMaximumRequiredMethods
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.LayeredSecurity.ExcludePasswordRule")]
        public bool LayeredSecurityExcludePasswordRule
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.ThirdPartySystemMessages.Enabled")]
        public bool EnableThirdPartySystemMessages
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.QuickAccessManagementEnabled")]
        public bool QuickAccessManagementEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.NewMobileFeaturesEnabled")]
        public bool NewMobileFeaturesEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }


        [SettingKey("Omega.Features.DeleteOnlineBankingUsersEnabled")]
        public bool DeleteOnlineBankingUsersEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }


        [SettingKey("Omega.Features.DeleteOnlineBankingUsersMaskAccountNumbers")]
        public bool DeleteOnlineBankingUsersMaskAccountNumbers
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }


        [SettingKey("Omega.Features.DeleteOnlineBankingUsersInitialDaysAgoToList")]
        public int DeleteOnlineBankingUsersInitialDaysAgoToList
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }


        [SettingKey("Omega.Features.DeleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers")]
        public bool DeleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }


        [SettingKey("Omega.Features.ConfigurationComparisonEnabled")]
        public bool ConfigurationComparisonEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.AuditLogExportTool.Enabled")]
        public bool AuditLogExportToolEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.DeleteBillPayUsers.Enabled")]
        public bool DeleteBillPayUsersEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.AuditLogExportTool.RemoteLoggingVendor")]
        public RemoteLoggingVendorType AuditLogExportRemoteLoggingVendor
        {
            get
            {
                Enum.TryParse(GetValue(), true, out RemoteLoggingVendorType result);
                return result;
            }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.PermissionGroups.Enabled")]
        public bool PermissionGroupsEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Omega.Features.AtmBranchLocations.Enabled")]
        public bool AtmBranchLocationsEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("X.App.HBBOL.VerafinLoggingDir")]
        public string VerafinAuditLogExportToolOutputDirectory
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("X.App.HBBOL.VerafinCustomerId")]
        public string VerafinCustomerId
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("X.App.HBBOL.HostType")]
        public string HostType
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public AccountNumberAssociation AccountNumberAssociation
        {
            get => _accountNumberAssociation ?? (_accountNumberAssociation = new AccountNumberAssociation(SettingsBase));
            set => _accountNumberAssociation = value;
        }

        //[SettingKey("Omega.Features.XAppConfigPermissionLevel")]
        //public PermissionLevel PermissionLevelXAppConfigEnabled
        //{
        //    get { return Enum.IsDefined(typeof(PermissionLevel), GetValue()) ? (PermissionLevel)Enum.Parse(typeof(PermissionLevel), GetValue()) : (PermissionLevel)Enum.Parse(typeof(PermissionLevel), "Basic"); }
        //    set { SetValue(value); }
        //}

        //[SettingKey("Omega.Features.StringResourcesPermissionLevel")]
        //public PermissionLevel StringResourcesPermissionLevel
        //{
        //    get { return Enum.IsDefined(typeof(PermissionLevel), GetValue()) ? (PermissionLevel)Enum.Parse(typeof(PermissionLevel), GetValue()) : (PermissionLevel)Enum.Parse(typeof(PermissionLevel), "Basic"); }
        //    set { SetValue(value); }
        //}

        //[SettingKey("Omega.Features.ApplicationConfigPermissionLevel")]
        //public PermissionLevel ApplicationConfigPermissionLevel
        //{
        //    get { return Enum.IsDefined(typeof(PermissionLevel), GetValue()) ? (PermissionLevel)Enum.Parse(typeof(PermissionLevel), GetValue()) : (PermissionLevel)Enum.Parse(typeof(PermissionLevel), "Basic"); }
        //    set { SetValue(value); }
        //}

        //[SettingKey("Omega.Features.AddNewUserPermissionLevel")]
        //public PermissionLevel AddNewUserPermissionLevel
        //{
        //    get { return Enum.IsDefined(typeof(PermissionLevel), GetValue()) ? (PermissionLevel)Enum.Parse(typeof(PermissionLevel), GetValue()) : (PermissionLevel)Enum.Parse(typeof(PermissionLevel), "Basic"); }
        //    set { SetValue(value); }
        //}

        //[SettingKey("Omega.Features.EditUserPermissionsPermissionLevel")]
        //public PermissionLevel EditUserPermissionsPermissionLevel
        //{
        //    get { return Enum.IsDefined(typeof(PermissionLevel), GetValue()) ? (PermissionLevel)Enum.Parse(typeof(PermissionLevel), GetValue()) : (PermissionLevel)Enum.Parse(typeof(PermissionLevel), "Basic"); }
        //    set { SetValue(value); }
        //}

        //[SettingKey("Omega.Features.LayeredSecurityPermissionLevel")]
        //public PermissionLevel LayeredSecurityPermissionLevel
        //{
        //    get { return Enum.IsDefined(typeof(PermissionLevel), GetValue()) ? (PermissionLevel)Enum.Parse(typeof(PermissionLevel), GetValue()) : (PermissionLevel)Enum.Parse(typeof(PermissionLevel), "Basic"); }
        //    set { SetValue(value); }
        //}
    }
}