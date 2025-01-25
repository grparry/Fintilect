import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from './Authentication.Authentication';
export interface ChangeAddressConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    MaximumAddressLineLength: number;
    ForeignAddressEnabled: boolean;
    Authentication: Authentication;
}

export class ChangeAddress implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ChangeAddress'
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

            private _maximumAddressLineLength: number;
            get maximumAddressLineLength(): number {
                return this._maximumAddressLineLength;
            }
            set maximumAddressLineLength(value: number) {
                this._maximumAddressLineLength = value;
            }

            private _foreignAddressEnabled: boolean;
            get foreignAddressEnabled(): boolean {
                return this._foreignAddressEnabled;
            }
            set foreignAddressEnabled(value: boolean) {
                this._foreignAddressEnabled = value;
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
                { key: "ChangeAddress.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "ChangeAddress.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "ChangeAddress.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "ChangeAddress.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ChangeAddress.MaximumAddressLineLength", value: this._maximumAddressLineLength, dataType: 'number', label: "Maximum Address Line Length" },
                { key: "ChangeAddress.ForeignAddressEnabled", value: this._foreignAddressEnabled, dataType: 'boolean', label: "Foreign Address Enabled" },
                { key: "ChangeAddress.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}