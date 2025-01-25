import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MemberViewConfig {
    Enabled: boolean;
    MinVersion: number;
    LoginKeyExpiresInMinutes: number;
    SsoBaseUrl: string;
    FullAccessEnabled: boolean;
    ExternalSsoEnabled: boolean;
    ExternalSsoIpWhitelist: string;
}

export class MemberView implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MemberView'
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

            private _loginKeyExpiresInMinutes: number;
            get loginKeyExpiresInMinutes(): number {
                return this._loginKeyExpiresInMinutes;
            }
            set loginKeyExpiresInMinutes(value: number) {
                this._loginKeyExpiresInMinutes = value;
            }

            private _ssoBaseUrl: string;
            get ssoBaseUrl(): string {
                return this._ssoBaseUrl;
            }
            set ssoBaseUrl(value: string) {
                this._ssoBaseUrl = value;
            }

            private _fullAccessEnabled: boolean;
            get fullAccessEnabled(): boolean {
                return this._fullAccessEnabled;
            }
            set fullAccessEnabled(value: boolean) {
                this._fullAccessEnabled = value;
            }

            private _externalSsoEnabled: boolean;
            get externalSsoEnabled(): boolean {
                return this._externalSsoEnabled;
            }
            set externalSsoEnabled(value: boolean) {
                this._externalSsoEnabled = value;
            }

            private _externalSsoIpWhitelist: string;
            get externalSsoIpWhitelist(): string {
                return this._externalSsoIpWhitelist;
            }
            set externalSsoIpWhitelist(value: string) {
                this._externalSsoIpWhitelist = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MemberView.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MemberView.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "MemberView.LoginKeyExpiresInMinutes", value: this._loginKeyExpiresInMinutes, dataType: 'number', label: "Login Key Expires In Minutes" },
                { key: "MemberView.SsoBaseUrl", value: this._ssoBaseUrl, dataType: 'string', label: "Sso Base Url" },
                { key: "MemberView.FullAccessEnabled", value: this._fullAccessEnabled, dataType: 'boolean', label: "Full Access Enabled" },
                { key: "MemberView.ExternalSsoEnabled", value: this._externalSsoEnabled, dataType: 'boolean', label: "External Sso Enabled" },
                { key: "MemberView.ExternalSsoIpWhitelist", value: this._externalSsoIpWhitelist, dataType: 'string', label: "External Sso Ip Whitelist" },
            ];
        }

}