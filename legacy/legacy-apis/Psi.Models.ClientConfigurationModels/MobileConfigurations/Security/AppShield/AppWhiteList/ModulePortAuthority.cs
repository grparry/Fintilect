namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.AppShield.AppWhiteList
{
    public class ModulePortAuthority : SettingsBaseHelper
    {
        public ModulePortAuthority(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Security.AppShield.ModulePortAuthority.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
