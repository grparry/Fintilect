namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.AppShield.AppWhiteList
{
    public class ModuleSecureCamera : SettingsBaseHelper
    {
        public ModuleSecureCamera(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Security.AppShield.ModuleSecureCamera.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
