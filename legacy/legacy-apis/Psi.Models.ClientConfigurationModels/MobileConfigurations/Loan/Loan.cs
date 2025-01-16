using Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Loan.Applications;
using Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Loan.Calculators;
using Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Loan.Payments;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Loan
{
    public class Loan : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private LoanCalculator _calculator;
        private LoanApplication _application;
        private LoanPayment _payment;

        public Loan(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public LoanApplication Application
        {
            get { return _application ?? (_application = new LoanApplication(_settingsBase)); }
            set { _application = value; }
        }

        public LoanCalculator Calculator
        {
            get { return _calculator ?? (_calculator = new LoanCalculator(_settingsBase)); }
            set { _calculator = value; }
        }

        public LoanPayment Payment
        {
            get { return _payment ?? (_payment = new LoanPayment(_settingsBase)); }
            set { _payment = value; }
        }
    }
}
