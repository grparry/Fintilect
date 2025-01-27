import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { CreditCards } from '@infrastructure/CreditCards';
export interface ControlsConfig {
    SummarySidePanelEnabled: boolean;
    PanelOrderString: string;
    CreditCards: CreditCards;
}

export class Controls implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Controls'
    };


            private _summarySidePanelEnabled: boolean;
            get summarySidePanelEnabled(): boolean {
                return this._summarySidePanelEnabled;
            }
            set summarySidePanelEnabled(value: boolean) {
                this._summarySidePanelEnabled = value;
            }

            private _panelOrderString: string;
            get panelOrderString(): string {
                return this._panelOrderString;
            }
            set panelOrderString(value: string) {
                this._panelOrderString = value;
            }

            private _creditCards: CreditCards;
            get creditCards(): CreditCards {
                return this._creditCards;
            }
            set creditCards(value: CreditCards) {
                this._creditCards = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Controls.SummarySidePanelEnabled", value: this._summarySidePanelEnabled, dataType: 'boolean', label: "Summary Side Panel Enabled" },
                { key: "Controls.PanelOrderString", value: this._panelOrderString, dataType: 'string', label: "Panel Order String" },
                { key: "Controls.CreditCards", value: this._creditCards, dataType: 'creditcards', label: "Credit Cards" },
            ];
        }

}