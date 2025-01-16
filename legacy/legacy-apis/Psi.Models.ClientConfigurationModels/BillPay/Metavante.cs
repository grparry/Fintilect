namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class Metavante : SettingsBaseHelper
    {
        public Metavante(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("BillPay.Metavante.SourceId")]
        public string SourceId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.ApplId")]
        public string ApplId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.BId")]
        public string BId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.CertificateName")]
        public string Certificate
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.BillPay.Metavante.RouteTransit")]
        public string RouteTransit
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.Uri")]
        public string Uri
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.BillPay.Metavante.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.PartnerUid")]
        public string PartnerUid
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.Timeout")]
        public int? Timeout
        {
            get => int.TryParse(GetValue(), out var timeout) ? timeout : (int?)null;
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.UsesDeliverByModel")]
        public bool UsesDeliverByModel
        {
            get => GetIntValue() == 1; // 0 - SendOn, 1 - DeliverBy
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.EnrollWithJointOwnerEnabled")]
        public bool EnrollWithJointOwnerEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.ServiceId")]
        public string ServiceId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.TransactionAmountLimit")]
        public decimal TransactionAmountLimit
        {
            get => GetDecimalValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.DailyAmountLimit")]
        public decimal DailyAmountLimit
        {
            get => GetDecimalValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Metavante.UseWebServiceForSso")]
        public bool UseWebServiceForSso
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}