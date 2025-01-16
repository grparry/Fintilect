namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Branding.Font
{
    public class FontColor : SettingsBaseHelper
    {
        public FontColor(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Branding.Font.FontColor.PrimaryColor")]
        public string PrimaryColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.Font.FontColor.LightColor")]
        public string LightColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.Font.FontColor.HintColor")]
        public string HintColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.Font.FontColor.InvertedColor")]
        public string InvertedColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.Font.FontColor.NavigationBarTitleTextColor")]
        public string NavigationBarTitleTextColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.Font.FontColor.MenuTextColor")]
        public string MenuTextColor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Branding.Font.FontColor.LogoutButtonTextColor")]
        public string LogoutButtonTextColor
        {
            get => GetValue();
            set => SetValue(value);
        }
        
        [SettingKey("Mobile.Branding.Font.FontColor.MakeAPaymentColor")]
        public string MakeAPaymentColor
        {
            get => GetValue();
            set => SetValue(value);
        }
        
        [SettingKey("Mobile.Branding.Font.FontColor.QuickAccessTextColor")]
        public string QuickAccessTextColor
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}