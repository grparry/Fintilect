import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface TransferSettingsConfig {
    AllowWeekendTransfers: boolean;
}

export class TransferSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TransferSettings'
    };


            private _allowWeekendTransfers: boolean;
            get allowWeekendTransfers(): boolean {
                return this._allowWeekendTransfers;
            }
            set allowWeekendTransfers(value: boolean) {
                this._allowWeekendTransfers = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TransferSettings.AllowWeekendTransfers", value: this._allowWeekendTransfers, dataType: 'boolean', label: "Allow Weekend Transfers" },
            ];
        }

}