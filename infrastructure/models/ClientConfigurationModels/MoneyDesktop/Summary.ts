import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SummaryConfig {
    SidePanelsEnabled: boolean;
}

export class Summary implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Summary'
    };


            private _sidePanelsEnabled: boolean;
            get sidePanelsEnabled(): boolean {
                return this._sidePanelsEnabled;
            }
            set sidePanelsEnabled(value: boolean) {
                this._sidePanelsEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Summary.SidePanelsEnabled", value: this._sidePanelsEnabled, dataType: 'boolean', label: "Side Panels Enabled" },
            ];
        }

}