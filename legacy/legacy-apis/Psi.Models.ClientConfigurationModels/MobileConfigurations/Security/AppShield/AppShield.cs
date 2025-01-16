namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.AppShield
{
    public class AppShield : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private AppWhiteList.ModulePortAuthority _modulePortAuthority;
        private AppWhiteList.ModuleSecureCamera _moduleSecureCamera;
        private AppWhiteList.ModuleSecureKeyboard _moduleSecureKeyboard;

        public AppShield(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.Security.AppShield.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.AndroidDevLicenseKey")]
        public string AndroidDevLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.AndroidQualityAssessmentLicenseKey")]
        public string AndroidQualityAssessmentLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.AndroidTestLicenseKey")]
        public string AndroidTestLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.AndroidProdTestLicenseKey")]
        public string AndroidProdTestLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.AndroidStageLicenseKey")]
        public string AndroidStageLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.AndroidReleaseLicenseKey")]
        public string AndroidReleaseLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.IosDevLicenseKey")]
        public string IosDevLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("Mobile.Security.AppShield.IosTestLicenseKey")]
        public string IosTestLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.IosProdTestLicenseKey")]
        public string IosProdTestLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.IosReleaseLicenseKey")]
        public string IosReleaseLicenseKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public AppWhiteList.ModulePortAuthority ModulePortAuthority
        {
            get { return _modulePortAuthority ?? (_modulePortAuthority = new AppWhiteList.ModulePortAuthority(_settingsBase)); }
            set { _modulePortAuthority = value; }
        }

        public AppWhiteList.ModuleSecureCamera ModuleSecureCamera
        {
            get { return _moduleSecureCamera ?? (_moduleSecureCamera = new AppWhiteList.ModuleSecureCamera(_settingsBase)); }
            set { _moduleSecureCamera = value; }
        }

        public AppWhiteList.ModuleSecureKeyboard ModuleSecureKeyboard
        {
            get { return _moduleSecureKeyboard ?? (_moduleSecureKeyboard = new AppWhiteList.ModuleSecureKeyboard(_settingsBase)); }
            set { _moduleSecureKeyboard = value; }
        }
    }
}
