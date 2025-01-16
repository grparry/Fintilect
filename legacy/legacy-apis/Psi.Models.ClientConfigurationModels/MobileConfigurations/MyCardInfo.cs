namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class MyCardInfo : SettingsBaseHelper
    {

        public MyCardInfo(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.MyCardInfo.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.MyCardInfo.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.MyCardInfo.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.MyCardInfo.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
