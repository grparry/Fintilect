import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface LarkyConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    ApiKey: string;
}

export class Larky implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Larky'
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

            private _apiKey: string;
            get apiKey(): string {
                return this._apiKey;
            }
            set apiKey(value: string) {
                this._apiKey = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Larky.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "Larky.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "Larky.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Larky.ApiKey", value: this._apiKey, dataType: 'string', label: "Api Key" },
            ];
        }

}