namespace Psi.Data.Models.ClientConfigurationModels.Google
{
    public class GoogleTags : SettingsBaseHelper
    {


        public GoogleTags(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("GoogleTags.GoogleTagManagerEnabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("GoogleTags.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

    }
}
