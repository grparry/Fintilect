namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.Locations
{
    public class CreditCardLocationSettings : SettingsBaseHelper
    {
        public CreditCardLocationSettings(ISettingsBase settoigsBase) : base(settoigsBase)
        {
        }
        
        [SettingKey("Mobile.CardControl.Locations.CreditCard.MaxNumberOfRegions")]
        public int MaxNumberOfRegions {
            get => GetIntValue();
            set => SetValue(value);
        }
        
        [SettingKey("Mobile.CardControl.Locations.CreditCard.UsOnlyEnabled")]
        public bool UsOnlyEnabled {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("Mobile.CardControl.Locations.CreditCard.RegionsEnabled")]
        public bool RegionsEnabled {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("Mobile.CardControl.Locations.CreditCard.CurrentLocationEnabled")]
        public bool CurrentLocationEnabled {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}