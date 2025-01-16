namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.QuickBalance
{
	public class QuickBalance : SettingsBaseHelper
    {
	    private readonly ISettingsBase _settingsBase;
	    private Preferences _preferences;

		public QuickBalance(ISettingsBase settingsBase) : base(settingsBase)
        {
		    _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.QuickBalance.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.QuickBalance.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.QuickBalance.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.QuickBalance.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.QuickBalance.RefreshTime")]
        public int RefreshTime
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.QuickBalance.MaxNumberOfAccounts")]
        public int MaxNumberOfAccounts
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        public Preferences Preferences
        {
			get { return _preferences ?? (_preferences = new Preferences(_settingsBase)); }
			set { _preferences = value; }
		}
    }
}
