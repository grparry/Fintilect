import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '@infrastructure/Authentication.Authentication';
export interface CheckingRewardsConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    Url: string;
    Authentication: Authentication;
    ReslovingUrl: string;
}

export class CheckingRewards implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CheckingRewards'
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

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }

            private _reslovingUrl: string;
            get reslovingUrl(): string {
                return this._reslovingUrl;
            }
            set reslovingUrl(value: string) {
                this._reslovingUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CheckingRewards.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "CheckingRewards.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "CheckingRewards.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "CheckingRewards.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "CheckingRewards.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "CheckingRewards.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
                { key: "CheckingRewards.ReslovingUrl", value: this._reslovingUrl, dataType: 'string', label: "Resloving Url" },
            ];
        }

}