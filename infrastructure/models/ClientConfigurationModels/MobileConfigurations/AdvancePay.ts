import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AdvancePayConfig {
    Enabled: boolean;
    AdvancePayLoanCategories: string[];
}

export class AdvancePay implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AdvancePay'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _advancePayLoanCategories: string[];
            get advancePayLoanCategories(): string[] {
                return this._advancePayLoanCategories;
            }
            set advancePayLoanCategories(value: string[]) {
                this._advancePayLoanCategories = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AdvancePay.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AdvancePay.AdvancePayLoanCategories", value: this._advancePayLoanCategories, dataType: 'list<string>', label: "Advance Pay Loan Categories" },
            ];
        }

}