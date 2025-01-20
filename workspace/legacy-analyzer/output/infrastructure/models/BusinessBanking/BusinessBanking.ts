// Generated imports
import { SubUserAvailableFeatures } from '../SubUserAvailableFeatures';

export interface BusinessBanking {
    /** @settingKey BusinessBanking.AccountSelector.Enabled */
    accountSelectorEnabled: boolean;
    /** @settingKey BusinessBanking.ShouldBlockLoginForMasterUsers */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// When this setting is true, any user who's x_pwd record has IsLoginAllowed = false, will be blocked from logging in to online
     * /// /// banking, mobile banking, and OFX.
     * /// /// </summary>
     * /// </summary>
     */
    shouldBlockLoginForMasterUsers: boolean;
    /** @settingKey BusinessBanking.Admin.ShouldDisableUpdateUserInfoForMasterUsers */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// When this setting is true, any user who's x_pwd record has IsLoginAllowed = false, will have edit username, reset password
     * /// /// and many other features disabled in the admin tool.
     * /// /// </summary>
     * /// </summary>
     */
    shouldDisableUpdateUserInfoForMasterUsers: boolean;
    /** @settingKey BusinessBanking.SubUsersCanEditContactInfo */
    subUsersCanEditContactInfo: boolean;
    /** @settingKey BusinessBanking.DeleteSubUsers.Enabled */
    deleteSubUsersEnabled: boolean;
    /** @settingKey BusinessBanking.HideDisabledSubUsers.Enabled */
    hideDisabledSubUsersEnabled: boolean;
    /** @settingKey BusinessBanking.ShouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDisabled */
    shouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted: boolean;
    /** @settingKey BusinessBanking.AddSubUser.AddressAndPhoneNumberRequired */
    addSubUserAddressAndPhoneNumberRequired: boolean;
    /** @settingKey BusinessBanking.AddSubUser.CreateSubUserOnCore.Enabled */
    createSubUserOnCoreEnabled: boolean;
    /** @settingKey BusinessBanking.FilterAvailableFeatures.Enabled */
    filterAvailableFeaturesEnabled: boolean;
    /** @settingKey BusinessBanking.SubUser.AvailableFeatures */
    dictionary: SubUserAvailableFeatures;
    /** @settingKey BusinessBanking.SubUser.ShouldSetDisclosureAcceptanceOnCore */
    shouldSetDisclosureAcceptanceOnCore: boolean;
    /** @settingKey BusinessBanking.SubUser.ShouldAcceptDisclosureWhenCreated */
    shouldAcceptDisclosureWhenCreated: boolean;
    /** @settingKey BusinessBanking.SubUser.ShouldUseMasterAccountForMobileDeposit */
    shouldUseMasterAccountForMobileDeposit: boolean;
    /** @settingKey BusinessBanking.SubUser.EnableDailyLoginRestrictions */
    enableDailyLoginRestrictions: boolean;
}
