namespace Psi.Data.Models.ClientConfigurationModels.InfoImageEstatements
{
    public class InfoImageEstatementsSettings : SettingsBaseHelper
    {
        public InfoImageEstatementsSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Estatements.InfoImage.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.InfoImage.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.InfoImage.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.InfoImage.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.InfoImage.Sso.ClientCodeId")]
        public string SsoClientCodeId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.InfoImage.Sso.Password")]
        public string SsoPassword
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.InfoImage.Sso.Url")]
        public string SsoUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.InfoImage.Sso.RedirectUrl")]
        public string SsoRedirectUrl
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
