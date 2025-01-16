namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class VersionManagement : SettingsBaseHelper
    {
        public VersionManagement(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.VersionManagement.EnableDeprecationMessages")]
        public bool EnableDeprecationMessages
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

    }
}
