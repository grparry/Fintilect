using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class PushNotification : SettingsBaseHelper
    {
        public PushNotification(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.PushNotification.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.PushNotification.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.PushNotification.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.PushNotification.AvailableDeepLinks")]
        public Dictionary<string, string> AvailableDeepLinks
        {
            get { return GetJsonValueOrNull<Dictionary<string, string>>(); }
            set { SetValue(value); }
        }
    }
}
