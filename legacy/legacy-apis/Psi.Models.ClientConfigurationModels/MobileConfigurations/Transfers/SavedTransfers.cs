namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Transfers
{
    public class SavedTransfers : SettingsBaseHelper
    {
        public SavedTransfers(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.Transfers.SavedTransfers.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Transfers.SavedTransfers.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Transfers.SavedTransfers.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Transfers.SavedTransfers.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
