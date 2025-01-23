import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DebitCardLocationSettingsConfig {
    InternationalTransactionControlEnabled: boolean;
    MerchantStateListControlEnabled: boolean;
}

export class DebitCardLocationSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DebitCardLocationSettings'
    };


            private _internationalTransactionControlEnabled: boolean;
            get internationalTransactionControlEnabled(): boolean {
                return this._internationalTransactionControlEnabled;
            }
            set internationalTransactionControlEnabled(value: boolean) {
                this._internationalTransactionControlEnabled = value;
            }

            private _merchantStateListControlEnabled: boolean;
            get merchantStateListControlEnabled(): boolean {
                return this._merchantStateListControlEnabled;
            }
            set merchantStateListControlEnabled(value: boolean) {
                this._merchantStateListControlEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DebitCardLocationSettings.InternationalTransactionControlEnabled", value: this._internationalTransactionControlEnabled, dataType: 'boolean', label: "International Transaction Control Enabled" },
                { key: "DebitCardLocationSettings.MerchantStateListControlEnabled", value: this._merchantStateListControlEnabled, dataType: 'boolean', label: "Merchant State List Control Enabled" },
            ];
        }

}