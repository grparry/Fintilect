using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class HouseHolding : SettingsBaseHelper
    {
        private Authentication.Authentication _authentication;
        public HouseHolding(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.HouseHolding.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.HouseHolding.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.HouseHolding.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.HouseHolding.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
        [SettingKey("Mobile.HouseHolding.PermissionsUrl")]
        public string PermissionsUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("9CF8AB64-C717-48DE-AB5C-CC9237A400BA"))); }
            set { _authentication = value; }
        }
    }
}
