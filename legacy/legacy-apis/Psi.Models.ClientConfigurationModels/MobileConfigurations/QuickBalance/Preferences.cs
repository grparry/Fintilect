namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.QuickBalance
{
	public class Preferences : SettingsBaseHelper
    {
        public Preferences(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.QuickBalance.Preferences.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.QuickBalance.Preferences.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.QuickBalance.Preferences.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.QuickBalance.Preferences.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
