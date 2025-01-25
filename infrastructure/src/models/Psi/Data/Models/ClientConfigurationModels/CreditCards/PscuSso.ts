import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PscuSsoConfig {
    Enabled: boolean;
    MinVersion: number;
    Url: string;
    CertificationStore: string;
    CertificationEmergePrivateThumbPrint: string;
    CertificationVendorPublicThumbPrint: string;
    Issuer: string;
    ResponseIssuer: string;
    AppId: string;
    ClientId: string;
    KeepAliveUrl: string;
    AssertionLogEnabled: boolean;
}

export class PscuSso implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PscuSso'
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

            private _issuer: string;
            get issuer(): string {
                return this._issuer;
            }
            set issuer(value: string) {
                this._issuer = value;
            }

            private _responseIssuer: string;
            get responseIssuer(): string {
                return this._responseIssuer;
            }
            set responseIssuer(value: string) {
                this._responseIssuer = value;
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

            private _keepAliveUrl: string;
            get keepAliveUrl(): string {
                return this._keepAliveUrl;
            }
            set keepAliveUrl(value: string) {
                this._keepAliveUrl = value;
            }

            private _assertionLogEnabled: boolean;
            get assertionLogEnabled(): boolean {
                return this._assertionLogEnabled;
            }
            set assertionLogEnabled(value: boolean) {
                this._assertionLogEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PscuSso.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "PscuSso.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "PscuSso.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "PscuSso.CertificationStore", value: this._certificationStore, dataType: 'string', label: "Certification Store" },
                { key: "PscuSso.CertificationEmergePrivateThumbPrint", value: this._certificationEmergePrivateThumbPrint, dataType: 'string', label: "Certification Emerge Private Thumb Print" },
                { key: "PscuSso.CertificationVendorPublicThumbPrint", value: this._certificationVendorPublicThumbPrint, dataType: 'string', label: "Certification Vendor Public Thumb Print" },
                { key: "PscuSso.Issuer", value: this._issuer, dataType: 'string', label: "Issuer" },
                { key: "PscuSso.ResponseIssuer", value: this._responseIssuer, dataType: 'string', label: "Response Issuer" },
                { key: "PscuSso.AppId", value: this._appId, dataType: 'string', label: "App Id" },
                { key: "PscuSso.ClientId", value: this._clientId, dataType: 'string', label: "Client Id" },
                { key: "PscuSso.KeepAliveUrl", value: this._keepAliveUrl, dataType: 'string', label: "Keep Alive Url" },
                { key: "PscuSso.AssertionLogEnabled", value: this._assertionLogEnabled, dataType: 'boolean', label: "Assertion Log Enabled" },
            ];
        }

}