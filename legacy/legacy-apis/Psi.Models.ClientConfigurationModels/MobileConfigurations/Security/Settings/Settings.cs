using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Security.Settings
{
    public class Settings : SettingsBaseHelper
    {
        public Settings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Security.Settings.AdbResponse")]
        public AppShieldResponseType AdbResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.BluetoothControlResponse")]
        public AppShieldResponseType BluetoothControlResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.BluetoothEnabledResponse")]
        public AppShieldResponseType BluetoothEnabledResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.DeveloperResponse")]
        public AppShieldResponseType DeveloperResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.GpsEnabledResponse")]
        public AppShieldResponseType GpsEnabledResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.HardwareKeyboardResponse")]
        public AppShieldResponseType HardwareKeyboardResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.NfcEnabledResponse")]
        public AppShieldResponseType NfcEnabledResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.NonSystemKeyboardResponse")]
        public AppShieldResponseType NonSystemKeyboardResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.RootedResponse")]
        public AppShieldResponseType RootedResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Security.Settings.WiFiEnabledResponse")]
        public AppShieldResponseType WiFiEnabledResponse
        {
            get { return GetAppShieldResponseTypeValue(); }
            set { SetValue(value); }
        }
    }
}
