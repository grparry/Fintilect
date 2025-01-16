namespace Psi.Data.Models.ClientConfigurationModels.PaydayLoans
{
    public class AdvancePay : SettingsBaseHelper
    {
        public AdvancePay(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("PaydayLoans.AdvancePay.DatabaseConnectionString")]
        public string DatabaseConnectionString
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
