namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl
{
    public class DebitCardSettings : SettingsBaseHelper
    {
        public DebitCardSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If Enabled, will show AlertPreferences in Card Control
        /// </summary>
        [SettingKey("Mobile.CardControl.DebitCard.AlertPreferencesEnabled")]
        public bool AlertPreferencesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If Enabled, will show UserDeviceSetup in Card Control
        /// </summary>
        [SettingKey("Mobile.CardControl.DebitCard.UserDeviceSetupEnabled")]
        public bool UserDeviceSetupEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If Enabled, will show ManagePermissions in Card Control
        /// </summary>
        [SettingKey("Mobile.CardControl.DebitCard.ManagePermissionsEnabled")]
        public bool ManagePermissionsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.DebitCard.ShouldUseDynamicTransactionTypes")]
        public bool ShouldUseDynamicTransactionTypes
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.DebitCard.InternetTransactionControlEnabled")]
        public bool InternetTransactionControlEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.DebitCard.LargeTransactionControlEnabled")]
        public bool LargeTransactionControlEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.DebitCard.TimeOfDayRangeControlEnabled")]
        public bool TimeOfDayRangeControlEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.DebitCard.CardOffUserDefinedTimeEnabled")]
        public bool CardOffUserDefinedTimeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}