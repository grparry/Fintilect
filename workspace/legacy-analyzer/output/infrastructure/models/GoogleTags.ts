import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface GoogleTagsConfig {
    Enabled: boolean;
    MinVersion: number;
}

export class GoogleTags implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'GoogleTags'
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
                { key: "GoogleTags.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "GoogleTags.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
            ];
        }

}