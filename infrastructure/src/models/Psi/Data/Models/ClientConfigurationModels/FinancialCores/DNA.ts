import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DNAConfig {
    SuccessfulLoginCoreField: string;
    ExtraStatementAccountsCoreUserField: string;
    MapDormantAccounts: boolean;
    ValidDebitCardStatusCodes: string;
}

export class DNA implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DNA'
    };


            private _successfulLoginCoreField: string;
            get successfulLoginCoreField(): string {
                return this._successfulLoginCoreField;
            }
            set successfulLoginCoreField(value: string) {
                this._successfulLoginCoreField = value;
            }

            private _extraStatementAccountsCoreUserField: string;
            get extraStatementAccountsCoreUserField(): string {
                return this._extraStatementAccountsCoreUserField;
            }
            set extraStatementAccountsCoreUserField(value: string) {
                this._extraStatementAccountsCoreUserField = value;
            }

            private _mapDormantAccounts: boolean;
            get mapDormantAccounts(): boolean {
                return this._mapDormantAccounts;
            }
            set mapDormantAccounts(value: boolean) {
                this._mapDormantAccounts = value;
            }

            private _validDebitCardStatusCodes: string;
            get validDebitCardStatusCodes(): string {
                return this._validDebitCardStatusCodes;
            }
            set validDebitCardStatusCodes(value: string) {
                this._validDebitCardStatusCodes = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DNA.SuccessfulLoginCoreField", value: this._successfulLoginCoreField, dataType: 'string', label: "Successful Login Core Field" },
                { key: "DNA.ExtraStatementAccountsCoreUserField", value: this._extraStatementAccountsCoreUserField, dataType: 'string', label: "Extra Statement Accounts Core User Field" },
                { key: "DNA.MapDormantAccounts", value: this._mapDormantAccounts, dataType: 'boolean', label: "Map Dormant Accounts" },
                { key: "DNA.ValidDebitCardStatusCodes", value: this._validDebitCardStatusCodes, dataType: 'string', label: "Valid Debit Card Status Codes" },
            ];
        }

}