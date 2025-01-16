using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.BusinessBanking
{
    public class BusinessBanking : SettingsBaseHelper
    {
        public BusinessBanking(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("BusinessBanking.AccountSelector.Enabled")]
        public bool AccountSelectorEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// When this setting is true, any user who's x_pwd record has IsLoginAllowed = false, will be blocked from logging in to online
        /// banking, mobile banking, and OFX.
        /// </summary>
        [SettingKey("BusinessBanking.ShouldBlockLoginForMasterUsers")]
        public bool ShouldBlockLoginForMasterUsers
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// When this setting is true, any user who's x_pwd record has IsLoginAllowed = false, will have edit username, reset password
        /// and many other features disabled in the admin tool.
        /// </summary>
        [SettingKey("BusinessBanking.Admin.ShouldDisableUpdateUserInfoForMasterUsers")]
        public bool ShouldDisableUpdateUserInfoForMasterUsers
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.SubUsersCanEditContactInfo")]
        public bool SubUsersCanEditContactInfo
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.DeleteSubUsers.Enabled")]
        public bool DeleteSubUsersEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.HideDisabledSubUsers.Enabled")]
        public bool HideDisabledSubUsersEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.ShouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDisabled")]
        public bool ShouldDeleteSubUserDevicesAndAlertSubscriptionsWhenSubUserIsDeleted
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.AddSubUser.AddressAndPhoneNumberRequired")]
        public bool AddSubUserAddressAndPhoneNumberRequired
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.AddSubUser.CreateSubUserOnCore.Enabled")]
        public bool CreateSubUserOnCoreEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.FilterAvailableFeatures.Enabled")]
        public bool FilterAvailableFeaturesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.SubUser.AvailableFeatures")]
        public Dictionary<TieredAccessFeature, bool> SubUserAvailableFeatures
        {
            get
            {
                var dictionary = GetJsonValueOrNull<Dictionary<TieredAccessFeature, bool>>();
                
                return dictionary;
            }
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.SubUser.ShouldSetDisclosureAcceptanceOnCore")]
        public bool ShouldSetDisclosureAcceptanceOnCore
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.SubUser.ShouldAcceptDisclosureWhenCreated")]
        public bool ShouldAcceptDisclosureWhenCreated
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.SubUser.ShouldUseMasterAccountForMobileDeposit")]
        public bool ShouldUseMasterAccountForMobileDeposit
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BusinessBanking.SubUser.EnableDailyLoginRestrictions")]
        public bool EnableDailyLoginRestrictions
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
