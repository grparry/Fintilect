import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface FlexUiConfigurationConfig {
    Enabled: boolean;
    MinVersion: number;
}

export class FlexUiConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FlexUiConfiguration'
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
                { key: "FlexUiConfiguration.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "FlexUiConfiguration.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
            ];
        }

}