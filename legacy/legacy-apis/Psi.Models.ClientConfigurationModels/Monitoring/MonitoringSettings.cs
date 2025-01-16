using Psi.Data.Models.Domain.IMSHealth;

namespace Psi.Data.Models.ClientConfigurationModels.Monitoring
{
    public class MonitoringSettings : SettingsBaseHelper
    {
        public MonitoringSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Monitoring.MiddlewareHealthThreshold")]
        public MiddlewareHealthThreshold MiddlewareHealthThreshold
        {
            get => GetJsonValueOrNull<MiddlewareHealthThreshold>();
            set => SetValue(value);
        }
    }
}