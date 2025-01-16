using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Deals.Cardlytics
{
    public class Cardlytics : SettingsBaseHelper

    {
        private Authentication.Authentication _authentication;

        public Cardlytics(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Deals.Cardlytics.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.Cardlytics.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.Cardlytics.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.Cardlytics.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.Cardlytics.NearMeEnabled")]
        public bool NearMeEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("CE5E69BB-5697-40D1-9AA0-63568C79C789"))); }
            set { _authentication = value; }
        }
    }
}
