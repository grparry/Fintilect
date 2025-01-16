namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class LossScreeningSettings : SettingsBaseHelper
    {
        public LossScreeningSettings(ISettingsBase settingsBase) : base(settingsBase) { }

        [SettingKey("FinancialCore.Corelation.LossScreening.LoanPastDueHoursOffset")]
        public int LoanPastDueHoursOffset
        {
            get => GetIntValue();
            set => SetValue(value);
        }
        [SettingKey("FinancialCore.Corelation.LossScreening.ShareAvailableAmountLessThenZeroPlusMiniumAmount")]
        public bool ShareAvailableAmountLessThenZeroPlusMiniumAmount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        [SettingKey("FinancialCore.Corelation.LossScreening.ShareAvailableAmountLessThenZero")]
        public bool ShareAvailableAmountLessThenZero
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        [SettingKey("FinancialCore.Corelation.LossScreening.LoanPastDue")]
        public bool LoanPastDue
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        [SettingKey("FinancialCore.Corelation.LossScreening.ShareHasChargeOfSerial")]
        public bool ShareHasChargeOfSerial
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        [SettingKey("FinancialCore.Corelation.LossScreening.LoanHasChargeOfSerial")]
        public bool LoanHasChargeOfSerial
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.LossScreening.BlockAccountAlertTypeSerials")]
        public string BlockAccountAlertTypeSerials
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}