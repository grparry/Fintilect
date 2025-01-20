// Generated imports
import { RemoteLoggingVendorType } from '../RemoteLoggingVendorType';
import { AccountNumberAssociation } from '../Application/Omega/AccountNumberAssociation';

export interface Feature {
    /** @settingKey Omega.Features.RemoveBillSubscribersEnabled */
    removeBillSubscribersEnabled: boolean;
    /** @settingKey Omega.Features.XAppConfigEnabled */
    xAppConfigEnabled: boolean;
    /** @settingKey Omega.Features.StringResourcesEnabled */
    stringResourcesEnabled: boolean;
    /** @settingKey Omega.Features.ApplicationConfigEnabled */
    applicationConfigEnabled: boolean;
    /** @settingKey Omega.Features.AddNewUserEnabled */
    addNewUserEnabled: boolean;
    /** @settingKey Omega.Features.EditUserPermissionsEnabled */
    editUserPermissionsEnabled: boolean;
    /** @settingKey Omega.Features.VersionManagementEnabled */
    versionManagementEnabled: boolean;
    /** @settingKey Omega.Features.QRCodeGeneratorEnabled */
    qRCodeGeneratorEnabled: boolean;
    /** @settingKey Omega.Features.LayeredSecurityEnabled */
    layeredSecurityEnabled: boolean;
    /** @settingKey Omega.Features.FeaturesManagerEnabled */
    featuresManagerEnabled: boolean;
    /** @settingKey Omega.Features.LicenseManagerEnabled */
    licenseManagerEnabled: boolean;
    /** @settingKey Omega.Features.CreditUnionContactInfoEnabled */
    creditUnionContactInfoEnabled: boolean;
    /** @settingKey Omega.Features.OnlineBankingApiEnabled */
    onlineBankingApiEnabled: boolean;
    /** @settingKey Omega.LayeredSecurity.MaximumRequiredMethods */
    layeredSecurityMaximumRequiredMethods: number;
    /** @settingKey Omega.LayeredSecurity.ExcludePasswordRule */
    layeredSecurityExcludePasswordRule: boolean;
    /** @settingKey Omega.Features.ThirdPartySystemMessages.Enabled */
    enableThirdPartySystemMessages: boolean;
    /** @settingKey Omega.Features.QuickAccessManagementEnabled */
    quickAccessManagementEnabled: boolean;
    /** @settingKey Omega.Features.NewMobileFeaturesEnabled */
    newMobileFeaturesEnabled: boolean;
    /** @settingKey Omega.Features.DeleteOnlineBankingUsersEnabled */
    deleteOnlineBankingUsersEnabled: boolean;
    /** @settingKey Omega.Features.DeleteOnlineBankingUsersMaskAccountNumbers */
    deleteOnlineBankingUsersMaskAccountNumbers: boolean;
    /** @settingKey Omega.Features.DeleteOnlineBankingUsersInitialDaysAgoToList */
    deleteOnlineBankingUsersInitialDaysAgoToList: number;
    /** @settingKey Omega.Features.DeleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers */
    deleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers: boolean;
    /** @settingKey Omega.Features.ConfigurationComparisonEnabled */
    configurationComparisonEnabled: boolean;
    /** @settingKey Omega.Features.AuditLogExportTool.Enabled */
    auditLogExportToolEnabled: boolean;
    /** @settingKey Omega.Features.DeleteBillPayUsers.Enabled */
    deleteBillPayUsersEnabled: boolean;
    /** @settingKey Omega.Features.AuditLogExportTool.RemoteLoggingVendor */
    remoteLoggingVendorType: RemoteLoggingVendorType;
    /** @settingKey Omega.Features.PermissionGroups.Enabled */
    permissionGroupsEnabled: boolean;
    /** @settingKey Omega.Features.AtmBranchLocations.Enabled */
    atmBranchLocationsEnabled: boolean;
    /** @settingKey X.App.HBBOL.VerafinLoggingDir */
    verafinAuditLogExportToolOutputDirectory: string;
    /** @settingKey X.App.HBBOL.VerafinCustomerId */
    verafinCustomerId: string;
    /** @settingKey X.App.HBBOL.HostType */
    hostType: string;
    accountNumberAssociation: AccountNumberAssociation;
}
