using System;

namespace Psi.Data.Models.ClientConfigurationModels.SynergyEstatements
{
    public class SynergyEstatementsSettings : SettingsBaseHelper
    {
        private MobileConfigurations.Authentication.Authentication _authentication;

        public SynergyEstatementsSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Estatements.Synergy.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.Synergy.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.Synergy.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.Synergy.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.Synergy.OrgAlias")]
        public string OrgAlias
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.Synergy.ValidationCode")]
        public string ValidationCode
        {
            get => GetValue();
            set => SetValue(value);
        }

        public MobileConfigurations.Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new MobileConfigurations.Authentication.Authentication(new Guid("A7A7A997-7441-42BC-A85F-5B434652D18E"))); }
            set { _authentication = value; }
        }
    }
}
