namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class PinEncryption : SettingsBaseHelper
    {
        public PinEncryption(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("Mobile.PinEncryption.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("Mobile.PinEncryption.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
        
    }
}
