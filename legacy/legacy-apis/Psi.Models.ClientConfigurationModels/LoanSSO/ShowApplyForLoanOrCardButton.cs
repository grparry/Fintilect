namespace Psi.Data.Models.ClientConfigurationModels.LoanSSO
{
    public class ShowApplyForLoanOrCardButton : SettingsBaseHelper
    {
        public ShowApplyForLoanOrCardButton(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("loanSso.ShowApplyForLoanOrCardButtonOnSummary")]
        public bool ShowApplyForLoanOrCardButtonOnSummary
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("loanSso.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}
