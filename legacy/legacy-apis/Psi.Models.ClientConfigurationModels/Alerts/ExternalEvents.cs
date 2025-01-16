namespace Psi.Data.Models.ClientConfigurationModels.Alerts
{
    public class ExternalEvents : SettingsBaseHelper
    {
        public ExternalEvents(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("Alert.ExternalEvents.DigitalInsights.Enabled")]
        public bool DigitalInsightsEnabled
		{
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Alert.ExternalEvents.DigitalInsights.MinVersion")]
        public double DigitalInsightsMinVersion
		{
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}
