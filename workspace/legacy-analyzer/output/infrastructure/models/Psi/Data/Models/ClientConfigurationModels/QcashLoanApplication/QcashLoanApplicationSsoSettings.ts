import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface QcashLoanApplicationSsoSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    MinIosVersion: string;
    MinAndroidVersion: string;
    Url: string;
    MobileUrl: string;
    ApplicationSsoKey: string;
    ApplicationId: string;
    SharedKey: string;
    InternetBankingLocation: string;
    MobileLocation: string;
}

export class QcashLoanApplicationSsoSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'QcashLoanApplicationSsoSettings'
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

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _mobileUrl: string;
            get mobileUrl(): string {
                return this._mobileUrl;
            }
            set mobileUrl(value: string) {
                this._mobileUrl = value;
            }

            private _applicationSsoKey: string;
            get applicationSsoKey(): string {
                return this._applicationSsoKey;
            }
            set applicationSsoKey(value: string) {
                this._applicationSsoKey = value;
            }

            private _applicationId: string;
            get applicationId(): string {
                return this._applicationId;
            }
            set applicationId(value: string) {
                this._applicationId = value;
            }

            private _sharedKey: string;
            get sharedKey(): string {
                return this._sharedKey;
            }
            set sharedKey(value: string) {
                this._sharedKey = value;
            }

            private _internetBankingLocation: string;
            get internetBankingLocation(): string {
                return this._internetBankingLocation;
            }
            set internetBankingLocation(value: string) {
                this._internetBankingLocation = value;
            }

            private _mobileLocation: string;
            get mobileLocation(): string {
                return this._mobileLocation;
            }
            set mobileLocation(value: string) {
                this._mobileLocation = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "QcashLoanApplicationSsoSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "QcashLoanApplicationSsoSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "QcashLoanApplicationSsoSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "QcashLoanApplicationSsoSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "QcashLoanApplicationSsoSettings.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "QcashLoanApplicationSsoSettings.MobileUrl", value: this._mobileUrl, dataType: 'string', label: "Mobile Url" },
                { key: "QcashLoanApplicationSsoSettings.ApplicationSsoKey", value: this._applicationSsoKey, dataType: 'string', label: "Application Sso Key" },
                { key: "QcashLoanApplicationSsoSettings.ApplicationId", value: this._applicationId, dataType: 'string', label: "Application Id" },
                { key: "QcashLoanApplicationSsoSettings.SharedKey", value: this._sharedKey, dataType: 'string', label: "Shared Key" },
                { key: "QcashLoanApplicationSsoSettings.InternetBankingLocation", value: this._internetBankingLocation, dataType: 'string', label: "Internet Banking Location" },
                { key: "QcashLoanApplicationSsoSettings.MobileLocation", value: this._mobileLocation, dataType: 'string', label: "Mobile Location" },
            ];
        }

}