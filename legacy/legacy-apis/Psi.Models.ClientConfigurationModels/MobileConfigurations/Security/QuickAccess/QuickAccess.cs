namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.QuickAccess
{
	public class QuickAccess : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private QuickAccessPin _quickAccessPin;

        public QuickAccess(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.Security.QuickAccess.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.QuickAccess.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.QuickAccess.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.QuickAccess.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.QuickAccess.ReturnPage")]
        public string ReturnPage
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.QuickAccess.DeleteTokensFromWebEnabled")]
        public bool DeleteTokensFromWebEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.QuickAccess.LoginScreenButtonEnabled")]
        public bool LoginScreenButtonEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Security.QuickAccess.EnrollOnLoginEnabled")]
        public bool EnrollOnLoginEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public QuickAccessPin Pin
        {
            get { return _quickAccessPin ?? (_quickAccessPin = new QuickAccessPin(_settingsBase)); }
            set { _quickAccessPin = value; }
        }
    }
}
