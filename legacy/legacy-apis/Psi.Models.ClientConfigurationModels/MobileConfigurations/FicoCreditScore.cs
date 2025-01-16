using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class FicoCreditScore : SettingsBaseHelper
	{
	    private Authentication.Authentication _authentication;

	    public FicoCreditScore(ISettingsBase settingsBase) : base(settingsBase)
	    {
        }

        [SettingKey("Mobile.FicoCreditScore.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.FicoCreditScore.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.FicoCreditScore.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

	    public Authentication.Authentication Authentication
	    {
	        // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
	        get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("FC42F59B-2C65-493D-A3C0-DA4D50A85EB6"))); }
	        set { _authentication = value; }
	    }
    }
}
