import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { LoanApplication } from '@infrastructure/LoanApplication';
import { LoanCalculator } from '@infrastructure/LoanCalculator';
import { LoanPayment } from '@infrastructure/LoanPayment';
export interface LoanConfig {
    Application: LoanApplication;
    Calculator: LoanCalculator;
    Payment: LoanPayment;
}

export class Loan implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Loan'
    };


            private _application: LoanApplication;
            get application(): LoanApplication {
                return this._application;
            }
            set application(value: LoanApplication) {
                this._application = value;
            }

            private _calculator: LoanCalculator;
            get calculator(): LoanCalculator {
                return this._calculator;
            }
            set calculator(value: LoanCalculator) {
                this._calculator = value;
            }

            private _payment: LoanPayment;
            get payment(): LoanPayment {
                return this._payment;
            }
            set payment(value: LoanPayment) {
                this._payment = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Loan.Application", value: this._application, dataType: 'loanapplication', label: "Application" },
                { key: "Loan.Calculator", value: this._calculator, dataType: 'loancalculator', label: "Calculator" },
                { key: "Loan.Payment", value: this._payment, dataType: 'loanpayment', label: "Payment" },
            ];
        }

}