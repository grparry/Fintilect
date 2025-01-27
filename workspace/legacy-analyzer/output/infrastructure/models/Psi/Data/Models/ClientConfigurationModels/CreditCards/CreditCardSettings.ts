import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { OmahaSso } from '@infrastructure/OmahaSso';
import { PscuSso } from '@infrastructure/PscuSso';
export interface CreditCardSettingsConfig {
    OmahaSso: OmahaSso;
    PscuSso: PscuSso;
}

export class CreditCardSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CreditCardSettings'
    };


            private _omahaSso: OmahaSso;
            get omahaSso(): OmahaSso {
                return this._omahaSso;
            }
            set omahaSso(value: OmahaSso) {
                this._omahaSso = value;
            }

            private _pscuSso: PscuSso;
            get pscuSso(): PscuSso {
                return this._pscuSso;
            }
            set pscuSso(value: PscuSso) {
                this._pscuSso = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CreditCardSettings.OmahaSso", value: this._omahaSso, dataType: 'omahasso', label: "Omaha Sso" },
                { key: "CreditCardSettings.PscuSso", value: this._pscuSso, dataType: 'pscusso', label: "Pscu Sso" },
            ];
        }

}