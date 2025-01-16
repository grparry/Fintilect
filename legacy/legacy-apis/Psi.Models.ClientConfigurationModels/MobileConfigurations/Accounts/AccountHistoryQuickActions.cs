namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Accounts
{
    public class AccountHistoryQuickActions : SettingsBaseHelper
    {
        public AccountHistoryQuickActions(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Accounts.AccountHistoryQuickActions")]
        public string QuickActions
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Accounts.AccountHistoryQuickActions.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Accounts.AccountHistoryQuickActions.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Accounts.AccountHistoryQuickActions.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
