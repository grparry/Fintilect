namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.ChangeUserInformation
{
	public class ResetPassword : SettingsBaseHelper
    {
	    public ResetPassword(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Settings.ResetPassword.MinimumVersion")]
        public string MinimumVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ResetPassword.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ResetPassword.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ResetPassword.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Settings.ResetPassword.IsUsernameRequired")]
        public bool IsUsernameRequired
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
