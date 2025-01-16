namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.Locations
{
    public class CardControlLocations : SettingsBaseHelper
    {
        private ISettingsBase _settingsBase;
        private CreditCardLocationSettings _creditCardLocationSettings;
        private DebitCardLocationSettings _debitCardLocationSettings;


        public CardControlLocations(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public CreditCardLocationSettings CreditCard
        {
            get => _creditCardLocationSettings ?? (_creditCardLocationSettings = new CreditCardLocationSettings(_settingsBase));
            set => _creditCardLocationSettings = value;
        }

        public DebitCardLocationSettings DebitCard
        {
            get => _debitCardLocationSettings ?? (_debitCardLocationSettings = new DebitCardLocationSettings(_settingsBase));
            set => _debitCardLocationSettings = value;
        }

        [SettingKey("Mobile.CardControl.Locations.CurrentLocationEnabled")]
        public bool CurrentLocationEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CardControl.Locations.RegionsEnabled")]
        public bool RegionsEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CardControl.Locations.UsOnlyEnabled")]
        public bool UsOnlyEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CardControl.Locations.MaxNumberOfRegions")]
        public int MaxNumberOfRegions
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }
    }
}
