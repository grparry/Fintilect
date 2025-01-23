import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from './Authentication';
export interface ChangeEmailConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    EmailType: string;
    Authentication: Authentication;
}

export class ChangeEmail implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ChangeEmail'
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

            private _emailType: string;
            get emailType(): string {
                return this._emailType;
            }
            set emailType(value: string) {
                this._emailType = value;
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
                { key: "ChangeEmail.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "ChangeEmail.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "ChangeEmail.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "ChangeEmail.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ChangeEmail.EmailType", value: this._emailType, dataType: 'string', label: "Email Type" },
                { key: "ChangeEmail.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}