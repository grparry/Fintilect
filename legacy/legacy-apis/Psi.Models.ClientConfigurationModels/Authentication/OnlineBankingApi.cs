namespace Psi.Data.Models.ClientConfigurationModels.Authentication
{
    public class OnlineBankingApi : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private Security _security;

        public OnlineBankingApi(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("OnlineBankingApi.CredentialsExpirationTime")]
        public int CredentialsExpirationTime
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        public Security Security
        {
            get { return _security ?? (_security = new Security(_settingsBase)); }
            set { _security = value; }
        }
    }

    public class Security : SettingsBaseHelper
    {
        public Security(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("OnlineBankingApi.Security.TokenTimeout")]
        public double TokenTimeout
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}