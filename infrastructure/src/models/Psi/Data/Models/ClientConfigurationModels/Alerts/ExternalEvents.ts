import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ExternalEventsConfig {
    DigitalInsightsEnabled: boolean;
    DigitalInsightsMinVersion: number;
}

export class ExternalEvents implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ExternalEvents'
    };


            private _digitalInsightsEnabled: boolean;
            get digitalInsightsEnabled(): boolean {
                return this._digitalInsightsEnabled;
            }
            set digitalInsightsEnabled(value: boolean) {
                this._digitalInsightsEnabled = value;
            }

            private _digitalInsightsMinVersion: number;
            get digitalInsightsMinVersion(): number {
                return this._digitalInsightsMinVersion;
            }
            set digitalInsightsMinVersion(value: number) {
                this._digitalInsightsMinVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ExternalEvents.DigitalInsightsEnabled", value: this._digitalInsightsEnabled, dataType: 'boolean', label: "Digital Insights Enabled" },
                { key: "ExternalEvents.DigitalInsightsMinVersion", value: this._digitalInsightsMinVersion, dataType: 'number', label: "Digital Insights Min Version" },
            ];
        }

}