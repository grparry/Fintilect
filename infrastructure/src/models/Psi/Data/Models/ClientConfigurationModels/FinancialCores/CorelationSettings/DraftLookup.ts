import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DraftLookupConfig {
    AccountNumberLength?: number | null;
}

export class DraftLookup implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DraftLookup'
    };


            private _accountNumberLength: number | null;
            get accountNumberLength(): number | null {
                return this._accountNumberLength;
            }
            set accountNumberLength(value: number | null) {
                this._accountNumberLength = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DraftLookup.AccountNumberLength", value: this._accountNumberLength, dataType: 'number | null', label: "Account Number Length" },
            ];
        }

}