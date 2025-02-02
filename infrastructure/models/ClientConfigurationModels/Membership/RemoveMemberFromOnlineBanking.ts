import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface RemoveMemberFromOnlineBankingConfig {
    ShouldRemoveOnlineBankingFlag: boolean;
}

export class RemoveMemberFromOnlineBanking implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RemoveMemberFromOnlineBanking'
    };


            private _shouldRemoveOnlineBankingFlag: boolean;
            get shouldRemoveOnlineBankingFlag(): boolean {
                return this._shouldRemoveOnlineBankingFlag;
            }
            set shouldRemoveOnlineBankingFlag(value: boolean) {
                this._shouldRemoveOnlineBankingFlag = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RemoveMemberFromOnlineBanking.ShouldRemoveOnlineBankingFlag", value: this._shouldRemoveOnlineBankingFlag, dataType: 'boolean', label: "Should Remove Online Banking Flag" },
            ];
        }

}