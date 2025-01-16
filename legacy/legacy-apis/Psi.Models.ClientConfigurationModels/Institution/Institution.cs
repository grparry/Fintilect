using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.Institution
{
    public class Institution : SettingsBaseHelper
    {
        public Institution(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Institution.PrivacyPolicy")]
        public string PrivacyPolicy
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.EnableContentSecurityPolicyHeaders")]
        public bool EnableContentSecurityPolicyHeaders
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.XFrameOptionsURLs")]
        public string XFrameOptionsURLs
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.ContentSecurityPolicy")]
        public string ContentSecurityPolicy
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.UtcOffset")]
        public double ServerUtcOffset
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.EnableStrictTransportSecurityHeaders")]
        public bool EnableStrictTransportSecurityHeaders
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.StrictTransportSecurity.maxAge")]
        public string StrictTransportSecurityMaxAge
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.StrictTransportSecurity.includeSubdomains")]
        public string StrictTransportSecurityIncludeSubdomains
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.StrictTransportSecurity.Preload")]
        public string StrictTransportSecurityPreload
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.InstitutionCultureID")]
        public string InstitutionCultureID
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.TimeZone")]
        public string TimeZone
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableTimeZoneOffset")]
        public string EnableTimeZoneOffset
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.TimeZoneOffset")]
        public string TimeZoneOffset
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.Admin.ScheduledTransfers.RestrictDatePickerStartDateHours")]
        public string RestrictDatePickerStartDateHours
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.Admin.ScheduledTransfers.DatePickerEarliestStartDateHour")]
        public int DatePickerEarliestStartDateHour
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.Admin.BaseUrl")]
        public string AdminBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

	    [SettingKey("X.App.HomeBanking.gsAppURL")]
	    public string HomebankingBaseUrl
	    {
	        get => GetValue().TrimEnd('/');
	        set => SetValue(value);
	    }

        [SettingKey("Mobile.Institution.WebDomainWhitelist")]
        public List<string> WebDomainWhitelist
        {
            get => GetListValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.LogForwardedClientIP")]
        public bool LogForwardedClientIp
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Institution.ShouldUseForwardedAuthHeader")]
        public bool ShouldUseForwardedAuthHeader
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.IntraBankRoutingNumber")]
        public string RoutingNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.IntraBankName")]
        public string Name
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
