using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.ChangeUserInformation
{
    public class ChangeAddress : SettingsBaseHelper

    {
        private Authentication.Authentication _authentication;

        public ChangeAddress(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Settings.ChangeAddress.MinimumVersion")]
        public string MinimumVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangeAddress.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangeAddress.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangeAddress.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangeAddress.MaximumAddressLineLength")]
        public int MaximumAddressLineLength
        {
            get => GetIntValue(defaultValue: 26);
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangeAddress.ForeignAddress.Enabled")]
        public bool ForeignAddressEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new Authentication.Authentication(new Guid("8D7ADAF8-BD36-4520-B52C-BBEA668B4618")));
            set => _authentication = value;
        }
    }
}
