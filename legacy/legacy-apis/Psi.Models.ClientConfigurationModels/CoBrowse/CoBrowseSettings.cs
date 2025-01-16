namespace Psi.Data.Models.ClientConfigurationModels.CoBrowse
{
    public class CoBrowseSettings : SettingsBaseHelper
    {
        public CoBrowseSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If true, enable co-browsing features
        /// </summary>
        [SettingKey("CoBrowse.CoBrowseEnabled")]
        public bool CoBrowseEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Minimum app version needed to enable this feature
        /// </summary>
        [SettingKey("CoBrowse.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Value for the javascript tag's 'src' attribute
        /// </summary>
        [SettingKey("CoBrowse.JavascriptSourceUrl")]
        public string JavascriptSourceUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
