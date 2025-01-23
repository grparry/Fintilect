import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from './Authentication.Authentication';
export interface FicoCreditScoreConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    Authentication: Authentication;
}

export class FicoCreditScore implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FicoCreditScore'
    };


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


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "FicoCreditScore.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "FicoCreditScore.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "FicoCreditScore.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "FicoCreditScore.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}