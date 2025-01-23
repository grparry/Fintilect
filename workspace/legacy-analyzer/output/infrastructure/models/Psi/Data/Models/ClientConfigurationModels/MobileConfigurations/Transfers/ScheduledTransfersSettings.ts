import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ScheduledTransfersSettingsConfig {
    Enabled: boolean;
    IsTimeSelectionEnabled: boolean;
}

export class ScheduledTransfersSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ScheduledTransfersSettings'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _isTimeSelectionEnabled: boolean;
            get isTimeSelectionEnabled(): boolean {
                return this._isTimeSelectionEnabled;
            }
            set isTimeSelectionEnabled(value: boolean) {
                this._isTimeSelectionEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ScheduledTransfersSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ScheduledTransfersSettings.IsTimeSelectionEnabled", value: this._isTimeSelectionEnabled, dataType: 'boolean', label: "Is Time Selection Enabled" },
            ];
        }

}