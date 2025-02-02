import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { TieredAccessFeature } from '../TieredAccessFeature';
export interface BusinessBankingConfig {
    AccountSelectorEnabled: boolean;
    ShouldBlockLoginForMasterUsers: boolean;
    ShouldDisableUpdateUserInfoForMasterUsers: boolean;
    SubUsersCanEditContactInfo: boolean;
    DeleteSubUsersEnabled: boolean;
    HideDisabledSubUsersEnabled: boolean;
    ShouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted: boolean;
    AddSubUserAddressAndPhoneNumberRequired: boolean;
    CreateSubUserOnCoreEnabled: boolean;
    FilterAvailableFeaturesEnabled: boolean;
    SubUserAvailableFeatures: Record<TieredAccessFeature, boolean>;
    ShouldSetDisclosureAcceptanceOnCore: boolean;
    ShouldAcceptDisclosureWhenCreated: boolean;
    ShouldUseMasterAccountForMobileDeposit: boolean;
    EnableDailyLoginRestrictions: boolean;
}

export class BusinessBanking implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BusinessBanking'
    };


            private _accountSelectorEnabled: boolean;
            get accountSelectorEnabled(): boolean {
                return this._accountSelectorEnabled;
            }
            set accountSelectorEnabled(value: boolean) {
                this._accountSelectorEnabled = value;
            }

            private _shouldBlockLoginForMasterUsers: boolean;
            get shouldBlockLoginForMasterUsers(): boolean {
                return this._shouldBlockLoginForMasterUsers;
            }
            set shouldBlockLoginForMasterUsers(value: boolean) {
                this._shouldBlockLoginForMasterUsers = value;
            }

            private _shouldDisableUpdateUserInfoForMasterUsers: boolean;
            get shouldDisableUpdateUserInfoForMasterUsers(): boolean {
                return this._shouldDisableUpdateUserInfoForMasterUsers;
            }
            set shouldDisableUpdateUserInfoForMasterUsers(value: boolean) {
                this._shouldDisableUpdateUserInfoForMasterUsers = value;
            }

            private _subUsersCanEditContactInfo: boolean;
            get subUsersCanEditContactInfo(): boolean {
                return this._subUsersCanEditContactInfo;
            }
            set subUsersCanEditContactInfo(value: boolean) {
                this._subUsersCanEditContactInfo = value;
            }

            private _deleteSubUsersEnabled: boolean;
            get deleteSubUsersEnabled(): boolean {
                return this._deleteSubUsersEnabled;
            }
            set deleteSubUsersEnabled(value: boolean) {
                this._deleteSubUsersEnabled = value;
            }

            private _hideDisabledSubUsersEnabled: boolean;
            get hideDisabledSubUsersEnabled(): boolean {
                return this._hideDisabledSubUsersEnabled;
            }
            set hideDisabledSubUsersEnabled(value: boolean) {
                this._hideDisabledSubUsersEnabled = value;
            }

            private _shouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted: boolean;
            get shouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted(): boolean {
                return this._shouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted;
            }
            set shouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted(value: boolean) {
                this._shouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted = value;
            }

            private _addSubUserAddressAndPhoneNumberRequired: boolean;
            get addSubUserAddressAndPhoneNumberRequired(): boolean {
                return this._addSubUserAddressAndPhoneNumberRequired;
            }
            set addSubUserAddressAndPhoneNumberRequired(value: boolean) {
                this._addSubUserAddressAndPhoneNumberRequired = value;
            }

            private _createSubUserOnCoreEnabled: boolean;
            get createSubUserOnCoreEnabled(): boolean {
                return this._createSubUserOnCoreEnabled;
            }
            set createSubUserOnCoreEnabled(value: boolean) {
                this._createSubUserOnCoreEnabled = value;
            }

            private _filterAvailableFeaturesEnabled: boolean;
            get filterAvailableFeaturesEnabled(): boolean {
                return this._filterAvailableFeaturesEnabled;
            }
            set filterAvailableFeaturesEnabled(value: boolean) {
                this._filterAvailableFeaturesEnabled = value;
            }

            private _subUserAvailableFeatures: Record<TieredAccessFeature, boolean>;
            get subUserAvailableFeatures(): Record<TieredAccessFeature, boolean> {
                return this._subUserAvailableFeatures;
            }
            set subUserAvailableFeatures(value: Record<TieredAccessFeature, boolean>) {
                this._subUserAvailableFeatures = value;
            }

            private _shouldSetDisclosureAcceptanceOnCore: boolean;
            get shouldSetDisclosureAcceptanceOnCore(): boolean {
                return this._shouldSetDisclosureAcceptanceOnCore;
            }
            set shouldSetDisclosureAcceptanceOnCore(value: boolean) {
                this._shouldSetDisclosureAcceptanceOnCore = value;
            }

            private _shouldAcceptDisclosureWhenCreated: boolean;
            get shouldAcceptDisclosureWhenCreated(): boolean {
                return this._shouldAcceptDisclosureWhenCreated;
            }
            set shouldAcceptDisclosureWhenCreated(value: boolean) {
                this._shouldAcceptDisclosureWhenCreated = value;
            }

            private _shouldUseMasterAccountForMobileDeposit: boolean;
            get shouldUseMasterAccountForMobileDeposit(): boolean {
                return this._shouldUseMasterAccountForMobileDeposit;
            }
            set shouldUseMasterAccountForMobileDeposit(value: boolean) {
                this._shouldUseMasterAccountForMobileDeposit = value;
            }

            private _enableDailyLoginRestrictions: boolean;
            get enableDailyLoginRestrictions(): boolean {
                return this._enableDailyLoginRestrictions;
            }
            set enableDailyLoginRestrictions(value: boolean) {
                this._enableDailyLoginRestrictions = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BusinessBanking.AccountSelectorEnabled", value: this._accountSelectorEnabled, dataType: 'boolean', label: "Account Selector Enabled" },
                { key: "BusinessBanking.ShouldBlockLoginForMasterUsers", value: this._shouldBlockLoginForMasterUsers, dataType: 'boolean', label: "Should Block Login For Master Users" },
                { key: "BusinessBanking.ShouldDisableUpdateUserInfoForMasterUsers", value: this._shouldDisableUpdateUserInfoForMasterUsers, dataType: 'boolean', label: "Should Disable Update User Info For Master Users" },
                { key: "BusinessBanking.SubUsersCanEditContactInfo", value: this._subUsersCanEditContactInfo, dataType: 'boolean', label: "Sub Users Can Edit Contact Info" },
                { key: "BusinessBanking.DeleteSubUsersEnabled", value: this._deleteSubUsersEnabled, dataType: 'boolean', label: "Delete Sub Users Enabled" },
                { key: "BusinessBanking.HideDisabledSubUsersEnabled", value: this._hideDisabledSubUsersEnabled, dataType: 'boolean', label: "Hide Disabled Sub Users Enabled" },
                { key: "BusinessBanking.ShouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted", value: this._shouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted, dataType: 'boolean', label: "Should Delete Sub User Devices And Alert Subscriptions When Sub User Is Deleted" },
                { key: "BusinessBanking.AddSubUserAddressAndPhoneNumberRequired", value: this._addSubUserAddressAndPhoneNumberRequired, dataType: 'boolean', label: "Add Sub User Address And Phone Number Required" },
                { key: "BusinessBanking.CreateSubUserOnCoreEnabled", value: this._createSubUserOnCoreEnabled, dataType: 'boolean', label: "Create Sub User On Core Enabled" },
                { key: "BusinessBanking.FilterAvailableFeaturesEnabled", value: this._filterAvailableFeaturesEnabled, dataType: 'boolean', label: "Filter Available Features Enabled" },
                { key: "BusinessBanking.SubUserAvailableFeatures", value: this._subUserAvailableFeatures, dataType: 'record<tieredaccessfeature, boolean>', label: "Sub User Available Features" },
                { key: "BusinessBanking.ShouldSetDisclosureAcceptanceOnCore", value: this._shouldSetDisclosureAcceptanceOnCore, dataType: 'boolean', label: "Should Set Disclosure Acceptance On Core" },
                { key: "BusinessBanking.ShouldAcceptDisclosureWhenCreated", value: this._shouldAcceptDisclosureWhenCreated, dataType: 'boolean', label: "Should Accept Disclosure When Created" },
                { key: "BusinessBanking.ShouldUseMasterAccountForMobileDeposit", value: this._shouldUseMasterAccountForMobileDeposit, dataType: 'boolean', label: "Should Use Master Account For Mobile Deposit" },
                { key: "BusinessBanking.EnableDailyLoginRestrictions", value: this._enableDailyLoginRestrictions, dataType: 'boolean', label: "Enable Daily Login Restrictions" },
            ];
        }

}