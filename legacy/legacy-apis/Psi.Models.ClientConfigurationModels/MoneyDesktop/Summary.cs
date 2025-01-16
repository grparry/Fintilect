namespace Psi.Data.Models.ClientConfigurationModels.MoneyDesktop
{
    public class Summary : SettingsBaseHelper
    {
        public Summary(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("MoneyDesktop.Summary.SidePanelsEnabled")]
        public bool SidePanelsEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}

