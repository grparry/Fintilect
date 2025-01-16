namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Transfers
{
    public class ScheduledTransfersSettings : SettingsBaseHelper
    {
        public ScheduledTransfersSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.ScheduledTransfers.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.ScheduledTransfers.IsTimeSelectionEnabled")]
        public bool IsTimeSelectionEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

    }
}