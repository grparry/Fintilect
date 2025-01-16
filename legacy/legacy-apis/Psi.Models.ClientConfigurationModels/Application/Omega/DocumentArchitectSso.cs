namespace Psi.Data.Models.ClientConfigurationModels.Application.Omega
{
    public class DocumentArchitectSso : SettingsBaseHelper
    {
        public DocumentArchitectSso(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Omega.DocumentArchitectSso.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.DocumentArchitectSso.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.DocumentArchitectSso.BaseUrl")]
        public string BaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.DocumentArchitectSso.ShouldOpenInNewWindow")]
        public bool ShouldOpenInNewWindow
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.DocumentArchitectSso.HashKey")]
        public string HashKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.DocumentArchitectSso.AuthUrl")]
        public string AuthUrl
        {
            get => $"{BaseUrl}/{GetValue()?.TrimStart('/')}"; // auth/sso
            set => SetValue(value);
        }

        [SettingKey("Omega.DocumentArchitectSso.SsoUrl")]
        public string SsoUrl
        {
            get => $"{BaseUrl}/{GetValue()?.TrimStart('/')}"; // marketing
            set => SetValue(value);
        }

        [SettingKey("Omega.DocumentArchitectSso.ClientId")]
        public string ClientId
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}