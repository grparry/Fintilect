namespace Psi.Data.Models.ClientConfigurationModels.Alerts
{
    public class AdHocAlerts : SettingsBaseHelper
    {
        public AdHocAlerts(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Alert.AdHocAlerts.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Alert.AdHocAlerts.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}
