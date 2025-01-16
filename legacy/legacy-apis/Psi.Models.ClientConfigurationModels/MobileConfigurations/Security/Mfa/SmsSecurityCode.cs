namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.Mfa
{
    public class SmsSecurityCode : SettingsBaseHelper
    {
        public SmsSecurityCode(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Mfa.SmsSecurityCode.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Mfa.SmsSecurityCode.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Mfa.SmsSecurityCode.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}