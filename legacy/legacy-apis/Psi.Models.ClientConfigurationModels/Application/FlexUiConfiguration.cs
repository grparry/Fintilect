namespace Psi.Data.Models.ClientConfigurationModels.Application
{
    public class FlexUiConfiguration : SettingsBaseHelper
    {
        public FlexUiConfiguration(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Application.Flex.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Application.Flex.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}