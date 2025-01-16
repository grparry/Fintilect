using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Loan.Calculators
{
	public class AutoLoan : SettingsBaseHelper
    {
	    private Authentication.Authentication _authentication;

	    public AutoLoan(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Loan.Calculator.AutoLoan.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.Calculator.AutoLoan.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.Calculator.AutoLoan.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.Calculator.AutoLoan.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.Calculator.AutoLoan.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("DF5822F2-04BA-49D5-910A-FD5ED0F98364"))); }
            set { _authentication = value; }
        }
    }
}
