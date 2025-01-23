import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SparkUiConfigurationConfig {
    Enabled: boolean;
    MinVersion: number;
}

export class SparkUiConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SparkUiConfiguration'
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


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SparkUiConfiguration.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SparkUiConfiguration.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
            ];
        }

}