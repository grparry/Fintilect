namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class PasswordEncryption : SettingsBaseHelper
    {
        public PasswordEncryption(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("Mobile.PasswordEncryption.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("Mobile.PasswordEncryption.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("Mobile.PasswordEncryption.MinimumServerVersion")]
        public double MinimumServerVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}
