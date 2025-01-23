import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { DigitalInsightsConfiguration } from './DigitalInsightsConfiguration';
export interface MessagePumpsConfig {
    DigitalInsightsConfiguration: DigitalInsightsConfiguration;
}

export class MessagePumps implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MessagePumps'
    };


            private _digitalInsightsConfiguration: DigitalInsightsConfiguration;
            get digitalInsightsConfiguration(): DigitalInsightsConfiguration {
                return this._digitalInsightsConfiguration;
            }
            set digitalInsightsConfiguration(value: DigitalInsightsConfiguration) {
                this._digitalInsightsConfiguration = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MessagePumps.DigitalInsightsConfiguration", value: this._digitalInsightsConfiguration, dataType: 'digitalinsightsconfiguration', label: "Digital Insights Configuration" },
            ];
        }

}