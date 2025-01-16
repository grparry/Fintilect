using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Loan.Applications
{
	public class LoanApplication : SettingsBaseHelper
	{
		private Authentication.Authentication _authentication;

		public LoanApplication(ISettingsBase settingsBase) : base(settingsBase)
		{
        }

        [SettingKey("Mobile.Loan.ApplyForLoan.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.ApplyForLoan.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.ApplyForLoan.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

		[SettingKey("Mobile.Loan.ApplyForLoan.Enabled")]
		public bool Enabled
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}


        [SettingKey("Mobile.Loan.ApplyForLoan.Url")]
		public string Url
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}


        [SettingKey("Mobile.Loan.ApplyForLoan.MeridianLink.ShouldGetLegacySsoUrl")]
		public bool ShouldGetMeridianLinkLegacySsoUrl
        {
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

	    [SettingKey("Mobile.Loan.LoanApplication.MortgageLoanEnabled")]
	    public bool MortgageLoanEnabled
	    {
	        get { return GetBoolValue(); }
	        set { SetValue(value); }
	    }

	    [SettingKey("Mobile.Loan.LoanApplication.MortgageLoanUrl")]
	    public string MortgageLoanUrl
	    {
	        get { return GetValue(); }
	        set { SetValue(value); }
	    }


        public Authentication.Authentication Authentication
		{
			// The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
			get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("A289B8AC-C9F6-4D06-A0B4-93F425B13743"))); }
			set { _authentication = value; }
		}
	}
}
