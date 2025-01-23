import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ReCaptchaSettingsConfig {
    ReCaptchaEnabled: boolean;
    MinVersion: number;
    SiteKey: string;
    SecretKey: string;
    ShouldUseInvisibleCheckbox: boolean;
    InvisibleSiteKey: string;
    InvisibleSecretKey: string;
    IpWhitelistEnabled: boolean;
    IpWhitelist: string[];
}

export class ReCaptchaSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ReCaptchaSettings'
    };


            private _reCaptchaEnabled: boolean;
            get reCaptchaEnabled(): boolean {
                return this._reCaptchaEnabled;
            }
            set reCaptchaEnabled(value: boolean) {
                this._reCaptchaEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _siteKey: string;
            get siteKey(): string {
                return this._siteKey;
            }
            set siteKey(value: string) {
                this._siteKey = value;
            }

            private _secretKey: string;
            get secretKey(): string {
                return this._secretKey;
            }
            set secretKey(value: string) {
                this._secretKey = value;
            }

            private _shouldUseInvisibleCheckbox: boolean;
            get shouldUseInvisibleCheckbox(): boolean {
                return this._shouldUseInvisibleCheckbox;
            }
            set shouldUseInvisibleCheckbox(value: boolean) {
                this._shouldUseInvisibleCheckbox = value;
            }

            private _invisibleSiteKey: string;
            get invisibleSiteKey(): string {
                return this._invisibleSiteKey;
            }
            set invisibleSiteKey(value: string) {
                this._invisibleSiteKey = value;
            }

            private _invisibleSecretKey: string;
            get invisibleSecretKey(): string {
                return this._invisibleSecretKey;
            }
            set invisibleSecretKey(value: string) {
                this._invisibleSecretKey = value;
            }

            private _ipWhitelistEnabled: boolean;
            get ipWhitelistEnabled(): boolean {
                return this._ipWhitelistEnabled;
            }
            set ipWhitelistEnabled(value: boolean) {
                this._ipWhitelistEnabled = value;
            }

            private _ipWhitelist: string[];
            get ipWhitelist(): string[] {
                return this._ipWhitelist;
            }
            set ipWhitelist(value: string[]) {
                this._ipWhitelist = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ReCaptchaSettings.ReCaptchaEnabled", value: this._reCaptchaEnabled, dataType: 'boolean', label: "Re Captcha Enabled" },
                { key: "ReCaptchaSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "ReCaptchaSettings.SiteKey", value: this._siteKey, dataType: 'string', label: "Site Key" },
                { key: "ReCaptchaSettings.SecretKey", value: this._secretKey, dataType: 'string', label: "Secret Key" },
                { key: "ReCaptchaSettings.ShouldUseInvisibleCheckbox", value: this._shouldUseInvisibleCheckbox, dataType: 'boolean', label: "Should Use Invisible Checkbox" },
                { key: "ReCaptchaSettings.InvisibleSiteKey", value: this._invisibleSiteKey, dataType: 'string', label: "Invisible Site Key" },
                { key: "ReCaptchaSettings.InvisibleSecretKey", value: this._invisibleSecretKey, dataType: 'string', label: "Invisible Secret Key" },
                { key: "ReCaptchaSettings.IpWhitelistEnabled", value: this._ipWhitelistEnabled, dataType: 'boolean', label: "Ip Whitelist Enabled" },
                { key: "ReCaptchaSettings.IpWhitelist", value: this._ipWhitelist, dataType: 'list<string>', label: "Ip Whitelist" },
            ];
        }

}