namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security
{
	public class Security : SettingsBaseHelper
    {
	    private readonly ISettingsBase _settingsBase;
        private QuickAccess.QuickAccess _quickAccess;
        private Biometrics.Biometrics _biometrics;
		private PermissionLevel.PermissionLevel _permissionLevel;
	    private Settings.Settings _settings;
	    private AppShield.AppShield _appShield;
	    private LayeredSecurity.LayeredSecurity _layeredSecurity;
        private Mfa.SmsSecurityCode _smsSecurityCode;

		public Security(ISettingsBase settingsBase) : base(settingsBase)
        {
		    _settingsBase = settingsBase;
		}

        public QuickAccess.QuickAccess QuickAccess
        {
            get => _quickAccess ?? (_quickAccess = new QuickAccess.QuickAccess(_settingsBase));
            set => _quickAccess = value;
        }

        public Biometrics.Biometrics Biometrics
		{
			get => _biometrics ?? (_biometrics = new Biometrics.Biometrics(_settingsBase));
            set => _biometrics = value;
        }

		public PermissionLevel.PermissionLevel PermissionLevel
		{
			get => _permissionLevel ?? (_permissionLevel = new PermissionLevel.PermissionLevel(_settingsBase));
		    set => _permissionLevel = value;
		}

		public Settings.Settings Settings
		{
			get => _settings ?? (_settings = new Settings.Settings(_settingsBase));
		    set => _settings = value;
		}

		public AppShield.AppShield AppShield
        {
			get => _appShield ?? (_appShield = new AppShield.AppShield(_settingsBase));
		    set => _appShield = value;
		}

	    public LayeredSecurity.LayeredSecurity LayeredSecurity
	    {
            get => _layeredSecurity ?? (_layeredSecurity = new LayeredSecurity.LayeredSecurity(_settingsBase));
	        set => _layeredSecurity = value;
	    }

	    public Mfa.SmsSecurityCode SmsSecurityCode
        {
            get => _smsSecurityCode ?? (_smsSecurityCode = new Mfa.SmsSecurityCode(_settingsBase));
	        set => _smsSecurityCode = value;
	    }
	}
}
