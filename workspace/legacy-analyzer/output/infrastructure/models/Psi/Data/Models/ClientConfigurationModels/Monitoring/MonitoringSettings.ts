import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { MiddlewareHealthThreshold } from './MiddlewareHealthThreshold';
export interface MonitoringSettingsConfig {
    MiddlewareHealthThreshold: MiddlewareHealthThreshold;
}

export class MonitoringSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MonitoringSettings'
    };


            private _middlewareHealthThreshold: MiddlewareHealthThreshold;
            get middlewareHealthThreshold(): MiddlewareHealthThreshold {
                return this._middlewareHealthThreshold;
            }
            set middlewareHealthThreshold(value: MiddlewareHealthThreshold) {
                this._middlewareHealthThreshold = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MonitoringSettings.MiddlewareHealthThreshold", value: this._middlewareHealthThreshold, dataType: 'middlewarehealththreshold', label: "Middleware Health Threshold" },
            ];
        }

}