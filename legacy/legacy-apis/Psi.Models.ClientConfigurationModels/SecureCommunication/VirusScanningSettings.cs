namespace Psi.Data.Models.ClientConfigurationModels.SecureCommunication
{
    public class VirusScanningSettings : SettingsBaseHelper
    {
        public VirusScanningSettings(ISettingsBase settingsBase) : base(settingsBase) { }

        /// <summary> The <see cref="Address"/> and <see cref="Port"/> must also be set </summary>
        [SettingKey("SecureCommunication.VirusScanning.IsEnabled")]
        public bool IsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary> <see cref="Port"/> Must also be set </summary>
        [SettingKey("SecureCommunication.VirusScanning.Address")]
        public string Address
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("SecureCommunication.VirusScanning.Port")]
        public int Port
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}