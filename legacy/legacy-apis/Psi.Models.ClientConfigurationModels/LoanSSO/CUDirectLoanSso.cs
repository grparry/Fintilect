namespace Psi.Data.Models.ClientConfigurationModels.LoanSSO
{
    public class CUDirectLoanSso : SettingsBaseHelper
    {
        public CUDirectLoanSso(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("LoanSso.CUDirectLoanSso.OrganizationCode")]
        public string CUDirectLoanOrganizationCode
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
