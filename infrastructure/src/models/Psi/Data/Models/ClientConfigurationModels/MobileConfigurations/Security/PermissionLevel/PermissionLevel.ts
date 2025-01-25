import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AuthenticationMethodType } from './AuthenticationMethodType';
export interface PermissionLevelConfig {
    TransactionHistory: AuthenticationMethodType;
    AccountSummary: AuthenticationMethodType;
    BillPay: AuthenticationMethodType;
    CardControl: AuthenticationMethodType;
    Cardlytics: AuthenticationMethodType;
    Estatements: AuthenticationMethodType;
    LoanApplication: AuthenticationMethodType;
    CheckDeposit: AuthenticationMethodType;
    MoneyDesktop: AuthenticationMethodType;
    RelevantSolutions: AuthenticationMethodType;
    QuickAccess: AuthenticationMethodType;
    SendMoney: AuthenticationMethodType;
    Settings: AuthenticationMethodType;
    Transfer: AuthenticationMethodType;
    CheckingRewards: AuthenticationMethodType;
    AutoLoanCalculator: AuthenticationMethodType;
    LoanPayment: AuthenticationMethodType;
}

export class PermissionLevel implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PermissionLevel'
    };


            private _transactionHistory: AuthenticationMethodType;
            get transactionHistory(): AuthenticationMethodType {
                return this._transactionHistory;
            }
            set transactionHistory(value: AuthenticationMethodType) {
                this._transactionHistory = value;
            }

            private _accountSummary: AuthenticationMethodType;
            get accountSummary(): AuthenticationMethodType {
                return this._accountSummary;
            }
            set accountSummary(value: AuthenticationMethodType) {
                this._accountSummary = value;
            }

            private _billPay: AuthenticationMethodType;
            get billPay(): AuthenticationMethodType {
                return this._billPay;
            }
            set billPay(value: AuthenticationMethodType) {
                this._billPay = value;
            }

            private _cardControl: AuthenticationMethodType;
            get cardControl(): AuthenticationMethodType {
                return this._cardControl;
            }
            set cardControl(value: AuthenticationMethodType) {
                this._cardControl = value;
            }

            private _cardlytics: AuthenticationMethodType;
            get cardlytics(): AuthenticationMethodType {
                return this._cardlytics;
            }
            set cardlytics(value: AuthenticationMethodType) {
                this._cardlytics = value;
            }

            private _estatements: AuthenticationMethodType;
            get estatements(): AuthenticationMethodType {
                return this._estatements;
            }
            set estatements(value: AuthenticationMethodType) {
                this._estatements = value;
            }

            private _loanApplication: AuthenticationMethodType;
            get loanApplication(): AuthenticationMethodType {
                return this._loanApplication;
            }
            set loanApplication(value: AuthenticationMethodType) {
                this._loanApplication = value;
            }

            private _checkDeposit: AuthenticationMethodType;
            get checkDeposit(): AuthenticationMethodType {
                return this._checkDeposit;
            }
            set checkDeposit(value: AuthenticationMethodType) {
                this._checkDeposit = value;
            }

            private _moneyDesktop: AuthenticationMethodType;
            get moneyDesktop(): AuthenticationMethodType {
                return this._moneyDesktop;
            }
            set moneyDesktop(value: AuthenticationMethodType) {
                this._moneyDesktop = value;
            }

            private _relevantSolutions: AuthenticationMethodType;
            get relevantSolutions(): AuthenticationMethodType {
                return this._relevantSolutions;
            }
            set relevantSolutions(value: AuthenticationMethodType) {
                this._relevantSolutions = value;
            }

            private _quickAccess: AuthenticationMethodType;
            get quickAccess(): AuthenticationMethodType {
                return this._quickAccess;
            }
            set quickAccess(value: AuthenticationMethodType) {
                this._quickAccess = value;
            }

            private _sendMoney: AuthenticationMethodType;
            get sendMoney(): AuthenticationMethodType {
                return this._sendMoney;
            }
            set sendMoney(value: AuthenticationMethodType) {
                this._sendMoney = value;
            }

            private _settings: AuthenticationMethodType;
            get settings(): AuthenticationMethodType {
                return this._settings;
            }
            set settings(value: AuthenticationMethodType) {
                this._settings = value;
            }

            private _transfer: AuthenticationMethodType;
            get transfer(): AuthenticationMethodType {
                return this._transfer;
            }
            set transfer(value: AuthenticationMethodType) {
                this._transfer = value;
            }

            private _checkingRewards: AuthenticationMethodType;
            get checkingRewards(): AuthenticationMethodType {
                return this._checkingRewards;
            }
            set checkingRewards(value: AuthenticationMethodType) {
                this._checkingRewards = value;
            }

            private _autoLoanCalculator: AuthenticationMethodType;
            get autoLoanCalculator(): AuthenticationMethodType {
                return this._autoLoanCalculator;
            }
            set autoLoanCalculator(value: AuthenticationMethodType) {
                this._autoLoanCalculator = value;
            }

            private _loanPayment: AuthenticationMethodType;
            get loanPayment(): AuthenticationMethodType {
                return this._loanPayment;
            }
            set loanPayment(value: AuthenticationMethodType) {
                this._loanPayment = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PermissionLevel.TransactionHistory", value: this._transactionHistory, dataType: 'authenticationmethodtype', label: "Transaction History" },
                { key: "PermissionLevel.AccountSummary", value: this._accountSummary, dataType: 'authenticationmethodtype', label: "Account Summary" },
                { key: "PermissionLevel.BillPay", value: this._billPay, dataType: 'authenticationmethodtype', label: "Bill Pay" },
                { key: "PermissionLevel.CardControl", value: this._cardControl, dataType: 'authenticationmethodtype', label: "Card Control" },
                { key: "PermissionLevel.Cardlytics", value: this._cardlytics, dataType: 'authenticationmethodtype', label: "Cardlytics" },
                { key: "PermissionLevel.Estatements", value: this._estatements, dataType: 'authenticationmethodtype', label: "Estatements" },
                { key: "PermissionLevel.LoanApplication", value: this._loanApplication, dataType: 'authenticationmethodtype', label: "Loan Application" },
                { key: "PermissionLevel.CheckDeposit", value: this._checkDeposit, dataType: 'authenticationmethodtype', label: "Check Deposit" },
                { key: "PermissionLevel.MoneyDesktop", value: this._moneyDesktop, dataType: 'authenticationmethodtype', label: "Money Desktop" },
                { key: "PermissionLevel.RelevantSolutions", value: this._relevantSolutions, dataType: 'authenticationmethodtype', label: "Relevant Solutions" },
                { key: "PermissionLevel.QuickAccess", value: this._quickAccess, dataType: 'authenticationmethodtype', label: "Quick Access" },
                { key: "PermissionLevel.SendMoney", value: this._sendMoney, dataType: 'authenticationmethodtype', label: "Send Money" },
                { key: "PermissionLevel.Settings", value: this._settings, dataType: 'authenticationmethodtype', label: "Settings" },
                { key: "PermissionLevel.Transfer", value: this._transfer, dataType: 'authenticationmethodtype', label: "Transfer" },
                { key: "PermissionLevel.CheckingRewards", value: this._checkingRewards, dataType: 'authenticationmethodtype', label: "Checking Rewards" },
                { key: "PermissionLevel.AutoLoanCalculator", value: this._autoLoanCalculator, dataType: 'authenticationmethodtype', label: "Auto Loan Calculator" },
                { key: "PermissionLevel.LoanPayment", value: this._loanPayment, dataType: 'authenticationmethodtype', label: "Loan Payment" },
            ];
        }

}