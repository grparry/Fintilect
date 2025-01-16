using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class DirectDeposit : SettingsBaseHelper
    {
        private Authentication.Authentication _authentication;

        public DirectDeposit(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.DirectDepositInformation.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.DirectDepositInformation.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.DirectDepositInformation.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.DirectDepositInformation.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.DirectDepositInformation.ShouldShowMenuItem")]
        public bool ShouldShowMenuItem
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new Authentication.Authentication(new Guid("86f092bb-a370-4be4-bee3-ec6f6b00ceba")));
            set => _authentication = value;
        }
    }
}