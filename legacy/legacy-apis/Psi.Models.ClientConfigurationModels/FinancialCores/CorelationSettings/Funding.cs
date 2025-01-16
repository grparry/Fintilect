namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class Funding : SettingsBaseHelper
    {
        public Funding(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinancialCore.Corelation.Funding.Enabled")]
        public bool FundingIsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.Funding.FromMemberAccountNumber")]
        public string FromMemberAccountNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.Funding.FromAccountNumber")]
        public string FromAccountNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.Funding.Description")]
        public string Description
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}