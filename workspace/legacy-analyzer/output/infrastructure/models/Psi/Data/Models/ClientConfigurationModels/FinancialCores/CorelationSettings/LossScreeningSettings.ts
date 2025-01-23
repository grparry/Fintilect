import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface LossScreeningSettingsConfig {
    LoanPastDueHoursOffset: number;
    ShareAvailableAmountLessThenZeroPlusMiniumAmount: boolean;
    ShareAvailableAmountLessThenZero: boolean;
    LoanPastDue: boolean;
    ShareHasChargeOfSerial: boolean;
    LoanHasChargeOfSerial: boolean;
    BlockAccountAlertTypeSerials: string;
}

export class LossScreeningSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LossScreeningSettings'
    };


            private _loanPastDueHoursOffset: number;
            get loanPastDueHoursOffset(): number {
                return this._loanPastDueHoursOffset;
            }
            set loanPastDueHoursOffset(value: number) {
                this._loanPastDueHoursOffset = value;
            }

            private _shareAvailableAmountLessThenZeroPlusMiniumAmount: boolean;
            get shareAvailableAmountLessThenZeroPlusMiniumAmount(): boolean {
                return this._shareAvailableAmountLessThenZeroPlusMiniumAmount;
            }
            set shareAvailableAmountLessThenZeroPlusMiniumAmount(value: boolean) {
                this._shareAvailableAmountLessThenZeroPlusMiniumAmount = value;
            }

            private _shareAvailableAmountLessThenZero: boolean;
            get shareAvailableAmountLessThenZero(): boolean {
                return this._shareAvailableAmountLessThenZero;
            }
            set shareAvailableAmountLessThenZero(value: boolean) {
                this._shareAvailableAmountLessThenZero = value;
            }

            private _loanPastDue: boolean;
            get loanPastDue(): boolean {
                return this._loanPastDue;
            }
            set loanPastDue(value: boolean) {
                this._loanPastDue = value;
            }

            private _shareHasChargeOfSerial: boolean;
            get shareHasChargeOfSerial(): boolean {
                return this._shareHasChargeOfSerial;
            }
            set shareHasChargeOfSerial(value: boolean) {
                this._shareHasChargeOfSerial = value;
            }

            private _loanHasChargeOfSerial: boolean;
            get loanHasChargeOfSerial(): boolean {
                return this._loanHasChargeOfSerial;
            }
            set loanHasChargeOfSerial(value: boolean) {
                this._loanHasChargeOfSerial = value;
            }

            private _blockAccountAlertTypeSerials: string;
            get blockAccountAlertTypeSerials(): string {
                return this._blockAccountAlertTypeSerials;
            }
            set blockAccountAlertTypeSerials(value: string) {
                this._blockAccountAlertTypeSerials = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LossScreeningSettings.LoanPastDueHoursOffset", value: this._loanPastDueHoursOffset, dataType: 'number', label: "Loan Past Due Hours Offset" },
                { key: "LossScreeningSettings.ShareAvailableAmountLessThenZeroPlusMiniumAmount", value: this._shareAvailableAmountLessThenZeroPlusMiniumAmount, dataType: 'boolean', label: "Share Available Amount Less Then Zero Plus Minium Amount" },
                { key: "LossScreeningSettings.ShareAvailableAmountLessThenZero", value: this._shareAvailableAmountLessThenZero, dataType: 'boolean', label: "Share Available Amount Less Then Zero" },
                { key: "LossScreeningSettings.LoanPastDue", value: this._loanPastDue, dataType: 'boolean', label: "Loan Past Due" },
                { key: "LossScreeningSettings.ShareHasChargeOfSerial", value: this._shareHasChargeOfSerial, dataType: 'boolean', label: "Share Has Charge Of Serial" },
                { key: "LossScreeningSettings.LoanHasChargeOfSerial", value: this._loanHasChargeOfSerial, dataType: 'boolean', label: "Loan Has Charge Of Serial" },
                { key: "LossScreeningSettings.BlockAccountAlertTypeSerials", value: this._blockAccountAlertTypeSerials, dataType: 'string', label: "Block Account Alert Type Serials" },
            ];
        }

}