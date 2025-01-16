namespace Psi.Data.Models.ClientConfigurationModels.SMTP
{
	public class SMTPSettings : SettingsBaseHelper
    {
        public SMTPSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

	    [SettingKey("SMTP.ServerAddress")]
	    public string ServerAddress
	    {
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }

	    [SettingKey("SMTP.ServerPort")]
	    public int ServerPort
	    {
		    get { return GetIntValue(); }
		    set { SetValue(value); }
	    }

	    [SettingKey("SMTP.LoginName")]
	    public string LoginName
		{
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }

		[SettingKey("SMTP.SSLEnabled")]
		public bool SSLEnabled
		{
			get => GetBoolValue();
			set => SetValue(value);
		}

		[SettingKey("SMTP.Password")]
	    public string Password
		{
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }
    }
}
