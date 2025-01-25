import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface LinkedAccountHistoryConfig {
    Enabled: boolean;
    MinVersion: number;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    MaximumRecordsToReturn: number;
}

export class LinkedAccountHistory implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LinkedAccountHistory'
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

            private _maximumRecordsToReturn: number;
            get maximumRecordsToReturn(): number {
                return this._maximumRecordsToReturn;
            }
            set maximumRecordsToReturn(value: number) {
                this._maximumRecordsToReturn = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LinkedAccountHistory.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "LinkedAccountHistory.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "LinkedAccountHistory.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "LinkedAccountHistory.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "LinkedAccountHistory.MaximumRecordsToReturn", value: this._maximumRecordsToReturn, dataType: 'number', label: "Maximum Records To Return" },
            ];
        }

}