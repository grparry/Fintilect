import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { OutOfBandActionSetting } from '../OutOfBandActionSetting';
import { Authentication } from '../MobileConfigurations.Authentication.Authentication';
export interface OutOfBandAuthenticationConfig {
    Enabled: boolean;
    MinVersion: number;
    MinimumIosVersion: string;
    MinimumAndroidVersion: string;
    OutOfBandActionSettings: OutOfBandActionSetting[];
    Authentication: Authentication;
}

export class OutOfBandAuthentication implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OutOfBandAuthentication'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _outOfBandActionSettings: OutOfBandActionSetting[];
            get outOfBandActionSettings(): OutOfBandActionSetting[] {
                return this._outOfBandActionSettings;
            }
            set outOfBandActionSettings(value: OutOfBandActionSetting[]) {
                this._outOfBandActionSettings = value;
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
                { key: "OutOfBandAuthentication.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "OutOfBandAuthentication.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "OutOfBandAuthentication.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "OutOfBandAuthentication.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "OutOfBandAuthentication.OutOfBandActionSettings", value: this._outOfBandActionSettings, dataType: 'array<OutOfBandActionSetting>', label: "Out Of Band Action Settings" },
                { key: "OutOfBandAuthentication.Authentication", value: this._authentication, dataType: 'mobileconfigurations.authentication.authentication', label: "Authentication" },
            ];
        }

}