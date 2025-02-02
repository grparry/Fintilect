import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ValidationConfig {
    NoResultImage: string;
}

export class Validation implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Validation'
    };


            private _noResultImage: string;
            get noResultImage(): string {
                return this._noResultImage;
            }
            set noResultImage(value: string) {
                this._noResultImage = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Validation.NoResultImage", value: this._noResultImage, dataType: 'string', label: "No Result Image" },
            ];
        }

}