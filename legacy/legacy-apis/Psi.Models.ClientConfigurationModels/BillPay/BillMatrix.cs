using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class BillMatrix : SettingsBaseHelper
    {
        public BillMatrix(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("BillPay.BillMatrix.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.CertificateFilename")]
        public string CertificateFilename
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.CertificatePassword")]
        public string CertificatePassword
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.CertificateStore.Vendor.Public")]
        public string VendorPublicCertificateStore
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.CertificateStore.Emerge.Private")]
        public string EmergePrivateCertificateStore
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.CertificateThumbPrint.Vendor.Public")]
        public string VendorPublicCertificateThumbPrint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.CertificateThumbPrint.Emerge.Private")]
        public string EmergePrivateCertificateThumbPrint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.OpenInNewTab")]
        public bool OpenInNewTab
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.ShouldSendAddressInSsoRequest")]
        public bool ShouldSendAddressInSsoRequest
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillMatrix.Issuer")]
        public string Issuer
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
