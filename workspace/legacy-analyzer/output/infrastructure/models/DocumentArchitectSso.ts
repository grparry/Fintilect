import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DocumentArchitectSsoConfig {
    Enabled: boolean;
    MinVersion: number;
    BaseUrl: string;
    ShouldOpenInNewWindow: boolean;
    HashKey: string;
    AuthUrl: string;
    SsoUrl: string;
    ClientId: string;
}

export class DocumentArchitectSso implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DocumentArchitectSso'
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

            private _baseUrl: string;
            get baseUrl(): string {
                return this._baseUrl;
            }
            set baseUrl(value: string) {
                this._baseUrl = value;
            }

            private _shouldOpenInNewWindow: boolean;
            get shouldOpenInNewWindow(): boolean {
                return this._shouldOpenInNewWindow;
            }
            set shouldOpenInNewWindow(value: boolean) {
                this._shouldOpenInNewWindow = value;
            }

            private _hashKey: string;
            get hashKey(): string {
                return this._hashKey;
            }
            set hashKey(value: string) {
                this._hashKey = value;
            }

            private _authUrl: string;
            get authUrl(): string {
                return this._authUrl;
            }
            set authUrl(value: string) {
                this._authUrl = value;
            }

            private _ssoUrl: string;
            get ssoUrl(): string {
                return this._ssoUrl;
            }
            set ssoUrl(value: string) {
                this._ssoUrl = value;
            }

            private _clientId: string;
            get clientId(): string {
                return this._clientId;
            }
            set clientId(value: string) {
                this._clientId = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DocumentArchitectSso.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "DocumentArchitectSso.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "DocumentArchitectSso.BaseUrl", value: this._baseUrl, dataType: 'string', label: "Base Url" },
                { key: "DocumentArchitectSso.ShouldOpenInNewWindow", value: this._shouldOpenInNewWindow, dataType: 'boolean', label: "Should Open In New Window" },
                { key: "DocumentArchitectSso.HashKey", value: this._hashKey, dataType: 'string', label: "Hash Key" },
                { key: "DocumentArchitectSso.AuthUrl", value: this._authUrl, dataType: 'string', label: "Auth Url" },
                { key: "DocumentArchitectSso.SsoUrl", value: this._ssoUrl, dataType: 'string', label: "Sso Url" },
                { key: "DocumentArchitectSso.ClientId", value: this._clientId, dataType: 'string', label: "Client Id" },
            ];
        }

}