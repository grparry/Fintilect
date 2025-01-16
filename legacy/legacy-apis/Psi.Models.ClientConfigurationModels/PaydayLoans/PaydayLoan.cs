namespace Psi.Data.Models.ClientConfigurationModels.PaydayLoans
{
    public class PaydayLoan : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private AdvancePay _advancePay;

        public PaydayLoan(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public AdvancePay AdvancePay
        {
            get { return _advancePay ?? (_advancePay = new AdvancePay(_settingsBase)); }
            set { _advancePay = value; }
        }
    }
}