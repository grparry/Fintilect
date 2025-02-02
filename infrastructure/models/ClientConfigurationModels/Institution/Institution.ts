import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface InstitutionConfig {
    PrivacyPolicy: string;
    EnableContentSecurityPolicyHeaders: boolean;
    XFrameOptionsURLs: string;
    ContentSecurityPolicy: string;
    ServerUtcOffset: number;
    EnableStrictTransportSecurityHeaders: boolean;
    StrictTransportSecurityMaxAge: string;
    StrictTransportSecurityIncludeSubdomains: string;
    StrictTransportSecurityPreload: string;
    InstitutionCultureID: string;
    TimeZone: string;
    EnableTimeZoneOffset: string;
    TimeZoneOffset: string;
    RestrictDatePickerStartDateHours: string;
    DatePickerEarliestStartDateHour: number;
    AdminBaseUrl: string;
    HomebankingBaseUrl: string;
    WebDomainWhitelist: string[];
    LogForwardedClientIp: boolean;
    ShouldUseForwardedAuthHeader: boolean;
    RoutingNumber: string;
    Name: string;
}

export class Institution implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Institution'
    };


            private _privacyPolicy: string;
            get privacyPolicy(): string {
                return this._privacyPolicy;
            }
            set privacyPolicy(value: string) {
                this._privacyPolicy = value;
            }

            private _enableContentSecurityPolicyHeaders: boolean;
            get enableContentSecurityPolicyHeaders(): boolean {
                return this._enableContentSecurityPolicyHeaders;
            }
            set enableContentSecurityPolicyHeaders(value: boolean) {
                this._enableContentSecurityPolicyHeaders = value;
            }

            private _xFrameOptionsURLs: string;
            get xFrameOptionsURLs(): string {
                return this._xFrameOptionsURLs;
            }
            set xFrameOptionsURLs(value: string) {
                this._xFrameOptionsURLs = value;
            }

            private _contentSecurityPolicy: string;
            get contentSecurityPolicy(): string {
                return this._contentSecurityPolicy;
            }
            set contentSecurityPolicy(value: string) {
                this._contentSecurityPolicy = value;
            }

            private _serverUtcOffset: number;
            get serverUtcOffset(): number {
                return this._serverUtcOffset;
            }
            set serverUtcOffset(value: number) {
                this._serverUtcOffset = value;
            }

            private _enableStrictTransportSecurityHeaders: boolean;
            get enableStrictTransportSecurityHeaders(): boolean {
                return this._enableStrictTransportSecurityHeaders;
            }
            set enableStrictTransportSecurityHeaders(value: boolean) {
                this._enableStrictTransportSecurityHeaders = value;
            }

            private _strictTransportSecurityMaxAge: string;
            get strictTransportSecurityMaxAge(): string {
                return this._strictTransportSecurityMaxAge;
            }
            set strictTransportSecurityMaxAge(value: string) {
                this._strictTransportSecurityMaxAge = value;
            }

            private _strictTransportSecurityIncludeSubdomains: string;
            get strictTransportSecurityIncludeSubdomains(): string {
                return this._strictTransportSecurityIncludeSubdomains;
            }
            set strictTransportSecurityIncludeSubdomains(value: string) {
                this._strictTransportSecurityIncludeSubdomains = value;
            }

            private _strictTransportSecurityPreload: string;
            get strictTransportSecurityPreload(): string {
                return this._strictTransportSecurityPreload;
            }
            set strictTransportSecurityPreload(value: string) {
                this._strictTransportSecurityPreload = value;
            }

            private _institutionCultureID: string;
            get institutionCultureID(): string {
                return this._institutionCultureID;
            }
            set institutionCultureID(value: string) {
                this._institutionCultureID = value;
            }

            private _timeZone: string;
            get timeZone(): string {
                return this._timeZone;
            }
            set timeZone(value: string) {
                this._timeZone = value;
            }

            private _enableTimeZoneOffset: string;
            get enableTimeZoneOffset(): string {
                return this._enableTimeZoneOffset;
            }
            set enableTimeZoneOffset(value: string) {
                this._enableTimeZoneOffset = value;
            }

            private _timeZoneOffset: string;
            get timeZoneOffset(): string {
                return this._timeZoneOffset;
            }
            set timeZoneOffset(value: string) {
                this._timeZoneOffset = value;
            }

            private _restrictDatePickerStartDateHours: string;
            get restrictDatePickerStartDateHours(): string {
                return this._restrictDatePickerStartDateHours;
            }
            set restrictDatePickerStartDateHours(value: string) {
                this._restrictDatePickerStartDateHours = value;
            }

            private _datePickerEarliestStartDateHour: number;
            get datePickerEarliestStartDateHour(): number {
                return this._datePickerEarliestStartDateHour;
            }
            set datePickerEarliestStartDateHour(value: number) {
                this._datePickerEarliestStartDateHour = value;
            }

            private _adminBaseUrl: string;
            get adminBaseUrl(): string {
                return this._adminBaseUrl;
            }
            set adminBaseUrl(value: string) {
                this._adminBaseUrl = value;
            }

            private _homebankingBaseUrl: string;
            get homebankingBaseUrl(): string {
                return this._homebankingBaseUrl;
            }
            set homebankingBaseUrl(value: string) {
                this._homebankingBaseUrl = value;
            }

            private _webDomainWhitelist: string[];
            get webDomainWhitelist(): string[] {
                return this._webDomainWhitelist;
            }
            set webDomainWhitelist(value: string[]) {
                this._webDomainWhitelist = value;
            }

            private _logForwardedClientIp: boolean;
            get logForwardedClientIp(): boolean {
                return this._logForwardedClientIp;
            }
            set logForwardedClientIp(value: boolean) {
                this._logForwardedClientIp = value;
            }

            private _shouldUseForwardedAuthHeader: boolean;
            get shouldUseForwardedAuthHeader(): boolean {
                return this._shouldUseForwardedAuthHeader;
            }
            set shouldUseForwardedAuthHeader(value: boolean) {
                this._shouldUseForwardedAuthHeader = value;
            }

            private _routingNumber: string;
            get routingNumber(): string {
                return this._routingNumber;
            }
            set routingNumber(value: string) {
                this._routingNumber = value;
            }

            private _name: string;
            get name(): string {
                return this._name;
            }
            set name(value: string) {
                this._name = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Institution.PrivacyPolicy", value: this._privacyPolicy, dataType: 'string', label: "Privacy Policy" },
                { key: "Institution.EnableContentSecurityPolicyHeaders", value: this._enableContentSecurityPolicyHeaders, dataType: 'boolean', label: "Enable Content Security Policy Headers" },
                { key: "Institution.XFrameOptionsURLs", value: this._xFrameOptionsURLs, dataType: 'string', label: "X Frame Options U R Ls" },
                { key: "Institution.ContentSecurityPolicy", value: this._contentSecurityPolicy, dataType: 'string', label: "Content Security Policy" },
                { key: "Institution.ServerUtcOffset", value: this._serverUtcOffset, dataType: 'number', label: "Server Utc Offset" },
                { key: "Institution.EnableStrictTransportSecurityHeaders", value: this._enableStrictTransportSecurityHeaders, dataType: 'boolean', label: "Enable Strict Transport Security Headers" },
                { key: "Institution.StrictTransportSecurityMaxAge", value: this._strictTransportSecurityMaxAge, dataType: 'string', label: "Strict Transport Security Max Age" },
                { key: "Institution.StrictTransportSecurityIncludeSubdomains", value: this._strictTransportSecurityIncludeSubdomains, dataType: 'string', label: "Strict Transport Security Include Subdomains" },
                { key: "Institution.StrictTransportSecurityPreload", value: this._strictTransportSecurityPreload, dataType: 'string', label: "Strict Transport Security Preload" },
                { key: "Institution.InstitutionCultureID", value: this._institutionCultureID, dataType: 'string', label: "Institution Culture I D" },
                { key: "Institution.TimeZone", value: this._timeZone, dataType: 'string', label: "Time Zone" },
                { key: "Institution.EnableTimeZoneOffset", value: this._enableTimeZoneOffset, dataType: 'string', label: "Enable Time Zone Offset" },
                { key: "Institution.TimeZoneOffset", value: this._timeZoneOffset, dataType: 'string', label: "Time Zone Offset" },
                { key: "Institution.RestrictDatePickerStartDateHours", value: this._restrictDatePickerStartDateHours, dataType: 'string', label: "Restrict Date Picker Start Date Hours" },
                { key: "Institution.DatePickerEarliestStartDateHour", value: this._datePickerEarliestStartDateHour, dataType: 'number', label: "Date Picker Earliest Start Date Hour" },
                { key: "Institution.AdminBaseUrl", value: this._adminBaseUrl, dataType: 'string', label: "Admin Base Url" },
                { key: "Institution.HomebankingBaseUrl", value: this._homebankingBaseUrl, dataType: 'string', label: "Homebanking Base Url" },
                { key: "Institution.WebDomainWhitelist", value: this._webDomainWhitelist, dataType: 'list<string>', label: "Web Domain Whitelist" },
                { key: "Institution.LogForwardedClientIp", value: this._logForwardedClientIp, dataType: 'boolean', label: "Log Forwarded Client Ip" },
                { key: "Institution.ShouldUseForwardedAuthHeader", value: this._shouldUseForwardedAuthHeader, dataType: 'boolean', label: "Should Use Forwarded Auth Header" },
                { key: "Institution.RoutingNumber", value: this._routingNumber, dataType: 'string', label: "Routing Number" },
                { key: "Institution.Name", value: this._name, dataType: 'string', label: "Name" },
            ];
        }

}