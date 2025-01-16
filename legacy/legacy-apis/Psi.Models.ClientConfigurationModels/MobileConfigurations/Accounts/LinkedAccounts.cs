using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Accounts
{
    public class LinkedAccounts : SettingsBaseHelper
    {
        private Authentication.Authentication _authentication;

        public LinkedAccounts(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.LinkedAccounts.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LinkedAccounts.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LinkedAccounts.VerifyAccountEnabled")]
        public bool VerifyAccountEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AlphaNumSpace")]
        public string LinkedAccountNameRegex
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("LinkedAccounts.ShowDeletedAccounts.Enabled")]
        public bool ShowDeletedAccountsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new Authentication.Authentication(new Guid("F5E0DCD2-5991-4E1C-AD33-5DCD9E041F29")));
            set => _authentication = value;
        }
    }
}