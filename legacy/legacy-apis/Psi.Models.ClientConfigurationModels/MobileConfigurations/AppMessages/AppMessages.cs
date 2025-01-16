namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class AppMessages : SettingsBaseHelper
    {
	    public AppMessages(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.AppMessages.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AppMessages.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AppMessages.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
