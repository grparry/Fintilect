namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Loan.Calculators
{
	public class LoanCalculator : SettingsBaseHelper
	{
		private readonly ISettingsBase _settingsBase;
		private AutoLoan _autoLoan;

		public LoanCalculator(ISettingsBase settingsBase) : base(settingsBase)
		{
			_settingsBase = settingsBase;
		}

		public AutoLoan AutoLoan
		{
			get { return _autoLoan ?? (_autoLoan = new AutoLoan(_settingsBase)); }
			set { _autoLoan = value; }
		}
	}
}
