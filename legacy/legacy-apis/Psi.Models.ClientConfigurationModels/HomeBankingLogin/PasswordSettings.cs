
namespace Psi.Data.Models.ClientConfigurationModels.HomeBankingLogin
{
    public class PasswordSettings : SettingsBaseHelper
    {

        public PasswordSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Features.Login.Password.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("PasswordSettings.CanViewPasswordAsPlainTextAtLoginEnabled")]
        public bool CanViewPasswordAsPlainTextAtLoginEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("PasswordSettings.ShowForgotUserIdButtonOnInvalidLoginControlEnabled")]
        public bool ShowForgotUserIdButtonOnInvalidLoginControlEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// if true, then use 'Show' or 'Hide' as plain text instead of the eye-ball icon on the login page in the group-addon span. default: False
        /// </summary>
        [SettingKey("PasswordSettings.UsePlainTextForShowHidePasswordToggle")]
        public bool ShouldUsePlainTextForShowHidePasswordToggle
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

    }
}
