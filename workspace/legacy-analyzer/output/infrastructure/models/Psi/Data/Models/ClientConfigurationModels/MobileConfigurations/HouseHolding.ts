import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '@infrastructure/Authentication.Authentication';
export interface HouseHoldingConfig {
    Enabled: boolean;
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    PermissionsUrl: string;
    Authentication: Authentication;
}

export class HouseHolding implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'HouseHolding'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

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

            private _permissionsUrl: string;
            get permissionsUrl(): string {
                return this._permissionsUrl;
            }
            set permissionsUrl(value: string) {
                this._permissionsUrl = value;
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
                { key: "HouseHolding.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "HouseHolding.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "HouseHolding.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "HouseHolding.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "HouseHolding.PermissionsUrl", value: this._permissionsUrl, dataType: 'string', label: "Permissions Url" },
                { key: "HouseHolding.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}