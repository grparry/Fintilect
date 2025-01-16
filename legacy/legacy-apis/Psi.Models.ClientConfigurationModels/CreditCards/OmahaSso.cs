using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.CreditCards
{
    public class OmahaSso : SettingsBaseHelper
    {
        public OmahaSso(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("CreditCards.OmahaSSO.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSSO.MinimumVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSSO.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSSO.Certification.Store")]
        public string CertificationStore
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSSO.Certification.Emerge.PrivateThumbPrint")]
        public string CertificationEmergePrivateThumbPrint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSSO.Certification.Vendor.PublicThumbPrint")]
        public string CertificationVendorPublicThumbPrint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSSO.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSSO.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSSO.ResponseIssuer")]
        public string ResponseIssuer
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSso.StartUrl")]
        public string StartUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSso.ReturnUrl")]
        public string ReturnUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSso.LogoutUrl")]
        public string LogoutUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSso.AppId")]
        public string AppId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSso.ClientId")]
        public string ClientId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSso.AssertionLogEnabled")]
        public bool AssertionLogEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CreditCards.OmahaSso.Issuer")]
        public string Issuer
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
