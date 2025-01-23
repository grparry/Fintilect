import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AdHocAlertsConfig {
    Enabled: boolean;
    MinVersion: number;
}

export class AdHocAlerts implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AdHocAlerts'
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
                { key: "AdHocAlerts.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AdHocAlerts.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
            ];
        }

}