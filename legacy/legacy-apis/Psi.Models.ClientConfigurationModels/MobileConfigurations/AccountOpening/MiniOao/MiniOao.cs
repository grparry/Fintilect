using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.AccountOpening.MiniOao
{
	public class MiniOao : SettingsBaseHelper
    {
	    private Authentication.Authentication _authentication;

	    public MiniOao(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.AccountOpening.Mini.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.Mini.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.Mini.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.Mini.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.Mini.PurchaseCdUrl")]
        public string PurchaseCdUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.Mini.OpenSubAccountUrl")]
        public string OpenSubAccountUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.Mini.ShouldVirusScanFiles")]
        public bool ShouldVirusScanFiles
        {
            get => GetBoolValue(); 
            set => SetValue(value);
        }
        
        [SettingKey("Mobile.AccountOpening.Mini.ShouldShowMenuItem")]
        public bool ShouldShowMenuItem
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("03ED9950-0503-481B-8144-C4C9C9CC2891"))); }
            set { _authentication = value; }
        }
	}
}
