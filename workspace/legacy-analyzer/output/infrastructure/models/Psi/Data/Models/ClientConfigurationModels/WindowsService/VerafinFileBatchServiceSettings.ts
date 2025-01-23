import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface VerafinFileBatchServiceSettingsConfig {
    StartTimeInHours: number;
    EndTimeInHours: number;
}

export class VerafinFileBatchServiceSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'VerafinFileBatchServiceSettings'
    };


            private _startTimeInHours: number;
            get startTimeInHours(): number {
                return this._startTimeInHours;
            }
            set startTimeInHours(value: number) {
                this._startTimeInHours = value;
            }

            private _endTimeInHours: number;
            get endTimeInHours(): number {
                return this._endTimeInHours;
            }
            set endTimeInHours(value: number) {
                this._endTimeInHours = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "VerafinFileBatchServiceSettings.StartTimeInHours", value: this._startTimeInHours, dataType: 'number', label: "Start Time In Hours" },
                { key: "VerafinFileBatchServiceSettings.EndTimeInHours", value: this._endTimeInHours, dataType: 'number', label: "End Time In Hours" },
            ];
        }

}