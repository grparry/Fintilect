import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '@infrastructure/Authentication.Authentication';
export interface SendMoneyConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    LandingEnabled: boolean;
    DefaultBusinessFirstName: string;
    Authentication: Authentication;
}

export class SendMoney implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SendMoney'
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

            private _landingEnabled: boolean;
            get landingEnabled(): boolean {
                return this._landingEnabled;
            }
            set landingEnabled(value: boolean) {
                this._landingEnabled = value;
            }

            private _defaultBusinessFirstName: string;
            get defaultBusinessFirstName(): string {
                return this._defaultBusinessFirstName;
            }
            set defaultBusinessFirstName(value: string) {
                this._defaultBusinessFirstName = value;
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
                { key: "SendMoney.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "SendMoney.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "SendMoney.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "SendMoney.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SendMoney.LandingEnabled", value: this._landingEnabled, dataType: 'boolean', label: "Landing Enabled" },
                { key: "SendMoney.DefaultBusinessFirstName", value: this._defaultBusinessFirstName, dataType: 'string', label: "Default Business First Name" },
                { key: "SendMoney.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}