using System;

namespace Psi.Data.Models.ClientConfigurationModels.HomeBankingLogin
{
    public class PasswordSettings : SettingsBaseHelper
    {
        /// <summary>
        /// The minimum version required for password functionality
        /// </summary>
        [SettingKey("Features.Login.Password.MinVersion")]
        public double MinVersion { get; set; }

        /// <summary>
        /// Whether users can view their password as plain text at login
        /// </summary>
        [SettingKey("PasswordSettings.CanViewPasswordAsPlainTextAtLoginEnabled")]
        public bool CanViewPasswordAsPlainTextAtLoginEnabled { get; set; }

        /// <summary>
        /// Whether to show the forgot user ID button on the invalid login control
        /// </summary>
        [SettingKey("PasswordSettings.ShowForgotUserIdButtonOnInvalidLoginControlEnabled")]
        public bool ShowForgotUserIdButtonOnInvalidLoginControlEnabled { get; set; }

        /// <summary>
        /// If true, then use 'Show' or 'Hide' as plain text instead of the eye-ball icon on the login page in the group-addon span
        /// </summary>
        [SettingKey("PasswordSettings.UsePlainTextForShowHidePasswordToggle")]
        public bool ShouldUsePlainTextForShowHidePasswordToggle { get; set; }
    }
}
