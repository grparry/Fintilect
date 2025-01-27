import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '@infrastructure/Authentication.Authentication';
export interface LoanApplicationConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    Url: string;
    ShouldGetMeridianLinkLegacySsoUrl: boolean;
    MortgageLoanEnabled: boolean;
    MortgageLoanUrl: string;
    Authentication: Authentication;
}

export class LoanApplication implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LoanApplication'
    };


            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
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

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _shouldGetMeridianLinkLegacySsoUrl: boolean;
            get shouldGetMeridianLinkLegacySsoUrl(): boolean {
                return this._shouldGetMeridianLinkLegacySsoUrl;
            }
            set shouldGetMeridianLinkLegacySsoUrl(value: boolean) {
                this._shouldGetMeridianLinkLegacySsoUrl = value;
            }

            private _mortgageLoanEnabled: boolean;
            get mortgageLoanEnabled(): boolean {
                return this._mortgageLoanEnabled;
            }
            set mortgageLoanEnabled(value: boolean) {
                this._mortgageLoanEnabled = value;
            }

            private _mortgageLoanUrl: string;
            get mortgageLoanUrl(): string {
                return this._mortgageLoanUrl;
            }
            set mortgageLoanUrl(value: string) {
                this._mortgageLoanUrl = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LoanApplication.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "LoanApplication.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "LoanApplication.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "LoanApplication.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "LoanApplication.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "LoanApplication.ShouldGetMeridianLinkLegacySsoUrl", value: this._shouldGetMeridianLinkLegacySsoUrl, dataType: 'boolean', label: "Should Get Meridian Link Legacy Sso Url" },
                { key: "LoanApplication.MortgageLoanEnabled", value: this._mortgageLoanEnabled, dataType: 'boolean', label: "Mortgage Loan Enabled" },
                { key: "LoanApplication.MortgageLoanUrl", value: this._mortgageLoanUrl, dataType: 'string', label: "Mortgage Loan Url" },
                { key: "LoanApplication.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}