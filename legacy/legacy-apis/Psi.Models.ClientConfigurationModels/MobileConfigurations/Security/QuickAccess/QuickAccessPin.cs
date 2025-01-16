namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.QuickAccess
{
    public class QuickAccessPin : SettingsBaseHelper
    {
        public QuickAccessPin(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Security.QuickAccess.Pin.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

		/// <summary>
		/// Pin type can be numeric or alphanumeric
		/// </summary>
		[SettingKey("Mobile.Security.QuickAccess.Pin.Type")]
        public string Type
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.QuickAccess.Pin.Length")]
        public int Length
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
		}

		/// <summary>
		/// If a user has not created a pin since before this date, the user must create a new pin.
		/// </summary>
		[SettingKey("Mobile.Security.QuickAccess.Pin.ResetDate")]
	    public System.DateTime ResetDate {
		    get { return GetDateTimeValue(); }
		    set { SetValue(value); }
	    }

	}
}