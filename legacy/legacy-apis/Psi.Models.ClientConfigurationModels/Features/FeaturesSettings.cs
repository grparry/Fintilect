namespace Psi.Data.Models.ClientConfigurationModels.Features
{
    public class FeaturesSettings : SettingsBaseHelper
    {
        public FeaturesSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }


        [SettingKey("FeaturesSettings.EnableNewFeatures")]
        public bool EnableNewFeatures
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}


