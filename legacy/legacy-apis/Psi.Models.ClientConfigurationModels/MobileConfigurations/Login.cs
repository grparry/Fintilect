namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class Login : SettingsBaseHelper
    {
        public Login(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Login.UseAuthenticationStatusReasonCodeMinimumAndroidVersion")]
        public string UseAuthenticationStatusReasonCodeMinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Login.UseAuthenticationStatusReasonCodeMinimumIosVersion")]
        public string UseAuthenticationStatusReasonCodeMinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Login.EncryptedAuthenticationStatusReasonMinimumAndroidVersion")]
        public string EncryptedAuthenticationStatusReasonMinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Login.EncryptedAuthenticationStatusReasonMinimumIosVersion")]
        public string EncryptedAuthenticationStatusReasonMinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Login.ShouldQuickAccessLogSuccessfulLogin")]
        public bool ShouldQuickAccessLogSuccessfulLogin
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Login.IsUsernameClearTextOnLogin")]
        public bool IsUsernameClearTextOnLogin
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Login.ShouldShowAccountNumber")]
        public bool ShouldShowAccountNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Login.ShouldShowSecurityTipsLink")]
        public bool ShouldShowSecurityTipsLink
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Login.SecurityTipsLinkUrl")]
        public string SecurityTipsLinkUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// if true, then use 'Show' or 'Hide' as plain text instead of the eye-ball icon on the login view. default: False
        /// </summary>
        [SettingKey("Mobile.Login.UsePlainTextForShowHidePasswordToggle")]
        public bool ShouldUsePlainTextForShowHidePasswordToggle
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
