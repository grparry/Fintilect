namespace Psi.Data.Models.ClientConfigurationModels.LoanSSO
{
    public class HarlandLoanEngine : SettingsBaseHelper
    {
        public HarlandLoanEngine(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Loans.HarlandLoanEngineSsoEnabled")]
        public bool HarlandLoanEngineSsoEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Loans.HarlandLoanEngineSsoRequestUrl")]
        public string HarlandLoanEngineSsoRequestUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Loans.HarlandLoanEngineWidgetIdentifier")]
        public string HarlandLoanEngineWidgetIdentifier
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Loans.HarlandLoanEngineResponsiveWidgetIdentifier")]
        public string HarlandLoanEngineResponsiveWidgetIdentifier
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Loans.HarlandLoanEngineFinancialInstitutionIdentifier")]
        public string HarlandLoanEngineFinancialInstitutionIdentifier
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>If true, show menu items on iFramed page</summary>
        [SettingKey("Loans.HarlandLoanEngineShouldShowMenuItems")]
        public bool HarlandLoanEngineShouldShowMenuItems
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>If true, show the loan button on the Summary/Welcome page even if there are already other loans being displayed</summary>
        [SettingKey("Loans.HarlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans")]
        public bool HarlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
