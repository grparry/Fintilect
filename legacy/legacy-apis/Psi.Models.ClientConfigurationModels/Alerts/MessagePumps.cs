using Psi.Data.Models.Domain.Alerts.ExternalEvents;

namespace Psi.Data.Models.ClientConfigurationModels.Alerts
{
    public class MessagePumps : SettingsBaseHelper
    {
        public MessagePumps(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Alerts.MessagePumps.DigitalInsightsConfiguration")]
        public DigitalInsightsConfiguration DigitalInsightsConfiguration
        {
            get { return GetJsonValueOrNull<DigitalInsightsConfiguration>(); }
            set { SetValue(value); }
        }
    }
}
