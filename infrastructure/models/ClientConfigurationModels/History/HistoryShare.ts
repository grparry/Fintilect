import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { HistoryOverLayConfig } from '../HistoryOverLayConfig';
export interface HistoryShareConfig {
    ShowRates: boolean;
    DescriptionOverlayEnabled: boolean;
    DescriptionOverlays: HistoryOverLayConfig[];
    IfAdditionalDescriptionIsNotSetSetWithDescription2: boolean;
}

export class HistoryShare implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'HistoryShare'
    };


            private _showRates: boolean;
            get showRates(): boolean {
                return this._showRates;
            }
            set showRates(value: boolean) {
                this._showRates = value;
            }

            private _descriptionOverlayEnabled: boolean;
            get descriptionOverlayEnabled(): boolean {
                return this._descriptionOverlayEnabled;
            }
            set descriptionOverlayEnabled(value: boolean) {
                this._descriptionOverlayEnabled = value;
            }

            private _descriptionOverlays: HistoryOverLayConfig[];
            get descriptionOverlays(): HistoryOverLayConfig[] {
                return this._descriptionOverlays;
            }
            set descriptionOverlays(value: HistoryOverLayConfig[]) {
                this._descriptionOverlays = value;
            }

            private _ifAdditionalDescriptionIsNotSetSetWithDescription2: boolean;
            get ifAdditionalDescriptionIsNotSetSetWithDescription2(): boolean {
                return this._ifAdditionalDescriptionIsNotSetSetWithDescription2;
            }
            set ifAdditionalDescriptionIsNotSetSetWithDescription2(value: boolean) {
                this._ifAdditionalDescriptionIsNotSetSetWithDescription2 = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "HistoryShare.ShowRates", value: this._showRates, dataType: 'boolean', label: "Show Rates" },
                { key: "HistoryShare.DescriptionOverlayEnabled", value: this._descriptionOverlayEnabled, dataType: 'boolean', label: "Description Overlay Enabled" },
                { key: "HistoryShare.DescriptionOverlays", value: this._descriptionOverlays, dataType: 'array<HistoryOverLayConfig>', label: "Description Overlays" },
                { key: "HistoryShare.IfAdditionalDescriptionIsNotSetSetWithDescription2", value: this._ifAdditionalDescriptionIsNotSetSetWithDescription2, dataType: 'boolean', label: "If Additional Description Is Not Set Set With Description2" },
            ];
        }

}