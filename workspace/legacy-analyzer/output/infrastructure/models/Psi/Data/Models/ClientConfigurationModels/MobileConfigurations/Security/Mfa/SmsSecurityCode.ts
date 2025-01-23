import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SmsSecurityCodeConfig {
    Enabled: boolean;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
}

export class SmsSecurityCode implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SmsSecurityCode'
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
                { key: "SmsSecurityCode.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SmsSecurityCode.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "SmsSecurityCode.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
            ];
        }

}