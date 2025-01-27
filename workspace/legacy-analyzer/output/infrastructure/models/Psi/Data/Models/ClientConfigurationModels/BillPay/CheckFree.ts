import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { CheckFreeAdmin } from '@infrastructure/CheckFreeAdmin';
export interface CheckFreeConfig {
    Enabled: boolean;
    MinVersion: number;
    CheckFreeAccountTypes: Record<string, string>;
    BaseUrl: string;
    BuilderBaseUrl: string;
    AuthSsoUrl: string;
    SubscriberServiceUrl: string;
    SessionServiceUrl: string;
    KeyManagementUrl: string;
    CertificationBaseUrl: string;
    RegularBaseUrl: string;
    BuilderCertificationBaseUrl: string;
    BuilderRegularBaseUrl: string;
    ClientAppText: string;
    ClientAppVersion: string;
    ClientCertificateName: string;
    AuthSsoEndPoint: string;
    SubscriberServiceEndPoint: string;
    SessionServiceEndPoint: string;
    KeyManagementEndPoint: string;
    IsCertification: boolean;
    IsSolicitationAllowed: boolean;
    Products: Record<string, string>;
    SponsorId: string;
    SubscriberPwDefaultForAll: string;
    TimeZoneOffset: number;
    RoutingNumber: string;
    GeneratedKeyLength: number;
    ServiceRunConfiguration: string;
    SubscriberInfoCallEnabled: boolean;
    SessionServiceVersion: string;
    Admin: CheckFreeAdmin;
}

export class CheckFree implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CheckFree'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _checkFreeAccountTypes: Record<string, string>;
            get checkFreeAccountTypes(): Record<string, string> {
                return this._checkFreeAccountTypes;
            }
            set checkFreeAccountTypes(value: Record<string, string>) {
                this._checkFreeAccountTypes = value;
            }

            private _baseUrl: string;
            get baseUrl(): string {
                return this._baseUrl;
            }
            set baseUrl(value: string) {
                this._baseUrl = value;
            }

            private _builderBaseUrl: string;
            get builderBaseUrl(): string {
                return this._builderBaseUrl;
            }
            set builderBaseUrl(value: string) {
                this._builderBaseUrl = value;
            }

            private _authSsoUrl: string;
            get authSsoUrl(): string {
                return this._authSsoUrl;
            }
            set authSsoUrl(value: string) {
                this._authSsoUrl = value;
            }

            private _subscriberServiceUrl: string;
            get subscriberServiceUrl(): string {
                return this._subscriberServiceUrl;
            }
            set subscriberServiceUrl(value: string) {
                this._subscriberServiceUrl = value;
            }

            private _sessionServiceUrl: string;
            get sessionServiceUrl(): string {
                return this._sessionServiceUrl;
            }
            set sessionServiceUrl(value: string) {
                this._sessionServiceUrl = value;
            }

            private _keyManagementUrl: string;
            get keyManagementUrl(): string {
                return this._keyManagementUrl;
            }
            set keyManagementUrl(value: string) {
                this._keyManagementUrl = value;
            }

            private _certificationBaseUrl: string;
            get certificationBaseUrl(): string {
                return this._certificationBaseUrl;
            }
            set certificationBaseUrl(value: string) {
                this._certificationBaseUrl = value;
            }

            private _regularBaseUrl: string;
            get regularBaseUrl(): string {
                return this._regularBaseUrl;
            }
            set regularBaseUrl(value: string) {
                this._regularBaseUrl = value;
            }

            private _builderCertificationBaseUrl: string;
            get builderCertificationBaseUrl(): string {
                return this._builderCertificationBaseUrl;
            }
            set builderCertificationBaseUrl(value: string) {
                this._builderCertificationBaseUrl = value;
            }

            private _builderRegularBaseUrl: string;
            get builderRegularBaseUrl(): string {
                return this._builderRegularBaseUrl;
            }
            set builderRegularBaseUrl(value: string) {
                this._builderRegularBaseUrl = value;
            }

            private _clientAppText: string;
            get clientAppText(): string {
                return this._clientAppText;
            }
            set clientAppText(value: string) {
                this._clientAppText = value;
            }

            private _clientAppVersion: string;
            get clientAppVersion(): string {
                return this._clientAppVersion;
            }
            set clientAppVersion(value: string) {
                this._clientAppVersion = value;
            }

            private _clientCertificateName: string;
            get clientCertificateName(): string {
                return this._clientCertificateName;
            }
            set clientCertificateName(value: string) {
                this._clientCertificateName = value;
            }

            private _authSsoEndPoint: string;
            get authSsoEndPoint(): string {
                return this._authSsoEndPoint;
            }
            set authSsoEndPoint(value: string) {
                this._authSsoEndPoint = value;
            }

            private _subscriberServiceEndPoint: string;
            get subscriberServiceEndPoint(): string {
                return this._subscriberServiceEndPoint;
            }
            set subscriberServiceEndPoint(value: string) {
                this._subscriberServiceEndPoint = value;
            }

            private _sessionServiceEndPoint: string;
            get sessionServiceEndPoint(): string {
                return this._sessionServiceEndPoint;
            }
            set sessionServiceEndPoint(value: string) {
                this._sessionServiceEndPoint = value;
            }

            private _keyManagementEndPoint: string;
            get keyManagementEndPoint(): string {
                return this._keyManagementEndPoint;
            }
            set keyManagementEndPoint(value: string) {
                this._keyManagementEndPoint = value;
            }

            private _isCertification: boolean;
            get isCertification(): boolean {
                return this._isCertification;
            }
            set isCertification(value: boolean) {
                this._isCertification = value;
            }

            private _isSolicitationAllowed: boolean;
            get isSolicitationAllowed(): boolean {
                return this._isSolicitationAllowed;
            }
            set isSolicitationAllowed(value: boolean) {
                this._isSolicitationAllowed = value;
            }

            private _products: Record<string, string>;
            get products(): Record<string, string> {
                return this._products;
            }
            set products(value: Record<string, string>) {
                this._products = value;
            }

            private _sponsorId: string;
            get sponsorId(): string {
                return this._sponsorId;
            }
            set sponsorId(value: string) {
                this._sponsorId = value;
            }

            private _subscriberPwDefaultForAll: string;
            get subscriberPwDefaultForAll(): string {
                return this._subscriberPwDefaultForAll;
            }
            set subscriberPwDefaultForAll(value: string) {
                this._subscriberPwDefaultForAll = value;
            }

            private _timeZoneOffset: number;
            get timeZoneOffset(): number {
                return this._timeZoneOffset;
            }
            set timeZoneOffset(value: number) {
                this._timeZoneOffset = value;
            }

            private _routingNumber: string;
            get routingNumber(): string {
                return this._routingNumber;
            }
            set routingNumber(value: string) {
                this._routingNumber = value;
            }

            private _generatedKeyLength: number;
            get generatedKeyLength(): number {
                return this._generatedKeyLength;
            }
            set generatedKeyLength(value: number) {
                this._generatedKeyLength = value;
            }

            private _serviceRunConfiguration: string;
            get serviceRunConfiguration(): string {
                return this._serviceRunConfiguration;
            }
            set serviceRunConfiguration(value: string) {
                this._serviceRunConfiguration = value;
            }

            private _subscriberInfoCallEnabled: boolean;
            get subscriberInfoCallEnabled(): boolean {
                return this._subscriberInfoCallEnabled;
            }
            set subscriberInfoCallEnabled(value: boolean) {
                this._subscriberInfoCallEnabled = value;
            }

            private _sessionServiceVersion: string;
            get sessionServiceVersion(): string {
                return this._sessionServiceVersion;
            }
            set sessionServiceVersion(value: string) {
                this._sessionServiceVersion = value;
            }

            private _admin: CheckFreeAdmin;
            get admin(): CheckFreeAdmin {
                return this._admin;
            }
            set admin(value: CheckFreeAdmin) {
                this._admin = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CheckFree.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "CheckFree.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "CheckFree.CheckFreeAccountTypes", value: this._checkFreeAccountTypes, dataType: 'record<string, string>', label: "Check Free Account Types" },
                { key: "CheckFree.BaseUrl", value: this._baseUrl, dataType: 'string', label: "Base Url" },
                { key: "CheckFree.BuilderBaseUrl", value: this._builderBaseUrl, dataType: 'string', label: "Builder Base Url" },
                { key: "CheckFree.AuthSsoUrl", value: this._authSsoUrl, dataType: 'string', label: "Auth Sso Url" },
                { key: "CheckFree.SubscriberServiceUrl", value: this._subscriberServiceUrl, dataType: 'string', label: "Subscriber Service Url" },
                { key: "CheckFree.SessionServiceUrl", value: this._sessionServiceUrl, dataType: 'string', label: "Session Service Url" },
                { key: "CheckFree.KeyManagementUrl", value: this._keyManagementUrl, dataType: 'string', label: "Key Management Url" },
                { key: "CheckFree.CertificationBaseUrl", value: this._certificationBaseUrl, dataType: 'string', label: "Certification Base Url" },
                { key: "CheckFree.RegularBaseUrl", value: this._regularBaseUrl, dataType: 'string', label: "Regular Base Url" },
                { key: "CheckFree.BuilderCertificationBaseUrl", value: this._builderCertificationBaseUrl, dataType: 'string', label: "Builder Certification Base Url" },
                { key: "CheckFree.BuilderRegularBaseUrl", value: this._builderRegularBaseUrl, dataType: 'string', label: "Builder Regular Base Url" },
                { key: "CheckFree.ClientAppText", value: this._clientAppText, dataType: 'string', label: "Client App Text" },
                { key: "CheckFree.ClientAppVersion", value: this._clientAppVersion, dataType: 'string', label: "Client App Version" },
                { key: "CheckFree.ClientCertificateName", value: this._clientCertificateName, dataType: 'string', label: "Client Certificate Name" },
                { key: "CheckFree.AuthSsoEndPoint", value: this._authSsoEndPoint, dataType: 'string', label: "Auth Sso End Point" },
                { key: "CheckFree.SubscriberServiceEndPoint", value: this._subscriberServiceEndPoint, dataType: 'string', label: "Subscriber Service End Point" },
                { key: "CheckFree.SessionServiceEndPoint", value: this._sessionServiceEndPoint, dataType: 'string', label: "Session Service End Point" },
                { key: "CheckFree.KeyManagementEndPoint", value: this._keyManagementEndPoint, dataType: 'string', label: "Key Management End Point" },
                { key: "CheckFree.IsCertification", value: this._isCertification, dataType: 'boolean', label: "Is Certification" },
                { key: "CheckFree.IsSolicitationAllowed", value: this._isSolicitationAllowed, dataType: 'boolean', label: "Is Solicitation Allowed" },
                { key: "CheckFree.Products", value: this._products, dataType: 'record<string, string>', label: "Products" },
                { key: "CheckFree.SponsorId", value: this._sponsorId, dataType: 'string', label: "Sponsor Id" },
                { key: "CheckFree.SubscriberPwDefaultForAll", value: this._subscriberPwDefaultForAll, dataType: 'string', label: "Subscriber Pw Default For All" },
                { key: "CheckFree.TimeZoneOffset", value: this._timeZoneOffset, dataType: 'number', label: "Time Zone Offset" },
                { key: "CheckFree.RoutingNumber", value: this._routingNumber, dataType: 'string', label: "Routing Number" },
                { key: "CheckFree.GeneratedKeyLength", value: this._generatedKeyLength, dataType: 'number', label: "Generated Key Length" },
                { key: "CheckFree.ServiceRunConfiguration", value: this._serviceRunConfiguration, dataType: 'string', label: "Service Run Configuration" },
                { key: "CheckFree.SubscriberInfoCallEnabled", value: this._subscriberInfoCallEnabled, dataType: 'boolean', label: "Subscriber Info Call Enabled" },
                { key: "CheckFree.SessionServiceVersion", value: this._sessionServiceVersion, dataType: 'string', label: "Session Service Version" },
                { key: "CheckFree.Admin", value: this._admin, dataType: 'checkfreeadmin', label: "Admin" },
            ];
        }

}