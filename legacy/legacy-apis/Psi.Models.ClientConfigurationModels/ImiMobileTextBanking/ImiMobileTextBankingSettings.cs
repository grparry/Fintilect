namespace Psi.Data.Models.ClientConfigurationModels.ImiMobileTextBanking
{
    public class ImiMobileTextBankingSettings : SettingsBaseHelper
    {
        public ImiMobileTextBankingSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("TextBanking.ImiMobile.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("TextBanking.ImiMobile.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("TextBanking.ImiMobile.MaxRecordsToReturn")]
        public int MaxRecordsToReturn
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("TextBanking.ImiMobile.HistoryDays")]
        public int HistoryDays
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("TextBanking.ImiMobile.MaxSendSize")]
        public int MaxSendSize
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}
