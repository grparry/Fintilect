import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AccountTypesConfig {
    MoneyMarketShareCategorySerial: string[];
    PrimarySavingsShareCategorySerial: string[];
    CheckingShareCategorySerial: string[];
    InvestmentShareCategorySerial: string[];
    CertificateShareCategorySerial: string[];
    LineOfCreditLoanCategorySerial: string[];
    CreditCardLoanCategorySerial: string[];
    AutoLoanCategorySerial: string[];
    MortgageLoanCategorySerial: string[];
    LoanCategorySerial: string[];
    BusinessSavingsShareCategorySerial: string[];
    DepositShareCategorySerial: string[];
    ExternalMortgageLoanCategorySerial: string[];
    DebitCardCategorySerial: string[];
    BusinessSavingsShareCategorySerialForCategoryMapping: string[];
}

export class AccountTypes implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountTypes'
    };


            private _moneyMarketShareCategorySerial: string[];
            get moneyMarketShareCategorySerial(): string[] {
                return this._moneyMarketShareCategorySerial;
            }
            set moneyMarketShareCategorySerial(value: string[]) {
                this._moneyMarketShareCategorySerial = value;
            }

            private _primarySavingsShareCategorySerial: string[];
            get primarySavingsShareCategorySerial(): string[] {
                return this._primarySavingsShareCategorySerial;
            }
            set primarySavingsShareCategorySerial(value: string[]) {
                this._primarySavingsShareCategorySerial = value;
            }

            private _checkingShareCategorySerial: string[];
            get checkingShareCategorySerial(): string[] {
                return this._checkingShareCategorySerial;
            }
            set checkingShareCategorySerial(value: string[]) {
                this._checkingShareCategorySerial = value;
            }

            private _investmentShareCategorySerial: string[];
            get investmentShareCategorySerial(): string[] {
                return this._investmentShareCategorySerial;
            }
            set investmentShareCategorySerial(value: string[]) {
                this._investmentShareCategorySerial = value;
            }

            private _certificateShareCategorySerial: string[];
            get certificateShareCategorySerial(): string[] {
                return this._certificateShareCategorySerial;
            }
            set certificateShareCategorySerial(value: string[]) {
                this._certificateShareCategorySerial = value;
            }

            private _lineOfCreditLoanCategorySerial: string[];
            get lineOfCreditLoanCategorySerial(): string[] {
                return this._lineOfCreditLoanCategorySerial;
            }
            set lineOfCreditLoanCategorySerial(value: string[]) {
                this._lineOfCreditLoanCategorySerial = value;
            }

            private _creditCardLoanCategorySerial: string[];
            get creditCardLoanCategorySerial(): string[] {
                return this._creditCardLoanCategorySerial;
            }
            set creditCardLoanCategorySerial(value: string[]) {
                this._creditCardLoanCategorySerial = value;
            }

            private _autoLoanCategorySerial: string[];
            get autoLoanCategorySerial(): string[] {
                return this._autoLoanCategorySerial;
            }
            set autoLoanCategorySerial(value: string[]) {
                this._autoLoanCategorySerial = value;
            }

            private _mortgageLoanCategorySerial: string[];
            get mortgageLoanCategorySerial(): string[] {
                return this._mortgageLoanCategorySerial;
            }
            set mortgageLoanCategorySerial(value: string[]) {
                this._mortgageLoanCategorySerial = value;
            }

            private _loanCategorySerial: string[];
            get loanCategorySerial(): string[] {
                return this._loanCategorySerial;
            }
            set loanCategorySerial(value: string[]) {
                this._loanCategorySerial = value;
            }

            private _businessSavingsShareCategorySerial: string[];
            get businessSavingsShareCategorySerial(): string[] {
                return this._businessSavingsShareCategorySerial;
            }
            set businessSavingsShareCategorySerial(value: string[]) {
                this._businessSavingsShareCategorySerial = value;
            }

            private _depositShareCategorySerial: string[];
            get depositShareCategorySerial(): string[] {
                return this._depositShareCategorySerial;
            }
            set depositShareCategorySerial(value: string[]) {
                this._depositShareCategorySerial = value;
            }

            private _externalMortgageLoanCategorySerial: string[];
            get externalMortgageLoanCategorySerial(): string[] {
                return this._externalMortgageLoanCategorySerial;
            }
            set externalMortgageLoanCategorySerial(value: string[]) {
                this._externalMortgageLoanCategorySerial = value;
            }

            private _debitCardCategorySerial: string[];
            get debitCardCategorySerial(): string[] {
                return this._debitCardCategorySerial;
            }
            set debitCardCategorySerial(value: string[]) {
                this._debitCardCategorySerial = value;
            }

            private _businessSavingsShareCategorySerialForCategoryMapping: string[];
            get businessSavingsShareCategorySerialForCategoryMapping(): string[] {
                return this._businessSavingsShareCategorySerialForCategoryMapping;
            }
            set businessSavingsShareCategorySerialForCategoryMapping(value: string[]) {
                this._businessSavingsShareCategorySerialForCategoryMapping = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountTypes.MoneyMarketShareCategorySerial", value: this._moneyMarketShareCategorySerial, dataType: 'list<string>', label: "Money Market Share Category Serial" },
                { key: "AccountTypes.PrimarySavingsShareCategorySerial", value: this._primarySavingsShareCategorySerial, dataType: 'list<string>', label: "Primary Savings Share Category Serial" },
                { key: "AccountTypes.CheckingShareCategorySerial", value: this._checkingShareCategorySerial, dataType: 'list<string>', label: "Checking Share Category Serial" },
                { key: "AccountTypes.InvestmentShareCategorySerial", value: this._investmentShareCategorySerial, dataType: 'list<string>', label: "Investment Share Category Serial" },
                { key: "AccountTypes.CertificateShareCategorySerial", value: this._certificateShareCategorySerial, dataType: 'list<string>', label: "Certificate Share Category Serial" },
                { key: "AccountTypes.LineOfCreditLoanCategorySerial", value: this._lineOfCreditLoanCategorySerial, dataType: 'list<string>', label: "Line Of Credit Loan Category Serial" },
                { key: "AccountTypes.CreditCardLoanCategorySerial", value: this._creditCardLoanCategorySerial, dataType: 'list<string>', label: "Credit Card Loan Category Serial" },
                { key: "AccountTypes.AutoLoanCategorySerial", value: this._autoLoanCategorySerial, dataType: 'list<string>', label: "Auto Loan Category Serial" },
                { key: "AccountTypes.MortgageLoanCategorySerial", value: this._mortgageLoanCategorySerial, dataType: 'list<string>', label: "Mortgage Loan Category Serial" },
                { key: "AccountTypes.LoanCategorySerial", value: this._loanCategorySerial, dataType: 'list<string>', label: "Loan Category Serial" },
                { key: "AccountTypes.BusinessSavingsShareCategorySerial", value: this._businessSavingsShareCategorySerial, dataType: 'list<string>', label: "Business Savings Share Category Serial" },
                { key: "AccountTypes.DepositShareCategorySerial", value: this._depositShareCategorySerial, dataType: 'list<string>', label: "Deposit Share Category Serial" },
                { key: "AccountTypes.ExternalMortgageLoanCategorySerial", value: this._externalMortgageLoanCategorySerial, dataType: 'list<string>', label: "External Mortgage Loan Category Serial" },
                { key: "AccountTypes.DebitCardCategorySerial", value: this._debitCardCategorySerial, dataType: 'list<string>', label: "Debit Card Category Serial" },
                { key: "AccountTypes.BusinessSavingsShareCategorySerialForCategoryMapping", value: this._businessSavingsShareCategorySerialForCategoryMapping, dataType: 'list<string>', label: "Business Savings Share Category Serial For Category Mapping" },
            ];
        }

}