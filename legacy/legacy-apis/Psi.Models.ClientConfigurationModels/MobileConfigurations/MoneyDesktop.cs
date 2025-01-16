using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class MoneyDesktop : SettingsBaseHelper
    {
	    private Authentication.Authentication _authentication;

	    public MoneyDesktop(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.MoneyDesktop.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.MoneyDesktop.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.MoneyDesktop.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.MoneyDesktop.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("9194CD63-679A-499F-9D81-EFB77F01E098"))); }
            set { _authentication = value; }
        }
    }
}
