import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PinChangeConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    ShouldLoadWhenCardListLoads: boolean;
}

export class PinChange implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PinChange'
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

            private _shouldLoadWhenCardListLoads: boolean;
            get shouldLoadWhenCardListLoads(): boolean {
                return this._shouldLoadWhenCardListLoads;
            }
            set shouldLoadWhenCardListLoads(value: boolean) {
                this._shouldLoadWhenCardListLoads = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PinChange.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "PinChange.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "PinChange.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "PinChange.ShouldLoadWhenCardListLoads", value: this._shouldLoadWhenCardListLoads, dataType: 'boolean', label: "Should Load When Card List Loads" },
            ];
        }

}