namespace Psi.Data.Models.ClientConfigurationModels.Menu
{
    public class MenuItems : SettingsBaseHelper
    {
        public MenuItems(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Menu.XmlMenuItems")]
        public string MenuItemsXml
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

         
    }
}
