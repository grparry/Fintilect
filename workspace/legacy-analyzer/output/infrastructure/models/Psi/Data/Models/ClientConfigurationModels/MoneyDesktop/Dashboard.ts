import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DashboardConfig {
    ShowIndividualPanels: boolean;
}

export class Dashboard implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Dashboard'
    };


            private _showIndividualPanels: boolean;
            get showIndividualPanels(): boolean {
                return this._showIndividualPanels;
            }
            set showIndividualPanels(value: boolean) {
                this._showIndividualPanels = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Dashboard.ShowIndividualPanels", value: this._showIndividualPanels, dataType: 'boolean', label: "Show Individual Panels" },
            ];
        }

}