namespace Psi.Data.Models.ClientConfigurationModels.Estatements
{
    public class WebApiEstatementsSettings : SettingsBaseHelper
    {
        public WebApiEstatementsSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Estatements.WebApiEstatements.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.WebApiEstatements.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.WebApiEstatements.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.WebApiEstatements.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.WebApiEstatements.DisclosureEnabled")]
        public bool DisclosureEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}