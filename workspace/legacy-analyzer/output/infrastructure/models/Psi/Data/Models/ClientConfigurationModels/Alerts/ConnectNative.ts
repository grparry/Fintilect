import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ConnectNativeConfig {
    ScheduledAlertsEnabled: number;
}

export class ConnectNative implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ConnectNative'
    };


            private _scheduledAlertsEnabled: number;
            get scheduledAlertsEnabled(): number {
                return this._scheduledAlertsEnabled;
            }
            set scheduledAlertsEnabled(value: number) {
                this._scheduledAlertsEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ConnectNative.ScheduledAlertsEnabled", value: this._scheduledAlertsEnabled, dataType: 'number', label: "Scheduled Alerts Enabled" },
            ];
        }

}