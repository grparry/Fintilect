namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class MemberView : SettingsBaseHelper
    {
        public MemberView(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Admin.MemberView.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.MemberView.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.MemberView.LoginKeyExpiresInMinutes")]
        public int LoginKeyExpiresInMinutes
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.MemberView.SsoUrl")]
        public string SsoBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.MemberView.FullAccessEnabled")]
        public bool FullAccessEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.MemberView.ExternalSsoEnabled")]
        public bool ExternalSsoEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.MemberView.ExternalSsoIpWhitelist")]
        public string ExternalSsoIpWhitelist
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}