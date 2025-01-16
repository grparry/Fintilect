using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class SendMoney : SettingsBaseHelper
    {
	    private Authentication.Authentication _authentication;

	    public SendMoney(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.SendMoney.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SendMoney.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SendMoney.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SendMoney.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.SendMoney.LandingEnabled")]
        public bool LandingEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
        
        /// <summary>
        /// When a first name is not present on a business account, this first name will be used for Send Money.
        /// </summary>
        [SettingKey("Mobile.SendMoney.DefaultBusinessFirstName")]
        public string DefaultBusinessFirstName
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }


        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("0C72B92B-792B-45A0-B260-061B935B2A35"))); }
            set { _authentication = value; }
        }
    }
}
