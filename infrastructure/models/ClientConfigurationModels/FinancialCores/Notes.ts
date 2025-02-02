import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface NotesConfig {
    ClearBadAddressFlagOnNoChange: boolean;
}

export class Notes implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Notes'
    };


            private _clearBadAddressFlagOnNoChange: boolean;
            get clearBadAddressFlagOnNoChange(): boolean {
                return this._clearBadAddressFlagOnNoChange;
            }
            set clearBadAddressFlagOnNoChange(value: boolean) {
                this._clearBadAddressFlagOnNoChange = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Notes.ClearBadAddressFlagOnNoChange", value: this._clearBadAddressFlagOnNoChange, dataType: 'boolean', label: "Clear Bad Address Flag On No Change" },
            ];
        }

}