namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class Rates : SettingsBaseHelper
    {
        public Rates(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// mobile rates enabled
        /// </summary>
        [SettingKey("Mobile.Rates.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Url to the rates web view page for mobile devices
        /// </summary>
        [SettingKey("Mobile.Rates.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
