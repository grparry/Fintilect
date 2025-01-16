namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class Alerts : SettingsBaseHelper
    {
        public Alerts(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Alerts.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Alerts.AlertInboxUrl")]
        public string AlertInboxUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Alerts.AlertManagementUrl")]
        public string AlertManagementUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
