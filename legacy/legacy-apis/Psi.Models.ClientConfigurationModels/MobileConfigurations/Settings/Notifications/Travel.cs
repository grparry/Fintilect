namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.Notifications
{
    public class Travel : SettingsBaseHelper
    {
        public Travel(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Settings.Notifications.Travel.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Settings.Notifications.Travel.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Settings.Notifications.Travel.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Settings.Notifications.Travel.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Settings.Notifications.Travel.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
