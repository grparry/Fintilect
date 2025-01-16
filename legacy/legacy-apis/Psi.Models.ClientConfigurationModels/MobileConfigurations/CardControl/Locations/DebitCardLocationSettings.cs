namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.Locations
{
    public class DebitCardLocationSettings : SettingsBaseHelper
    {
        public DebitCardLocationSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.CardControl.Locations.DebitCard.InternationalTransactionControlEnabled")]
        public bool InternationalTransactionControlEnabled {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Locations.DebitCard.MerchantStateListControlEnabled")]
        public bool MerchantStateListControlEnabled {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}