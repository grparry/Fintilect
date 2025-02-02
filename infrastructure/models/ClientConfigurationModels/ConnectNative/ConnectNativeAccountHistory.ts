import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AccountDetailsByAccountCategorySetting } from '../AccountDetailsByAccountCategorySetting';
export interface ConnectNativeAccountHistoryConfig {
    AccountDetailsByAccountCategory: AccountDetailsByAccountCategorySetting[];
}

export class ConnectNativeAccountHistory implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ConnectNativeAccountHistory'
    };


            private _accountDetailsByAccountCategory: AccountDetailsByAccountCategorySetting[];
            get accountDetailsByAccountCategory(): AccountDetailsByAccountCategorySetting[] {
                return this._accountDetailsByAccountCategory;
            }
            set accountDetailsByAccountCategory(value: AccountDetailsByAccountCategorySetting[]) {
                this._accountDetailsByAccountCategory = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ConnectNativeAccountHistory.AccountDetailsByAccountCategory", value: this._accountDetailsByAccountCategory, dataType: 'array<AccountDetailsByAccountCategorySetting>', label: "Account Details By Account Category" },
            ];
        }

}