namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.AccountOpening.JoinCreditUnion
{
    public class JoinCreditUnion : SettingsBaseHelper
    {
        public JoinCreditUnion(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.AccountOpening.JoinCreditUnion.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.JoinCreditUnion.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.JoinCreditUnion.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.JoinCreditUnion.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.AccountOpening.JoinCreditUnion.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
