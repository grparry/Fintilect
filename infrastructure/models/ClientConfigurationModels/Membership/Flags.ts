import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface FlagsConfig {
    HBFlagNumber: string;
    BillPayFlagNumber: string;
    BusinessAccountFlag: string;
    EStatementFlagNumber: string;
    ShareRestrictedCheckWithdraw: string[];
    EDocumentsFlagNumber: string;
    EscheatDateFlag: string;
    FreeCheckReorderFlag: string;
    HasCCFlagNumber: string;
    IsDebitCardFlagNumber: string;
    IsEmployeeFlagNumber: string;
    LoanClosedFlags: string[];
    LoanRestrictedAlerts: string[];
    LoanRestrictedInquire: string[];
    MidwestLoansFlag: string;
    MobileDepositAllowedFlag: string;
    MobileDepositRestrictedFlag: string;
    MobileDepositDisclosureFlag: string;
    obsMemberRestrictedAllTrans: string[];
    obsMemberRestrictedDeposit: string[];
    obsMemberRestrictedInquire: string[];
    obsShareRestrictedDeposit: string[];
    LoanRestrictedDepositFlags: string[];
    obsShareRestrictedInquire: string[];
    obsShareRestrictedWithdraw: string[];
    RestrictViewingCardFlagNumber: string;
    ShareClosedFlags: string[];
    ShareRestrictedAlerts: string[];
    SkipPayQualifyFlag: string;
    ValidAddressFlagNumber: string;
    ValidEmailFlag: string;
    NsfFlags: string;
    ShouldUpdateOnlineBankingRegisteredFlag: boolean;
    OnlineBankingRegisteredFlag: string;
}

export class Flags implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Flags'
    };


            private _hBFlagNumber: string;
            get hBFlagNumber(): string {
                return this._hBFlagNumber;
            }
            set hBFlagNumber(value: string) {
                this._hBFlagNumber = value;
            }

            private _billPayFlagNumber: string;
            get billPayFlagNumber(): string {
                return this._billPayFlagNumber;
            }
            set billPayFlagNumber(value: string) {
                this._billPayFlagNumber = value;
            }

            private _businessAccountFlag: string;
            get businessAccountFlag(): string {
                return this._businessAccountFlag;
            }
            set businessAccountFlag(value: string) {
                this._businessAccountFlag = value;
            }

            private _eStatementFlagNumber: string;
            get eStatementFlagNumber(): string {
                return this._eStatementFlagNumber;
            }
            set eStatementFlagNumber(value: string) {
                this._eStatementFlagNumber = value;
            }

            private _shareRestrictedCheckWithdraw: string[];
            get shareRestrictedCheckWithdraw(): string[] {
                return this._shareRestrictedCheckWithdraw;
            }
            set shareRestrictedCheckWithdraw(value: string[]) {
                this._shareRestrictedCheckWithdraw = value;
            }

            private _eDocumentsFlagNumber: string;
            get eDocumentsFlagNumber(): string {
                return this._eDocumentsFlagNumber;
            }
            set eDocumentsFlagNumber(value: string) {
                this._eDocumentsFlagNumber = value;
            }

            private _escheatDateFlag: string;
            get escheatDateFlag(): string {
                return this._escheatDateFlag;
            }
            set escheatDateFlag(value: string) {
                this._escheatDateFlag = value;
            }

            private _freeCheckReorderFlag: string;
            get freeCheckReorderFlag(): string {
                return this._freeCheckReorderFlag;
            }
            set freeCheckReorderFlag(value: string) {
                this._freeCheckReorderFlag = value;
            }

            private _hasCCFlagNumber: string;
            get hasCCFlagNumber(): string {
                return this._hasCCFlagNumber;
            }
            set hasCCFlagNumber(value: string) {
                this._hasCCFlagNumber = value;
            }

            private _isDebitCardFlagNumber: string;
            get isDebitCardFlagNumber(): string {
                return this._isDebitCardFlagNumber;
            }
            set isDebitCardFlagNumber(value: string) {
                this._isDebitCardFlagNumber = value;
            }

            private _isEmployeeFlagNumber: string;
            get isEmployeeFlagNumber(): string {
                return this._isEmployeeFlagNumber;
            }
            set isEmployeeFlagNumber(value: string) {
                this._isEmployeeFlagNumber = value;
            }

            private _loanClosedFlags: string[];
            get loanClosedFlags(): string[] {
                return this._loanClosedFlags;
            }
            set loanClosedFlags(value: string[]) {
                this._loanClosedFlags = value;
            }

            private _loanRestrictedAlerts: string[];
            get loanRestrictedAlerts(): string[] {
                return this._loanRestrictedAlerts;
            }
            set loanRestrictedAlerts(value: string[]) {
                this._loanRestrictedAlerts = value;
            }

            private _loanRestrictedInquire: string[];
            get loanRestrictedInquire(): string[] {
                return this._loanRestrictedInquire;
            }
            set loanRestrictedInquire(value: string[]) {
                this._loanRestrictedInquire = value;
            }

            private _midwestLoansFlag: string;
            get midwestLoansFlag(): string {
                return this._midwestLoansFlag;
            }
            set midwestLoansFlag(value: string) {
                this._midwestLoansFlag = value;
            }

            private _mobileDepositAllowedFlag: string;
            get mobileDepositAllowedFlag(): string {
                return this._mobileDepositAllowedFlag;
            }
            set mobileDepositAllowedFlag(value: string) {
                this._mobileDepositAllowedFlag = value;
            }

            private _mobileDepositRestrictedFlag: string;
            get mobileDepositRestrictedFlag(): string {
                return this._mobileDepositRestrictedFlag;
            }
            set mobileDepositRestrictedFlag(value: string) {
                this._mobileDepositRestrictedFlag = value;
            }

            private _mobileDepositDisclosureFlag: string;
            get mobileDepositDisclosureFlag(): string {
                return this._mobileDepositDisclosureFlag;
            }
            set mobileDepositDisclosureFlag(value: string) {
                this._mobileDepositDisclosureFlag = value;
            }

            private _obsMemberRestrictedAllTrans: string[];
            get obsMemberRestrictedAllTrans(): string[] {
                return this._obsMemberRestrictedAllTrans;
            }
            set obsMemberRestrictedAllTrans(value: string[]) {
                this._obsMemberRestrictedAllTrans = value;
            }

            private _obsMemberRestrictedDeposit: string[];
            get obsMemberRestrictedDeposit(): string[] {
                return this._obsMemberRestrictedDeposit;
            }
            set obsMemberRestrictedDeposit(value: string[]) {
                this._obsMemberRestrictedDeposit = value;
            }

            private _obsMemberRestrictedInquire: string[];
            get obsMemberRestrictedInquire(): string[] {
                return this._obsMemberRestrictedInquire;
            }
            set obsMemberRestrictedInquire(value: string[]) {
                this._obsMemberRestrictedInquire = value;
            }

            private _obsShareRestrictedDeposit: string[];
            get obsShareRestrictedDeposit(): string[] {
                return this._obsShareRestrictedDeposit;
            }
            set obsShareRestrictedDeposit(value: string[]) {
                this._obsShareRestrictedDeposit = value;
            }

            private _loanRestrictedDepositFlags: string[];
            get loanRestrictedDepositFlags(): string[] {
                return this._loanRestrictedDepositFlags;
            }
            set loanRestrictedDepositFlags(value: string[]) {
                this._loanRestrictedDepositFlags = value;
            }

            private _obsShareRestrictedInquire: string[];
            get obsShareRestrictedInquire(): string[] {
                return this._obsShareRestrictedInquire;
            }
            set obsShareRestrictedInquire(value: string[]) {
                this._obsShareRestrictedInquire = value;
            }

            private _obsShareRestrictedWithdraw: string[];
            get obsShareRestrictedWithdraw(): string[] {
                return this._obsShareRestrictedWithdraw;
            }
            set obsShareRestrictedWithdraw(value: string[]) {
                this._obsShareRestrictedWithdraw = value;
            }

            private _restrictViewingCardFlagNumber: string;
            get restrictViewingCardFlagNumber(): string {
                return this._restrictViewingCardFlagNumber;
            }
            set restrictViewingCardFlagNumber(value: string) {
                this._restrictViewingCardFlagNumber = value;
            }

            private _shareClosedFlags: string[];
            get shareClosedFlags(): string[] {
                return this._shareClosedFlags;
            }
            set shareClosedFlags(value: string[]) {
                this._shareClosedFlags = value;
            }

            private _shareRestrictedAlerts: string[];
            get shareRestrictedAlerts(): string[] {
                return this._shareRestrictedAlerts;
            }
            set shareRestrictedAlerts(value: string[]) {
                this._shareRestrictedAlerts = value;
            }

            private _skipPayQualifyFlag: string;
            get skipPayQualifyFlag(): string {
                return this._skipPayQualifyFlag;
            }
            set skipPayQualifyFlag(value: string) {
                this._skipPayQualifyFlag = value;
            }

            private _validAddressFlagNumber: string;
            get validAddressFlagNumber(): string {
                return this._validAddressFlagNumber;
            }
            set validAddressFlagNumber(value: string) {
                this._validAddressFlagNumber = value;
            }

            private _validEmailFlag: string;
            get validEmailFlag(): string {
                return this._validEmailFlag;
            }
            set validEmailFlag(value: string) {
                this._validEmailFlag = value;
            }

            private _nsfFlags: string;
            get nsfFlags(): string {
                return this._nsfFlags;
            }
            set nsfFlags(value: string) {
                this._nsfFlags = value;
            }

            private _shouldUpdateOnlineBankingRegisteredFlag: boolean;
            get shouldUpdateOnlineBankingRegisteredFlag(): boolean {
                return this._shouldUpdateOnlineBankingRegisteredFlag;
            }
            set shouldUpdateOnlineBankingRegisteredFlag(value: boolean) {
                this._shouldUpdateOnlineBankingRegisteredFlag = value;
            }

            private _onlineBankingRegisteredFlag: string;
            get onlineBankingRegisteredFlag(): string {
                return this._onlineBankingRegisteredFlag;
            }
            set onlineBankingRegisteredFlag(value: string) {
                this._onlineBankingRegisteredFlag = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Flags.HBFlagNumber", value: this._hBFlagNumber, dataType: 'string', label: "H B Flag Number" },
                { key: "Flags.BillPayFlagNumber", value: this._billPayFlagNumber, dataType: 'string', label: "Bill Pay Flag Number" },
                { key: "Flags.BusinessAccountFlag", value: this._businessAccountFlag, dataType: 'string', label: "Business Account Flag" },
                { key: "Flags.EStatementFlagNumber", value: this._eStatementFlagNumber, dataType: 'string', label: "E Statement Flag Number" },
                { key: "Flags.ShareRestrictedCheckWithdraw", value: this._shareRestrictedCheckWithdraw, dataType: 'list<string>', label: "Share Restricted Check Withdraw" },
                { key: "Flags.EDocumentsFlagNumber", value: this._eDocumentsFlagNumber, dataType: 'string', label: "E Documents Flag Number" },
                { key: "Flags.EscheatDateFlag", value: this._escheatDateFlag, dataType: 'string', label: "Escheat Date Flag" },
                { key: "Flags.FreeCheckReorderFlag", value: this._freeCheckReorderFlag, dataType: 'string', label: "Free Check Reorder Flag" },
                { key: "Flags.HasCCFlagNumber", value: this._hasCCFlagNumber, dataType: 'string', label: "Has C C Flag Number" },
                { key: "Flags.IsDebitCardFlagNumber", value: this._isDebitCardFlagNumber, dataType: 'string', label: "Is Debit Card Flag Number" },
                { key: "Flags.IsEmployeeFlagNumber", value: this._isEmployeeFlagNumber, dataType: 'string', label: "Is Employee Flag Number" },
                { key: "Flags.LoanClosedFlags", value: this._loanClosedFlags, dataType: 'list<string>', label: "Loan Closed Flags" },
                { key: "Flags.LoanRestrictedAlerts", value: this._loanRestrictedAlerts, dataType: 'list<string>', label: "Loan Restricted Alerts" },
                { key: "Flags.LoanRestrictedInquire", value: this._loanRestrictedInquire, dataType: 'list<string>', label: "Loan Restricted Inquire" },
                { key: "Flags.MidwestLoansFlag", value: this._midwestLoansFlag, dataType: 'string', label: "Midwest Loans Flag" },
                { key: "Flags.MobileDepositAllowedFlag", value: this._mobileDepositAllowedFlag, dataType: 'string', label: "Mobile Deposit Allowed Flag" },
                { key: "Flags.MobileDepositRestrictedFlag", value: this._mobileDepositRestrictedFlag, dataType: 'string', label: "Mobile Deposit Restricted Flag" },
                { key: "Flags.MobileDepositDisclosureFlag", value: this._mobileDepositDisclosureFlag, dataType: 'string', label: "Mobile Deposit Disclosure Flag" },
                { key: "Flags.obsMemberRestrictedAllTrans", value: this._obsMemberRestrictedAllTrans, dataType: 'list<string>', label: "Obs Member Restricted All Trans" },
                { key: "Flags.obsMemberRestrictedDeposit", value: this._obsMemberRestrictedDeposit, dataType: 'list<string>', label: "Obs Member Restricted Deposit" },
                { key: "Flags.obsMemberRestrictedInquire", value: this._obsMemberRestrictedInquire, dataType: 'list<string>', label: "Obs Member Restricted Inquire" },
                { key: "Flags.obsShareRestrictedDeposit", value: this._obsShareRestrictedDeposit, dataType: 'list<string>', label: "Obs Share Restricted Deposit" },
                { key: "Flags.LoanRestrictedDepositFlags", value: this._loanRestrictedDepositFlags, dataType: 'list<string>', label: "Loan Restricted Deposit Flags" },
                { key: "Flags.obsShareRestrictedInquire", value: this._obsShareRestrictedInquire, dataType: 'list<string>', label: "Obs Share Restricted Inquire" },
                { key: "Flags.obsShareRestrictedWithdraw", value: this._obsShareRestrictedWithdraw, dataType: 'list<string>', label: "Obs Share Restricted Withdraw" },
                { key: "Flags.RestrictViewingCardFlagNumber", value: this._restrictViewingCardFlagNumber, dataType: 'string', label: "Restrict Viewing Card Flag Number" },
                { key: "Flags.ShareClosedFlags", value: this._shareClosedFlags, dataType: 'list<string>', label: "Share Closed Flags" },
                { key: "Flags.ShareRestrictedAlerts", value: this._shareRestrictedAlerts, dataType: 'list<string>', label: "Share Restricted Alerts" },
                { key: "Flags.SkipPayQualifyFlag", value: this._skipPayQualifyFlag, dataType: 'string', label: "Skip Pay Qualify Flag" },
                { key: "Flags.ValidAddressFlagNumber", value: this._validAddressFlagNumber, dataType: 'string', label: "Valid Address Flag Number" },
                { key: "Flags.ValidEmailFlag", value: this._validEmailFlag, dataType: 'string', label: "Valid Email Flag" },
                { key: "Flags.NsfFlags", value: this._nsfFlags, dataType: 'string', label: "Nsf Flags" },
                { key: "Flags.ShouldUpdateOnlineBankingRegisteredFlag", value: this._shouldUpdateOnlineBankingRegisteredFlag, dataType: 'boolean', label: "Should Update Online Banking Registered Flag" },
                { key: "Flags.OnlineBankingRegisteredFlag", value: this._onlineBankingRegisteredFlag, dataType: 'string', label: "Online Banking Registered Flag" },
            ];
        }

}