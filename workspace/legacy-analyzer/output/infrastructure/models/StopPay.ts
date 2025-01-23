import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from './Authentication';
export interface StopPayConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    Authentication: Authentication;
    Url: string;
}

export class StopPay implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'StopPay'
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

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "StopPay.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "StopPay.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "StopPay.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "StopPay.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "StopPay.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
                { key: "StopPay.Url", value: this._url, dataType: 'string', label: "Url" },
            ];
        }

}