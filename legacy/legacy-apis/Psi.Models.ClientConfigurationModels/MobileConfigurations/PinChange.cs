namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class PinChange : SettingsBaseHelper
    {
        public PinChange(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.PinChange.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.PinChange.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.PinChange.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.PinChange.ShouldLoadWhenCardListLoads")]
        public bool ShouldLoadWhenCardListLoads
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
