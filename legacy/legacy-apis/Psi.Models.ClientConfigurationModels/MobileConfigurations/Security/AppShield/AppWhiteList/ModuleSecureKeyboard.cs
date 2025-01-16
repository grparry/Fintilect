namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.AppShield.AppWhiteList
{
    public class ModuleSecureKeyboard : SettingsBaseHelper
    {
        public ModuleSecureKeyboard(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Security.AppShield.ModuleSecureKeyboard.AndroidEnabled")]
        public bool AndroidEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.AppShield.ModuleSecureKeyboard.IosEnabled")]
        public bool IosEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
