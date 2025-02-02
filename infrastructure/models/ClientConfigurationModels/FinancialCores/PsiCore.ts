import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PsiCoreConfig {
    SetDateOfBirth: boolean;
}

export class PsiCore implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PsiCore'
    };


            private _setDateOfBirth: boolean;
            get setDateOfBirth(): boolean {
                return this._setDateOfBirth;
            }
            set setDateOfBirth(value: boolean) {
                this._setDateOfBirth = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PsiCore.SetDateOfBirth", value: this._setDateOfBirth, dataType: 'boolean', label: "Set Date Of Birth" },
            ];
        }

}