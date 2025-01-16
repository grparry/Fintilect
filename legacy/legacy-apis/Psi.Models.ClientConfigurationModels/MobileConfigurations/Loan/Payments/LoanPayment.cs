using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Loan.Payments
{
	public class LoanPayment : SettingsBaseHelper
    {
        private Authentication.Authentication _authentication;

        public LoanPayment(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Loan.MakePayment.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.MakePayment.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.MakePayment.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.MakePayment.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Loan.MakePayment.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("F9DC9B52-6DFF-4CAE-8291-D82B27513FA8"))); }
            set { _authentication = value; }
        }
    }
}
