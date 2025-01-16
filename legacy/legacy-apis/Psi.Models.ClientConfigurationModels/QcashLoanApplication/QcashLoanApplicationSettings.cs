namespace Psi.Data.Models.ClientConfigurationModels.QcashLoanApplication
{
    public class QcashLoanApplicationSsoSettings : SettingsBaseHelper
    {
        public QcashLoanApplicationSsoSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("QcashLoanApplication.Sso.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.InternetBankingUrl")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.MobileUrl")]
        public string MobileUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.ApplicationSSOKey")]
        public string ApplicationSsoKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.ApplicationId")]
        public string ApplicationId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.SharedKey")]
        public string SharedKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.InternetBankingLocation")]
        public string InternetBankingLocation
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("QcashLoanApplication.Sso.MobileLocation")]
        public string MobileLocation
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}