namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.Biometrics
{
	public class Biometrics : SettingsBaseHelper
    {
	    private readonly ISettingsBase _settingsBase;
	    private EyeScan _eyeScan;
        private FaceUnlock _faceUnlock;

		public Biometrics(ISettingsBase settingsBase) : base(settingsBase)
        {
		    _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.Security.Biometrics.MinimumVersion")]
        public string MinimumVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Security.Biometrics.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Security.Biometrics.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Security.Biometrics.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Security.Biometrics.ShouldAutoPrompt")]
        public bool ShouldAutoPrompt
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public EyeScan EyeScan
		{
			get => _eyeScan ?? (_eyeScan = new EyeScan(_settingsBase));
            set => _eyeScan = value;
        }

        public FaceUnlock FaceUnlock
        {
            get => _faceUnlock ?? (_faceUnlock = new FaceUnlock(_settingsBase));
            set => _faceUnlock = value;
        }
	}
}
