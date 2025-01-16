namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class Enrollment : SettingsBaseHelper
	{
	    public Enrollment(ISettingsBase settingsBase) : base(settingsBase)
	    {
        }

        [SettingKey("Mobile.Enrollment.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Enrollment.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Enrollment.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Enrollment.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

		[SettingKey("Mobile.Enrollment.IsPinRequired")]
		public bool IsPinRequired
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

		[SettingKey("Mobile.Enrollment.IsZipCodeRequired")]
		public bool IsZipCodeRequired
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}
	}
}
