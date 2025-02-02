import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface InfoImageEstatementsSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    MinAndroidVersion: string;
    MinIosVersion: string;
    SsoClientCodeId: string;
    SsoPassword: string;
    SsoUrl: string;
    SsoRedirectUrl: string;
}

export class InfoImageEstatementsSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'InfoImageEstatementsSettings'
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

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _ssoClientCodeId: string;
            get ssoClientCodeId(): string {
                return this._ssoClientCodeId;
            }
            set ssoClientCodeId(value: string) {
                this._ssoClientCodeId = value;
            }

            private _ssoPassword: string;
            get ssoPassword(): string {
                return this._ssoPassword;
            }
            set ssoPassword(value: string) {
                this._ssoPassword = value;
            }

            private _ssoUrl: string;
            get ssoUrl(): string {
                return this._ssoUrl;
            }
            set ssoUrl(value: string) {
                this._ssoUrl = value;
            }

            private _ssoRedirectUrl: string;
            get ssoRedirectUrl(): string {
                return this._ssoRedirectUrl;
            }
            set ssoRedirectUrl(value: string) {
                this._ssoRedirectUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "InfoImageEstatementsSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "InfoImageEstatementsSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "InfoImageEstatementsSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "InfoImageEstatementsSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "InfoImageEstatementsSettings.SsoClientCodeId", value: this._ssoClientCodeId, dataType: 'string', label: "Sso Client Code Id" },
                { key: "InfoImageEstatementsSettings.SsoPassword", value: this._ssoPassword, dataType: 'string', label: "Sso Password" },
                { key: "InfoImageEstatementsSettings.SsoUrl", value: this._ssoUrl, dataType: 'string', label: "Sso Url" },
                { key: "InfoImageEstatementsSettings.SsoRedirectUrl", value: this._ssoRedirectUrl, dataType: 'string', label: "Sso Redirect Url" },
            ];
        }

}