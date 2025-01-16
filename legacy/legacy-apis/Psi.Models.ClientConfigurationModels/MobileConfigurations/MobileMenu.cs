namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class MobileMenu : SettingsBaseHelper
    {
        public MobileMenu(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Menu.Layout")]
        public string Layout
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
