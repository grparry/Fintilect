namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class Larky : SettingsBaseHelper
    {
        public Larky(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Larky.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Larky.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Larky.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Larky.ApiKey")]
        public string ApiKey
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}