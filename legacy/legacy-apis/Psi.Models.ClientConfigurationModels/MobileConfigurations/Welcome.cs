namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class Welcome : SettingsBaseHelper
    {
	    public Welcome(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Welcome.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Welcome.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Welcome.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Welcome.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Welcome.TokensEnabled")]
        public bool TokensEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Welcome.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
	}
}
