import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AutoLoan } from '../AutoLoan';
export interface LoanCalculatorConfig {
    AutoLoan: AutoLoan;
}

export class LoanCalculator implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LoanCalculator'
    };


            private _autoLoan: AutoLoan;
            get autoLoan(): AutoLoan {
                return this._autoLoan;
            }
            set autoLoan(value: AutoLoan) {
                this._autoLoan = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LoanCalculator.AutoLoan", value: this._autoLoan, dataType: 'autoloan', label: "Auto Loan" },
            ];
        }

}