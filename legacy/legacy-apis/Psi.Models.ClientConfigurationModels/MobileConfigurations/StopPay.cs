using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class StopPay : SettingsBaseHelper
    {
        private Authentication.Authentication _authentication;

        public StopPay(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.StopPay.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.StopPay.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.StopPay.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.StopPay.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("FD72547C-0346-40E1-AEDB-AD37E3905BBC"))); }
            set { _authentication = value; }
        }

        [SettingKey("Mobile.StopPay.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
