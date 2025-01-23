import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AccountTypeSettingsConfig {
    AccountTypeSerial: string;
    AccountRelationshipSerial: string;
    RestrictAccountOnCreate: boolean;
}

export class AccountTypeSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountTypeSettings'
    };


            private _accountTypeSerial: string;
            get accountTypeSerial(): string {
                return this._accountTypeSerial;
            }
            set accountTypeSerial(value: string) {
                this._accountTypeSerial = value;
            }

            private _accountRelationshipSerial: string;
            get accountRelationshipSerial(): string {
                return this._accountRelationshipSerial;
            }
            set accountRelationshipSerial(value: string) {
                this._accountRelationshipSerial = value;
            }

            private _restrictAccountOnCreate: boolean;
            get restrictAccountOnCreate(): boolean {
                return this._restrictAccountOnCreate;
            }
            set restrictAccountOnCreate(value: boolean) {
                this._restrictAccountOnCreate = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountTypeSettings.AccountTypeSerial", value: this._accountTypeSerial, dataType: 'string', label: "Account Type Serial" },
                { key: "AccountTypeSettings.AccountRelationshipSerial", value: this._accountRelationshipSerial, dataType: 'string', label: "Account Relationship Serial" },
                { key: "AccountTypeSettings.RestrictAccountOnCreate", value: this._restrictAccountOnCreate, dataType: 'boolean', label: "Restrict Account On Create" },
            ];
        }

}