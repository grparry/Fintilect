namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class DeviceSettings : SettingsBaseHelper
    {
        public DeviceSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If set to True, when an mfa devices in admin will be available
        /// </summary>
        [SettingKey("Admin.Device.MfaDevicesEnabled")]
        public bool MfaDevicesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.UserDevices.ShowCreateDate")]
        public bool ShowCreateDate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
