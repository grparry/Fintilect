namespace Psi.Data.Models.ClientConfigurationModels.Address
{
    public class AddressVerificationSettings : SettingsBaseHelper
    {

        public AddressVerificationSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("AddressVerification.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AddressVerification.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AddressVerification.AuthId")]
        public string AuthId
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AddressVerification.AuthToken")]
        public string AuthToken
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AddressVerification.Url")]
        public string Url
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AddressVerification.MaxCandidates")]
        public int MaxCandidates
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("AddressVerification.Vendor")]
        public string Vendor
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
