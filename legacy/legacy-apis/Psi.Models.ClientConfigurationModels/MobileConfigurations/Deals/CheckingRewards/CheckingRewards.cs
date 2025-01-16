using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Deals.CheckingRewards
{
    public class CheckingRewards : SettingsBaseHelper

    {
        private Authentication.Authentication _authentication;

        public CheckingRewards(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Deals.CheckingRewards.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.CheckingRewards.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.CheckingRewards.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.CheckingRewards.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Deals.CheckingRewards.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("168A15A6-D8FD-4E73-AF40-A78C0C3DC3F8"))); }
            set { _authentication = value; }
        }

        [SettingKey("Mobile.Deals.CheckingRewards.ReslovingUrl")]
        public string ReslovingUrl
        {
            get { return GetValue();
            }
            set { SetValue(value);
            }
        }
    }
}
