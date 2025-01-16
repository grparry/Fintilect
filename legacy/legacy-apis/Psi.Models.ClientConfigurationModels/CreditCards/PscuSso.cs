namespace Psi.Data.Models.ClientConfigurationModels.CreditCards
{
    public class PscuSso : SettingsBaseHelper
    {
        public PscuSso(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("CreditCards.PscuSso.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.MinimumVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.Certification.Store")]
        public string CertificationStore
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.Certification.Emerge.PrivateThumbPrint")]
        public string CertificationEmergePrivateThumbPrint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.Certification.Vendor.PublicThumbPrint")]
        public string CertificationVendorPublicThumbPrint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.Issuer")]
        public string Issuer
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.ResponseIssuer")]
        public string ResponseIssuer
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.AppId")]
        public string AppId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.ClientId")]
        public string ClientId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.KeepAliveUrl")]
        public string KeepAliveUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.PscuSso.AssertionLogEnabled")]
        public bool AssertionLogEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}