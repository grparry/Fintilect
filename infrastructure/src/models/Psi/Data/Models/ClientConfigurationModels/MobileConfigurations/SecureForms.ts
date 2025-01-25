import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SecureFormsConfig {
    Enabled: boolean;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
}

export class SecureForms implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SecureForms'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
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


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SecureForms.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SecureForms.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "SecureForms.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
            ];
        }

}