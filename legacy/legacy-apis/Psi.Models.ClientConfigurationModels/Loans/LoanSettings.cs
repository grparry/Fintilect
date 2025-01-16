using System;
using System.Collections.Generic;
using System.Linq;
using Psi.Data.Models.ClientConfigurationModels.LoanSSO;

namespace Psi.Data.Models.ClientConfigurationModels.Loans
{
	public class LoanSettings : SettingsBaseHelper
	{
        private HarlandLoanEngine _harlandLoanEngine;
       

        public LoanSettings(ISettingsBase settingsBase) : base(settingsBase)
		{
		}

        /// <summary>get an instance of the HarlandLoanEngine</summary>
        public HarlandLoanEngine HarlandLoanEngine
        {
            get { return _harlandLoanEngine ?? (_harlandLoanEngine = new HarlandLoanEngine(SettingsBase)); }
            set { _harlandLoanEngine = value; }
        }


        [SettingKey("Loans.Payoff.ShowPayoffAmountForTheseCollateralCodes")]
		public List<string> ShowPayoffAmountForTheseCollateralCodes
		{
			get { return (GetValue() ?? string.Empty).Split(',').ToList(); }
			set { SetValue(string.Join(",", value)); }
		}


		[SettingKey("Loans.Payments.DisplayLateCharges")]
		public bool DisplayLateCharges
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

	    [SettingKey("Loans.Payments.DisplayTotalAmountBilled")]
	    public bool DisplayTotalAmountBilled
        {
	        get { return GetBoolValue(); }
	        set { SetValue(value); }
	    }
	    [SettingKey("Loans.Payments.Loans.Payments.TotalAmountBilledCategory")]
	    public string TotalAmountBilledCategory
        {
	        get { return GetValue(); }
	        set { SetValue(value); }
	    }

        [SettingKey("Loans.Payments.DisplayPaymentRemaining")]
		public bool DisplayPaymentRemaining
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

		[SettingKey("Loans.Payments.DisplayRequiredToPayLateCharges")]
		public bool DisplayRequiredToPayLateCharges
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

		[SettingKey("Loans.Payments.HighlightPastDueLoanRowInfo")]
		public bool HighlightPastDueLoanRowInfo
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

		[SettingKey("Loans.CreditCards.AbilityToOverrideCreditCardTransferDescriptionEnabled")]
		public bool AbilityToOverrideCreditCardTransferDescriptionEnabled
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}
	}
}
