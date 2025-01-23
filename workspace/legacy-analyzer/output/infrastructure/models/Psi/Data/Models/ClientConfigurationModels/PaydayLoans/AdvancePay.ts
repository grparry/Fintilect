import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AdvancePayConfig {
    DatabaseConnectionString: string;
}

export class AdvancePay implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AdvancePay'
    };


            private _databaseConnectionString: string;
            get databaseConnectionString(): string {
                return this._databaseConnectionString;
            }
            set databaseConnectionString(value: string) {
                this._databaseConnectionString = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AdvancePay.DatabaseConnectionString", value: this._databaseConnectionString, dataType: 'string', label: "Database Connection String" },
            ];
        }

}