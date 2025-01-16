namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class SecureForms : SettingsBaseHelper
    {
        public SecureForms(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.SecureForms.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SecureForms.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SecureForms.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
