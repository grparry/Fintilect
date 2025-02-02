import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface OmahaSsoConfig {
    Enabled: boolean;
    MinVersion: number;
    Url: string;
    CertificationStore: string;
    CertificationEmergePrivateThumbPrint: string;
    CertificationVendorPublicThumbPrint: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    ResponseIssuer: string;
    StartUrl: string;
    ReturnUrl: string;
    LogoutUrl: string;
    AppId: string;
    ClientId: string;
    AssertionLogEnabled: boolean;
    Issuer: string;
}

export class OmahaSso implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OmahaSso'
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

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _certificationStore: string;
            get certificationStore(): string {
                return this._certificationStore;
            }
            set certificationStore(value: string) {
                this._certificationStore = value;
            }

            private _certificationEmergePrivateThumbPrint: string;
            get certificationEmergePrivateThumbPrint(): string {
                return this._certificationEmergePrivateThumbPrint;
            }
            set certificationEmergePrivateThumbPrint(value: string) {
                this._certificationEmergePrivateThumbPrint = value;
            }

            private _certificationVendorPublicThumbPrint: string;
            get certificationVendorPublicThumbPrint(): string {
                return this._certificationVendorPublicThumbPrint;
            }
            set certificationVendorPublicThumbPrint(value: string) {
                this._certificationVendorPublicThumbPrint = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _responseIssuer: string;
            get responseIssuer(): string {
                return this._responseIssuer;
            }
            set responseIssuer(value: string) {
                this._responseIssuer = value;
            }

            private _startUrl: string;
            get startUrl(): string {
                return this._startUrl;
            }
            set startUrl(value: string) {
                this._startUrl = value;
            }

            private _returnUrl: string;
            get returnUrl(): string {
                return this._returnUrl;
            }
            set returnUrl(value: string) {
                this._returnUrl = value;
            }

            private _logoutUrl: string;
            get logoutUrl(): string {
                return this._logoutUrl;
            }
            set logoutUrl(value: string) {
                this._logoutUrl = value;
            }

            private _appId: string;
            get appId(): string {
                return this._appId;
            }
            set appId(value: string) {
                this._appId = value;
            }

            private _clientId: string;
            get clientId(): string {
                return this._clientId;
            }
            set clientId(value: string) {
                this._clientId = value;
            }

            private _assertionLogEnabled: boolean;
            get assertionLogEnabled(): boolean {
                return this._assertionLogEnabled;
            }
            set assertionLogEnabled(value: boolean) {
                this._assertionLogEnabled = value;
            }

            private _issuer: string;
            get issuer(): string {
                return this._issuer;
            }
            set issuer(value: string) {
                this._issuer = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OmahaSso.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "OmahaSso.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "OmahaSso.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "OmahaSso.CertificationStore", value: this._certificationStore, dataType: 'string', label: "Certification Store" },
                { key: "OmahaSso.CertificationEmergePrivateThumbPrint", value: this._certificationEmergePrivateThumbPrint, dataType: 'string', label: "Certification Emerge Private Thumb Print" },
                { key: "OmahaSso.CertificationVendorPublicThumbPrint", value: this._certificationVendorPublicThumbPrint, dataType: 'string', label: "Certification Vendor Public Thumb Print" },
                { key: "OmahaSso.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "OmahaSso.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "OmahaSso.ResponseIssuer", value: this._responseIssuer, dataType: 'string', label: "Response Issuer" },
                { key: "OmahaSso.StartUrl", value: this._startUrl, dataType: 'string', label: "Start Url" },
                { key: "OmahaSso.ReturnUrl", value: this._returnUrl, dataType: 'string', label: "Return Url" },
                { key: "OmahaSso.LogoutUrl", value: this._logoutUrl, dataType: 'string', label: "Logout Url" },
                { key: "OmahaSso.AppId", value: this._appId, dataType: 'string', label: "App Id" },
                { key: "OmahaSso.ClientId", value: this._clientId, dataType: 'string', label: "Client Id" },
                { key: "OmahaSso.AssertionLogEnabled", value: this._assertionLogEnabled, dataType: 'boolean', label: "Assertion Log Enabled" },
                { key: "OmahaSso.Issuer", value: this._issuer, dataType: 'string', label: "Issuer" },
            ];
        }

}