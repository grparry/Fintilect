namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl
{
    public class OndotDxSettings : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;

        public OndotDxSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.CardControl.OndotDx.ClientId")]
        public int ClientId
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OndotDx.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OndotDx.IsMockDataEnabled")]
        public bool IsMockDataEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OndotDx.MockGetPreferencesData")]
        public string MockGetPreferencesData
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OndotDx.EnableAllMerchantTypesOnRegistration")]
        public bool EnableAllMerchantTypesOnRegistration
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OndotDx.EnableAllTransactionTypesOnRegistration")]
        public bool EnableAllTransactionTypesOnRegistration
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.OndotDx.AlertsDeliveryDeclinedTransactionEnabled")]
        public bool AlertsDeliveryDeclinedTransactionEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Moblie.CardControl.OnDotDx.SendAmountAsDollars")]
        public bool SendAmountAsDollars
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}