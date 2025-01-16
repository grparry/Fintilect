namespace Psi.Data.Models.ClientConfigurationModels.AtmLocator
{
    public class AtmLocator : SettingsBaseHelper
    {
        public AtmLocator(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("AtmLocator.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AtmLocator.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AtmLocator.MinIosVersion")]
        public string MinIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AtmLocator.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}