import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '@infrastructure/Authentication.Authentication';
export interface CardlyticsConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    NearMeEnabled: boolean;
    Authentication: Authentication;
}

export class Cardlytics implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Cardlytics'
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

            private _nearMeEnabled: boolean;
            get nearMeEnabled(): boolean {
                return this._nearMeEnabled;
            }
            set nearMeEnabled(value: boolean) {
                this._nearMeEnabled = value;
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
                { key: "Cardlytics.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "Cardlytics.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "Cardlytics.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "Cardlytics.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Cardlytics.NearMeEnabled", value: this._nearMeEnabled, dataType: 'boolean', label: "Near Me Enabled" },
                { key: "Cardlytics.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}