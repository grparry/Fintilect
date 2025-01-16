using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.Alerts
{
    public class ConnectNative : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;

        public ConnectNative(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Alert.ConnectNative.UrgentAlertTimeout")]
        public double ScheduledAlertsEnabled
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

    }
}
