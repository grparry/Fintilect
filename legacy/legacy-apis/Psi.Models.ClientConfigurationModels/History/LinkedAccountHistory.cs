namespace Psi.Data.Models.ClientConfigurationModels.History
{
    public class LinkedAccountHistory : SettingsBaseHelper
    {
        public LinkedAccountHistory(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("AccountHistory.LinkedAccounts.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.LinkedAccounts.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.LinkedAccounts.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.LinkedAccounts.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.LinkedAccounts.MaximumRecordsToReturn")]
        public int MaximumRecordsToReturn
        {
            get
            {
                var result = GetIntValue();
                return result <= 0 ? 20 : result;
            }
            set => SetValue(value);
        }
    }
}