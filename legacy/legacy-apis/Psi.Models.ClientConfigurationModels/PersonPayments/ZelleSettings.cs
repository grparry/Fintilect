namespace Psi.Data.Models.ClientConfigurationModels.PersonPayments
{
    public class ZelleSettings : SettingsBaseHelper
    {
        public ZelleSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("PersonPayment.Zelle.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.BaseUrl")]
        public string BaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.BId")]
        public string BId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.RouteTransit")]
        public string RouteTransit
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.PartnerUid")]
        public string PartnerUid
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.ApplId")]
        public string ApplId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.EnrollWithJointOwnerEnabled")]
        public bool EnrollWithJointOwnerEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.ServiceId")]
        public string ServiceId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.TransactionAmountLimit")]
        public decimal TransactionAmountLimit
        {
            get => GetDecimalValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.DailyAmountLimit")]
        public decimal DailyAmountLimit
        {
            get => GetDecimalValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.CertificateName")]
        public string CertificateName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.CheckNumber")]
        public int CheckNumber
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.UseMemberAccountNumberWithSuffix")]
        public bool UseMemberAccountNumberWithSuffix
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.AccountNumberFormat")]
        public string AccountNumberFormat
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayment.Zelle.AllowCrossAccount")]
        public bool AllowCrossAccount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
