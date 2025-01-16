namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings
{
    public class TieredAccessAdmin : SettingsBaseHelper
    {
        public TieredAccessAdmin(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Settings.TieredAccessAdmin.LandingPageUrl")]
        public string LandingPageUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Settings.TieredAccessAdmin.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Settings.TieredAccessAdmin.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Settings.TieredAccessAdmin.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Settings.TieredAccessAdmin.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
