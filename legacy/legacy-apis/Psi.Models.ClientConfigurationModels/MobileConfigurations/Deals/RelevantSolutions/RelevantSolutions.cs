using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Deals.RelevantSolutions
{
	public class RelevantSolutions : SettingsBaseHelper
    {
	    private Authentication.Authentication _authentication;

	    public RelevantSolutions(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Deals.RelevantSolutions.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.RelevantSolutions.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.RelevantSolutions.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.RelevantSolutions.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.RelevantSolutions.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("834981D7-6B07-4361-B5F6-91AE8FD4EB3D"))); }
            set { _authentication = value; }
        }
    }
}
