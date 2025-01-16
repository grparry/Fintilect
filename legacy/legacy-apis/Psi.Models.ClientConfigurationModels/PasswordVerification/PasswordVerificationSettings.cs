namespace Psi.Data.Models.ClientConfigurationModels.PasswordVerification
{
    public class PasswordVerificationSettings : SettingsBaseHelper
    {
        public PasswordVerificationSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("PasswordVerification.PasswordResetCannotContainSSNumber")]
        public bool PasswordResetCannotContainSSNumber
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

    }
}
