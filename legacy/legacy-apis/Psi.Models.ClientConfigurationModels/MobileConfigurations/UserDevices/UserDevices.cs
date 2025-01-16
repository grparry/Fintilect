namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.UserDevices
{
    public class UserDevices : SettingsBaseHelper
    {
        public UserDevices(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.UserDevices.EnableStaticSecurityCode")]
        public bool EnableStaticSecurityCode
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.UserDevices.StaticSecurityCodes")]
        public string[] StaticSecurityCodes
        {
            get { return GetArrayValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.UserDevices.ValidSecurityCodeCharacters")]
        public string ValidSecurityCodeCharacters
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("X.App.HomeBanking.MobileAppKeyLength")]
        public int AppKeyLength
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.UserDevices.ImplicitRegistrationEnabled")]
        public bool ImplicitRegistrationEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.UserDevices.ImplicitRegistrationMinIosVersion")]
        public string ImplicitRegistrationMinIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.UserDevices.ImplicitRegistrationMinAndroidVersion")]
        public string ImplicitRegistrationMinAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
