// Generated imports
import { WebDomainWhitelist } from '../WebDomainWhitelist';

export interface Institution {
    /** @settingKey Institution.PrivacyPolicy */
    privacyPolicy: string;
    /** @settingKey Institution.EnableContentSecurityPolicyHeaders */
    enableContentSecurityPolicyHeaders: boolean;
    /** @settingKey Institution.XFrameOptionsURLs */
    xFrameOptionsURLs: string;
    /** @settingKey Institution.ContentSecurityPolicy */
    contentSecurityPolicy: string;
    /** @settingKey Institution.UtcOffset */
    serverUtcOffset: number;
    /** @settingKey Institution.EnableStrictTransportSecurityHeaders */
    enableStrictTransportSecurityHeaders: boolean;
    /** @settingKey Institution.StrictTransportSecurity.maxAge */
    strictTransportSecurityMaxAge: string;
    /** @settingKey Institution.StrictTransportSecurity.includeSubdomains */
    strictTransportSecurityIncludeSubdomains: string;
    /** @settingKey Institution.StrictTransportSecurity.Preload */
    strictTransportSecurityPreload: string;
    /** @settingKey X.App.HomeBanking.InstitutionCultureID */
    institutionCultureID: string;
    /** @settingKey X.App.HomeBanking.TimeZone */
    timeZone: string;
    /** @settingKey X.App.HomeBanking.EnableTimeZoneOffset */
    enableTimeZoneOffset: string;
    /** @settingKey X.App.HomeBanking.TimeZoneOffset */
    timeZoneOffset: string;
    /** @settingKey Institution.Admin.ScheduledTransfers.RestrictDatePickerStartDateHours */
    restrictDatePickerStartDateHours: string;
    /** @settingKey Institution.Admin.ScheduledTransfers.DatePickerEarliestStartDateHour */
    datePickerEarliestStartDateHour: number;
    /** @settingKey Institution.Admin.BaseUrl */
    adminBaseUrl: string;
    /** @settingKey X.App.HomeBanking.gsAppURL */
    homebankingBaseUrl: string;
    /** @settingKey Mobile.Institution.WebDomainWhitelist */
    list: WebDomainWhitelist;
    /** @settingKey X.App.HomeBanking.LogForwardedClientIP */
    logForwardedClientIp: boolean;
    /** @settingKey Institution.ShouldUseForwardedAuthHeader */
    shouldUseForwardedAuthHeader: boolean;
    /** @settingKey X.App.HomeBanking.IntraBankRoutingNumber */
    routingNumber: string;
    /** @settingKey X.App.HomeBanking.IntraBankName */
    name: string;
}
