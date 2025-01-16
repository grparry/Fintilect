namespace Psi.Data.Models.ClientConfigurationModels.HomeBankingLogin
{
    public class UsernameSettings : SettingsBaseHelper
    {
        public UsernameSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Username.DailyAllowedChangeAttempts")]
        public int DailyAllowedChangeAttempts
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}