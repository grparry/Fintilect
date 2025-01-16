namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class ForgotUsername : SettingsBaseHelper
    {

	    public ForgotUsername(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.ForgotUsername.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.ForgotUsername.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.ForgotUsername.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.ForgotUsername.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
	}
}
