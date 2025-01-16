namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Branding
{
	public class Branding : SettingsBaseHelper

    {
        private readonly ISettingsBase _settingsBase;
	    private Font.Font _font;

	    public Branding(ISettingsBase settingsBase) : base(settingsBase)
        {
	        _settingsBase = settingsBase;
	    }

        [SettingKey("Mobile.Branding.BackgroundColor")]
        public string BackgroundColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.PrimaryColor")]
        public string PrimaryColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.PrimaryDarkColor")]
        public string PrimaryDarkColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.SecondaryColor")]
        public string SecondaryColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.MenuIconColor")]
        public string MenuIconColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.InfoColor")]
        public string InfoColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.SuccessColor")]
        public string SuccessColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.WarningColor")]
        public string WarningColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.MutedColor")]
        public string MutedColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.ListColor")]
        public string ListColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.ListDarkColor")]
        public string ListDarkColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.NavigationBarColor")]
        public string NavigationBarColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.NavigationBarItemColor")]
        public string NavigationBarItemColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.SelectedListColor")]
        public string SelectedListColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.StatusBarColor")]
        public string StatusBarColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.LogoutButtonColor")]
        public string LogoutButtonColor
        {
            get => GetValue();
            set => SetValue(value);
        }

        public Font.Font Font
	    {
	        get { return _font ?? (_font = new Font.Font(_settingsBase)); }
            set { _font = value; }
        }
	}
}
