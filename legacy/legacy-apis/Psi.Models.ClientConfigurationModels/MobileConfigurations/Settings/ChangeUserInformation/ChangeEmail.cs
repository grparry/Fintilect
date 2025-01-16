using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.ChangeUserInformation
{
    public class ChangeEmail : SettingsBaseHelper

    {
        private Authentication.Authentication _authentication;

        public ChangeEmail(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Settings.ChangeEmail.MinimumVersion")]
        public string MinimumVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangeEmail.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangeEmail.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ChangeEmail.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EmailType")]
        public string EmailType
        {
            get => GetValue();
            set => SetValue(value);
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new Authentication.Authentication(new Guid("EC29CC9E-A42A-4896-9499-6905A80D9BBC")));
            set => _authentication = value;
        }
    }
}
