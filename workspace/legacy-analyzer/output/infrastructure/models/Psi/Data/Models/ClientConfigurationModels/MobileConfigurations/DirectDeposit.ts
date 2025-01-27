import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '@infrastructure/Authentication.Authentication';
export interface DirectDepositConfig {
    Enabled: boolean;
    Url: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    ShouldShowMenuItem: boolean;
    Authentication: Authentication;
}

export class DirectDeposit implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DirectDeposit'
    };


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

            private _shouldShowMenuItem: boolean;
            get shouldShowMenuItem(): boolean {
                return this._shouldShowMenuItem;
            }
            set shouldShowMenuItem(value: boolean) {
                this._shouldShowMenuItem = value;
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
                { key: "DirectDeposit.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "DirectDeposit.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "DirectDeposit.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "DirectDeposit.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "DirectDeposit.ShouldShowMenuItem", value: this._shouldShowMenuItem, dataType: 'boolean', label: "Should Show Menu Item" },
                { key: "DirectDeposit.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}