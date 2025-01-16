using System.Collections.Generic;
using Newtonsoft.Json;

namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class CheckFree : SettingsBaseHelper
    {
        private CheckFreeAdmin _checkFreeAdmin;
        private readonly ISettingsBase _settingsBase;

        public CheckFree(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("CheckFreeBillPaySso.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.AccountTypeMap")]
        public Dictionary<string, string> CheckFreeAccountTypes
        {
            get => GetJsonValueOrNull<Dictionary<string, string>>() ?? new Dictionary<string, string>();
            set => SetValue(JsonConvert.SerializeObject(value));
        }

        public string BaseUrl => IsCertification ? CertificationBaseUrl.TrimEnd('/') : RegularBaseUrl.TrimEnd('/');

        public string BuilderBaseUrl => IsCertification ? BuilderCertificationBaseUrl.TrimEnd('/') : BuilderRegularBaseUrl.TrimEnd('/');

        public string AuthSsoUrl => $@"{BaseUrl}/{AuthSsoEndPoint.TrimStart('/').TrimEnd('/')}";

        public string SubscriberServiceUrl => $@"{BuilderBaseUrl}/{SubscriberServiceEndPoint.TrimStart('/').TrimEnd('/')}";
        
        public string SessionServiceUrl => $@"{BuilderBaseUrl}/{SessionServiceEndPoint.TrimStart('/').TrimEnd('/')}";

        public string KeyManagementUrl => $@"{BaseUrl}/{KeyManagementEndPoint.TrimStart('/').TrimEnd('/')}";

        [SettingKey("CheckFreeBillPaySso.CertificationBaseUrl")]
        public string CertificationBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.RegularBaseUrl")]
        public string RegularBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.BuilderCertificationBaseUrl")]
        public string BuilderCertificationBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.BuilderRegularBaseUrl")]
        public string BuilderRegularBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.ClientAppText")]
        public string ClientAppText
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.ClientAppVersion")]
        public string ClientAppVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.ClientCertificateName")]
        public string ClientCertificateName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.EndPoint.AuthSso")]
        public string AuthSsoEndPoint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.EndPoint.SubscriberService")]
        public string SubscriberServiceEndPoint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.EndPoint.SessionService")]
        public string SessionServiceEndPoint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.EndPoint.KeyManagement")]
        public string KeyManagementEndPoint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.IsCertification")]
        public bool IsCertification
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.IsSolicitationAllowed")]
        public bool IsSolicitationAllowed
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.Products")]
        public Dictionary<string, string> Products
        {
            get => GetJsonValueOrNull<Dictionary<string, string>>() ?? new Dictionary<string, string>();
            set => SetValue(JsonConvert.SerializeObject(value));
        }

        [SettingKey("CheckFreeBillPaySso.SponsorId")]
        public string SponsorId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.SubscriberPwDefaultForAll")]
        public string SubscriberPwDefaultForAll
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.TimeZoneOffset")]
        public int TimeZoneOffset
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.IntraBankRoutingNumber")]
        public string RoutingNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.GeneratedKeyLength")]
        public int GeneratedKeyLength
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.ServiceRunConfiguration")]
        public string ServiceRunConfiguration
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.SubscriberInfoCallEnabled")]
        public bool SubscriberInfoCallEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckFreeBillPaySso.SessionServiceVersion")]
        public string SessionServiceVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        public CheckFreeAdmin Admin
        {
            get => _checkFreeAdmin ?? (_checkFreeAdmin = new CheckFreeAdmin(_settingsBase));
            set => _checkFreeAdmin = value;
        }
    }
}
