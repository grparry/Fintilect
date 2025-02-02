import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface RegularAchTransfersConfig {
    TransferCommandCode: string;
    FTCode: string;
    Description: string;
    DescriptionInHistoryDisplay: string;
}

export class RegularAchTransfers implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RegularAchTransfers'
    };


            private _transferCommandCode: string;
            get transferCommandCode(): string {
                return this._transferCommandCode;
            }
            set transferCommandCode(value: string) {
                this._transferCommandCode = value;
            }

            private _fTCode: string;
            get fTCode(): string {
                return this._fTCode;
            }
            set fTCode(value: string) {
                this._fTCode = value;
            }

            private _description: string;
            get description(): string {
                return this._description;
            }
            set description(value: string) {
                this._description = value;
            }

            private _descriptionInHistoryDisplay: string;
            get descriptionInHistoryDisplay(): string {
                return this._descriptionInHistoryDisplay;
            }
            set descriptionInHistoryDisplay(value: string) {
                this._descriptionInHistoryDisplay = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RegularAchTransfers.TransferCommandCode", value: this._transferCommandCode, dataType: 'string', label: "Transfer Command Code" },
                { key: "RegularAchTransfers.FTCode", value: this._fTCode, dataType: 'string', label: "F T Code" },
                { key: "RegularAchTransfers.Description", value: this._description, dataType: 'string', label: "Description" },
                { key: "RegularAchTransfers.DescriptionInHistoryDisplay", value: this._descriptionInHistoryDisplay, dataType: 'string', label: "Description In History Display" },
            ];
        }

}