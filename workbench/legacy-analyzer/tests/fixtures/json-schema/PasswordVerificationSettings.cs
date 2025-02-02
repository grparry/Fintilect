using System;

namespace Psi.Data.Models.ClientConfigurationModels.PasswordVerification
{
    public class PasswordVerificationSettings : SettingsBaseHelper
    {
        public PasswordVerificationSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// Whether the password reset functionality should prevent using social security numbers in passwords
        /// </summary>
        [SettingKey("PasswordVerification.PasswordResetCannotContainSSNumber")]
        public bool PasswordResetCannotContainSSNumber
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
