namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class ConnectNative : SettingsBaseHelper
    {
        public ConnectNative(ISettingsBase settingsBase) : base(settingsBase)
        {
        }


        [SettingKey("Mobile.ConnectNative.ShowThemeSelectorOverFlowMenu")]
        public bool ShowThemeSelectorOverFlowMenu
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.ConnectNative.DefaultTheme")]
        public string DefaultTheme { get=>GetValue(); set=>SetValue(value); }

        [SettingKey("Mobile.ConnectNative.ThemeSelectorEnabled")]
        public bool ThemeSelectorEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        [SettingKey("Mobile.ConnectNative.MenuConfiguration")]
        public string ConnectNativeMenuConfiguration
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.ConnectNative.FooterContent")]
        public string FooterContent 
        { 
            get => GetValue(); 
            set => SetValue(value); 
        }

        [SettingKey("Mobile.ConnectNative.FooterEnabled")]
        public bool FooterEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
