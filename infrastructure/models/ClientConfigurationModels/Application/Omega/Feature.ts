import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { RemoteLoggingVendorType } from '../RemoteLoggingVendorType';
import { AccountNumberAssociation } from '../AccountNumberAssociation';
export interface FeatureConfig {
    RemoveBillSubscribersEnabled: boolean;
    XAppConfigEnabled: boolean;
    StringResourcesEnabled: boolean;
    ApplicationConfigEnabled: boolean;
    AddNewUserEnabled: boolean;
    EditUserPermissionsEnabled: boolean;
    VersionManagementEnabled: boolean;
    QRCodeGeneratorEnabled: boolean;
    LayeredSecurityEnabled: boolean;
    FeaturesManagerEnabled: boolean;
    LicenseManagerEnabled: boolean;
    CreditUnionContactInfoEnabled: boolean;
    OnlineBankingApiEnabled: boolean;
    LayeredSecurityMaximumRequiredMethods: number;
    LayeredSecurityExcludePasswordRule: boolean;
    EnableThirdPartySystemMessages: boolean;
    QuickAccessManagementEnabled: boolean;
    NewMobileFeaturesEnabled: boolean;
    DeleteOnlineBankingUsersEnabled: boolean;
    DeleteOnlineBankingUsersMaskAccountNumbers: boolean;
    DeleteOnlineBankingUsersInitialDaysAgoToList: number;
    DeleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers: boolean;
    ConfigurationComparisonEnabled: boolean;
    AuditLogExportToolEnabled: boolean;
    DeleteBillPayUsersEnabled: boolean;
    AuditLogExportRemoteLoggingVendor: RemoteLoggingVendorType;
    PermissionGroupsEnabled: boolean;
    AtmBranchLocationsEnabled: boolean;
    VerafinAuditLogExportToolOutputDirectory: string;
    VerafinCustomerId: string;
    HostType: string;
    AccountNumberAssociation: AccountNumberAssociation;
}

export class Feature implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Feature'
    };


            private _removeBillSubscribersEnabled: boolean;
            get removeBillSubscribersEnabled(): boolean {
                return this._removeBillSubscribersEnabled;
            }
            set removeBillSubscribersEnabled(value: boolean) {
                this._removeBillSubscribersEnabled = value;
            }

            private _xAppConfigEnabled: boolean;
            get xAppConfigEnabled(): boolean {
                return this._xAppConfigEnabled;
            }
            set xAppConfigEnabled(value: boolean) {
                this._xAppConfigEnabled = value;
            }

            private _stringResourcesEnabled: boolean;
            get stringResourcesEnabled(): boolean {
                return this._stringResourcesEnabled;
            }
            set stringResourcesEnabled(value: boolean) {
                this._stringResourcesEnabled = value;
            }

            private _applicationConfigEnabled: boolean;
            get applicationConfigEnabled(): boolean {
                return this._applicationConfigEnabled;
            }
            set applicationConfigEnabled(value: boolean) {
                this._applicationConfigEnabled = value;
            }

            private _addNewUserEnabled: boolean;
            get addNewUserEnabled(): boolean {
                return this._addNewUserEnabled;
            }
            set addNewUserEnabled(value: boolean) {
                this._addNewUserEnabled = value;
            }

            private _editUserPermissionsEnabled: boolean;
            get editUserPermissionsEnabled(): boolean {
                return this._editUserPermissionsEnabled;
            }
            set editUserPermissionsEnabled(value: boolean) {
                this._editUserPermissionsEnabled = value;
            }

            private _versionManagementEnabled: boolean;
            get versionManagementEnabled(): boolean {
                return this._versionManagementEnabled;
            }
            set versionManagementEnabled(value: boolean) {
                this._versionManagementEnabled = value;
            }

            private _qRCodeGeneratorEnabled: boolean;
            get qRCodeGeneratorEnabled(): boolean {
                return this._qRCodeGeneratorEnabled;
            }
            set qRCodeGeneratorEnabled(value: boolean) {
                this._qRCodeGeneratorEnabled = value;
            }

            private _layeredSecurityEnabled: boolean;
            get layeredSecurityEnabled(): boolean {
                return this._layeredSecurityEnabled;
            }
            set layeredSecurityEnabled(value: boolean) {
                this._layeredSecurityEnabled = value;
            }

            private _featuresManagerEnabled: boolean;
            get featuresManagerEnabled(): boolean {
                return this._featuresManagerEnabled;
            }
            set featuresManagerEnabled(value: boolean) {
                this._featuresManagerEnabled = value;
            }

            private _licenseManagerEnabled: boolean;
            get licenseManagerEnabled(): boolean {
                return this._licenseManagerEnabled;
            }
            set licenseManagerEnabled(value: boolean) {
                this._licenseManagerEnabled = value;
            }

            private _creditUnionContactInfoEnabled: boolean;
            get creditUnionContactInfoEnabled(): boolean {
                return this._creditUnionContactInfoEnabled;
            }
            set creditUnionContactInfoEnabled(value: boolean) {
                this._creditUnionContactInfoEnabled = value;
            }

            private _onlineBankingApiEnabled: boolean;
            get onlineBankingApiEnabled(): boolean {
                return this._onlineBankingApiEnabled;
            }
            set onlineBankingApiEnabled(value: boolean) {
                this._onlineBankingApiEnabled = value;
            }

            private _layeredSecurityMaximumRequiredMethods: number;
            get layeredSecurityMaximumRequiredMethods(): number {
                return this._layeredSecurityMaximumRequiredMethods;
            }
            set layeredSecurityMaximumRequiredMethods(value: number) {
                this._layeredSecurityMaximumRequiredMethods = value;
            }

            private _layeredSecurityExcludePasswordRule: boolean;
            get layeredSecurityExcludePasswordRule(): boolean {
                return this._layeredSecurityExcludePasswordRule;
            }
            set layeredSecurityExcludePasswordRule(value: boolean) {
                this._layeredSecurityExcludePasswordRule = value;
            }

            private _enableThirdPartySystemMessages: boolean;
            get enableThirdPartySystemMessages(): boolean {
                return this._enableThirdPartySystemMessages;
            }
            set enableThirdPartySystemMessages(value: boolean) {
                this._enableThirdPartySystemMessages = value;
            }

            private _quickAccessManagementEnabled: boolean;
            get quickAccessManagementEnabled(): boolean {
                return this._quickAccessManagementEnabled;
            }
            set quickAccessManagementEnabled(value: boolean) {
                this._quickAccessManagementEnabled = value;
            }

            private _newMobileFeaturesEnabled: boolean;
            get newMobileFeaturesEnabled(): boolean {
                return this._newMobileFeaturesEnabled;
            }
            set newMobileFeaturesEnabled(value: boolean) {
                this._newMobileFeaturesEnabled = value;
            }

            private _deleteOnlineBankingUsersEnabled: boolean;
            get deleteOnlineBankingUsersEnabled(): boolean {
                return this._deleteOnlineBankingUsersEnabled;
            }
            set deleteOnlineBankingUsersEnabled(value: boolean) {
                this._deleteOnlineBankingUsersEnabled = value;
            }

            private _deleteOnlineBankingUsersMaskAccountNumbers: boolean;
            get deleteOnlineBankingUsersMaskAccountNumbers(): boolean {
                return this._deleteOnlineBankingUsersMaskAccountNumbers;
            }
            set deleteOnlineBankingUsersMaskAccountNumbers(value: boolean) {
                this._deleteOnlineBankingUsersMaskAccountNumbers = value;
            }

            private _deleteOnlineBankingUsersInitialDaysAgoToList: number;
            get deleteOnlineBankingUsersInitialDaysAgoToList(): number {
                return this._deleteOnlineBankingUsersInitialDaysAgoToList;
            }
            set deleteOnlineBankingUsersInitialDaysAgoToList(value: number) {
                this._deleteOnlineBankingUsersInitialDaysAgoToList = value;
            }

            private _deleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers: boolean;
            get deleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers(): boolean {
                return this._deleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers;
            }
            set deleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers(value: boolean) {
                this._deleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers = value;
            }

            private _configurationComparisonEnabled: boolean;
            get configurationComparisonEnabled(): boolean {
                return this._configurationComparisonEnabled;
            }
            set configurationComparisonEnabled(value: boolean) {
                this._configurationComparisonEnabled = value;
            }

            private _auditLogExportToolEnabled: boolean;
            get auditLogExportToolEnabled(): boolean {
                return this._auditLogExportToolEnabled;
            }
            set auditLogExportToolEnabled(value: boolean) {
                this._auditLogExportToolEnabled = value;
            }

            private _deleteBillPayUsersEnabled: boolean;
            get deleteBillPayUsersEnabled(): boolean {
                return this._deleteBillPayUsersEnabled;
            }
            set deleteBillPayUsersEnabled(value: boolean) {
                this._deleteBillPayUsersEnabled = value;
            }

            private _auditLogExportRemoteLoggingVendor: RemoteLoggingVendorType;
            get auditLogExportRemoteLoggingVendor(): RemoteLoggingVendorType {
                return this._auditLogExportRemoteLoggingVendor;
            }
            set auditLogExportRemoteLoggingVendor(value: RemoteLoggingVendorType) {
                this._auditLogExportRemoteLoggingVendor = value;
            }

            private _permissionGroupsEnabled: boolean;
            get permissionGroupsEnabled(): boolean {
                return this._permissionGroupsEnabled;
            }
            set permissionGroupsEnabled(value: boolean) {
                this._permissionGroupsEnabled = value;
            }

            private _atmBranchLocationsEnabled: boolean;
            get atmBranchLocationsEnabled(): boolean {
                return this._atmBranchLocationsEnabled;
            }
            set atmBranchLocationsEnabled(value: boolean) {
                this._atmBranchLocationsEnabled = value;
            }

            private _verafinAuditLogExportToolOutputDirectory: string;
            get verafinAuditLogExportToolOutputDirectory(): string {
                return this._verafinAuditLogExportToolOutputDirectory;
            }
            set verafinAuditLogExportToolOutputDirectory(value: string) {
                this._verafinAuditLogExportToolOutputDirectory = value;
            }

            private _verafinCustomerId: string;
            get verafinCustomerId(): string {
                return this._verafinCustomerId;
            }
            set verafinCustomerId(value: string) {
                this._verafinCustomerId = value;
            }

            private _hostType: string;
            get hostType(): string {
                return this._hostType;
            }
            set hostType(value: string) {
                this._hostType = value;
            }

            private _accountNumberAssociation: AccountNumberAssociation;
            get accountNumberAssociation(): AccountNumberAssociation {
                return this._accountNumberAssociation;
            }
            set accountNumberAssociation(value: AccountNumberAssociation) {
                this._accountNumberAssociation = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Feature.RemoveBillSubscribersEnabled", value: this._removeBillSubscribersEnabled, dataType: 'boolean', label: "Remove Bill Subscribers Enabled" },
                { key: "Feature.XAppConfigEnabled", value: this._xAppConfigEnabled, dataType: 'boolean', label: "X App Config Enabled" },
                { key: "Feature.StringResourcesEnabled", value: this._stringResourcesEnabled, dataType: 'boolean', label: "String Resources Enabled" },
                { key: "Feature.ApplicationConfigEnabled", value: this._applicationConfigEnabled, dataType: 'boolean', label: "Application Config Enabled" },
                { key: "Feature.AddNewUserEnabled", value: this._addNewUserEnabled, dataType: 'boolean', label: "Add New User Enabled" },
                { key: "Feature.EditUserPermissionsEnabled", value: this._editUserPermissionsEnabled, dataType: 'boolean', label: "Edit User Permissions Enabled" },
                { key: "Feature.VersionManagementEnabled", value: this._versionManagementEnabled, dataType: 'boolean', label: "Version Management Enabled" },
                { key: "Feature.QRCodeGeneratorEnabled", value: this._qRCodeGeneratorEnabled, dataType: 'boolean', label: "Q R Code Generator Enabled" },
                { key: "Feature.LayeredSecurityEnabled", value: this._layeredSecurityEnabled, dataType: 'boolean', label: "Layered Security Enabled" },
                { key: "Feature.FeaturesManagerEnabled", value: this._featuresManagerEnabled, dataType: 'boolean', label: "Features Manager Enabled" },
                { key: "Feature.LicenseManagerEnabled", value: this._licenseManagerEnabled, dataType: 'boolean', label: "License Manager Enabled" },
                { key: "Feature.CreditUnionContactInfoEnabled", value: this._creditUnionContactInfoEnabled, dataType: 'boolean', label: "Credit Union Contact Info Enabled" },
                { key: "Feature.OnlineBankingApiEnabled", value: this._onlineBankingApiEnabled, dataType: 'boolean', label: "Online Banking Api Enabled" },
                { key: "Feature.LayeredSecurityMaximumRequiredMethods", value: this._layeredSecurityMaximumRequiredMethods, dataType: 'number', label: "Layered Security Maximum Required Methods" },
                { key: "Feature.LayeredSecurityExcludePasswordRule", value: this._layeredSecurityExcludePasswordRule, dataType: 'boolean', label: "Layered Security Exclude Password Rule" },
                { key: "Feature.EnableThirdPartySystemMessages", value: this._enableThirdPartySystemMessages, dataType: 'boolean', label: "Enable Third Party System Messages" },
                { key: "Feature.QuickAccessManagementEnabled", value: this._quickAccessManagementEnabled, dataType: 'boolean', label: "Quick Access Management Enabled" },
                { key: "Feature.NewMobileFeaturesEnabled", value: this._newMobileFeaturesEnabled, dataType: 'boolean', label: "New Mobile Features Enabled" },
                { key: "Feature.DeleteOnlineBankingUsersEnabled", value: this._deleteOnlineBankingUsersEnabled, dataType: 'boolean', label: "Delete Online Banking Users Enabled" },
                { key: "Feature.DeleteOnlineBankingUsersMaskAccountNumbers", value: this._deleteOnlineBankingUsersMaskAccountNumbers, dataType: 'boolean', label: "Delete Online Banking Users Mask Account Numbers" },
                { key: "Feature.DeleteOnlineBankingUsersInitialDaysAgoToList", value: this._deleteOnlineBankingUsersInitialDaysAgoToList, dataType: 'number', label: "Delete Online Banking Users Initial Days Ago To List" },
                { key: "Feature.DeleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers", value: this._deleteOnlineBankingUsersAllowCsvExportPriorToDeletingUsers, dataType: 'boolean', label: "Delete Online Banking Users Allow Csv Export Prior To Deleting Users" },
                { key: "Feature.ConfigurationComparisonEnabled", value: this._configurationComparisonEnabled, dataType: 'boolean', label: "Configuration Comparison Enabled" },
                { key: "Feature.AuditLogExportToolEnabled", value: this._auditLogExportToolEnabled, dataType: 'boolean', label: "Audit Log Export Tool Enabled" },
                { key: "Feature.DeleteBillPayUsersEnabled", value: this._deleteBillPayUsersEnabled, dataType: 'boolean', label: "Delete Bill Pay Users Enabled" },
                { key: "Feature.AuditLogExportRemoteLoggingVendor", value: this._auditLogExportRemoteLoggingVendor, dataType: 'remoteloggingvendortype', label: "Audit Log Export Remote Logging Vendor" },
                { key: "Feature.PermissionGroupsEnabled", value: this._permissionGroupsEnabled, dataType: 'boolean', label: "Permission Groups Enabled" },
                { key: "Feature.AtmBranchLocationsEnabled", value: this._atmBranchLocationsEnabled, dataType: 'boolean', label: "Atm Branch Locations Enabled" },
                { key: "Feature.VerafinAuditLogExportToolOutputDirectory", value: this._verafinAuditLogExportToolOutputDirectory, dataType: 'string', label: "Verafin Audit Log Export Tool Output Directory" },
                { key: "Feature.VerafinCustomerId", value: this._verafinCustomerId, dataType: 'string', label: "Verafin Customer Id" },
                { key: "Feature.HostType", value: this._hostType, dataType: 'string', label: "Host Type" },
                { key: "Feature.AccountNumberAssociation", value: this._accountNumberAssociation, dataType: 'accountnumberassociation', label: "Account Number Association" },
            ];
        }

}