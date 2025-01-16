namespace Psi.Data.Models.ClientConfigurationModels.MoneyDesktop
{
    public class Dashboard : SettingsBaseHelper
    {
        public Dashboard(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("MoneyDesktop.Dashboard.IndividualPanels")]
        public bool ShowIndividualPanels
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
