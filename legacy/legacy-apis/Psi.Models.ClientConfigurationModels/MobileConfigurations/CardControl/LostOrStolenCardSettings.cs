using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl
{
    public class LostOrStolenCardSettings : SettingsBaseHelper
    {
        public LostOrStolenCardSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.CardControl.LostOrStolen.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.LostOrStolen.SendSecureMessageEnabled")]
        public bool SendSecureMessageEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.LostOrStolen.EligibleCardTypes")]
        public List<string> EligibleCardTypes
        {
            get => GetListValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.LostOrStolen.Locations")]
        public List<string> Locations
        {
            get => GetListValue();
            set => SetValue(value);
        }
    }
}