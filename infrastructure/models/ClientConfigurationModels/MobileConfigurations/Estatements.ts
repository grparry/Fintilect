import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '../Authentication.Authentication';
export interface EstatementsConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    DoximEstatementsEnabled: boolean;
    Authentication: Authentication;
}

export class Estatements implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Estatements'
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

            private _doximEstatementsEnabled: boolean;
            get doximEstatementsEnabled(): boolean {
                return this._doximEstatementsEnabled;
            }
            set doximEstatementsEnabled(value: boolean) {
                this._doximEstatementsEnabled = value;
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
                { key: "Estatements.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "Estatements.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "Estatements.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "Estatements.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Estatements.DoximEstatementsEnabled", value: this._doximEstatementsEnabled, dataType: 'boolean', label: "Doxim Estatements Enabled" },
                { key: "Estatements.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}