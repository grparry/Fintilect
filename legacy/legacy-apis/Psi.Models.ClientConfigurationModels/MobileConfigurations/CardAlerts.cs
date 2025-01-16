using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class CardAlerts : SettingsBaseHelper
    {
        private Authentication.Authentication _authentication;

        public CardAlerts(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.CardAlerts.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CardAlerts.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CardAlerts.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CardAlerts.Urls")]
        public string Urls
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("197428D5-5878-4FA1-AFAB-96135401BC08"))); }
            set { _authentication = value; }
        }
    }
}
