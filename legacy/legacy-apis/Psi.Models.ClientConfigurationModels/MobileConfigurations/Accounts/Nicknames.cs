namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Accounts
{
    public class Nicknames : SettingsBaseHelper
    {
        public Nicknames(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Accounts.Nicknames.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Accounts.Nicknames.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Accounts.Nicknames.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
