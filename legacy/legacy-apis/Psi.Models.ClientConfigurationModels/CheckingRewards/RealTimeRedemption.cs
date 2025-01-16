namespace Psi.Data.Models.ClientConfigurationModels.CheckingRewards
{
    public class RealTimeRedemption:SettingsBaseHelper
    {
        public RealTimeRedemption(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("CheckingRewards.Redemption.RealTime.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("CheckingRewards.Redemption.RealTime.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckingRewards.Redemption.RealTime.GeneralLedgerAccountNumber")]
        public string GeneralLedgerAccountNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckingRewards.Redemption.RealTime.GeneralLedgerTransactionDescription")]
        public string GeneralLedgerTransactionDescription
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
