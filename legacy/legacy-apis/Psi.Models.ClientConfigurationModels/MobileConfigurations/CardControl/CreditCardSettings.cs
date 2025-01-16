namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl
{
    public class CreditCardSettings : SettingsBaseHelper
    {
        public CreditCardSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        ///     If Enabled, will show AlertPreferences in Card Control
        /// </summary>
        [SettingKey("Mobile.CardControl.CreditCard.AlertPreferencesEnabled")]
        public bool AlertPreferencesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If Enabled, will show UserDeviceSetup in Card Control
        /// </summary>
        [SettingKey("Mobile.CardControl.CreditCard.UserDeviceSetupEnabled")]
        public bool UserDeviceSetupEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If Enabled, will show ManagePermissions in Card Control
        /// </summary>
        [SettingKey("Mobile.CardControl.CreditCard.ManagePermissionsEnabled")]
        public bool ManagePermissionsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CreditCard.ShouldUseDynamicTransactionTypes")]
        public bool ShouldUseDynamicTransactionTypes
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CreditCard.MerchantTypesEnabled")]
        public bool MerchantTypesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CreditCard.SpendingLimitsEnabled")]
        public bool SpendingLimitsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CreditCard.TransactionTypesEnabled")]
        public bool TransactionTypesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}