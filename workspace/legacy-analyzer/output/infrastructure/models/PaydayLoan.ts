import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AdvancePay } from './AdvancePay';
export interface PaydayLoanConfig {
    AdvancePay: AdvancePay;
}

export class PaydayLoan implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PaydayLoan'
    };


            private _advancePay: AdvancePay;
            get advancePay(): AdvancePay {
                return this._advancePay;
            }
            set advancePay(value: AdvancePay) {
                this._advancePay = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PaydayLoan.AdvancePay", value: this._advancePay, dataType: 'advancepay', label: "Advance Pay" },
            ];
        }

}