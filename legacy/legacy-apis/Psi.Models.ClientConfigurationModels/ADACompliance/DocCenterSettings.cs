namespace Psi.Data.Models.ClientConfigurationModels.ADACompliance
{
    public class DocCenterSettings : SettingsBaseHelper
    {

        public DocCenterSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("DocCenter.Admin.SSO.Enabled")]
        public bool SSOFromAdminEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("DocCenter.Admin.SSO.DocCenterSSOLandingUrl")]
        public string SSOFromAdminDocCenterLanding
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("DocCenter.OnlineBanking.MemberView.IsEnabled")]
        public bool MemberViewIsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("DocCenter.OnlineBanking.MemberView.Url")]
        public string MemberViewUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("DocCenter.OnlineBanking.SsoId")]
        public string OlbSsoId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("DocCenter.OnlineBanking.SsoPassword")]
        public string OlbSsoPassword
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("DocCenter.Api.Url")]
        public string ApiUrl
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}