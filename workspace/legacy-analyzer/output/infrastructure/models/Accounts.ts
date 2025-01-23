import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Nicknames } from './Nicknames';
import { AccountHistoryQuickActions } from './AccountHistoryQuickActions';
import { Authentication } from './Authentication';
import { Cards } from './Cards';
export interface AccountsConfig {
    DisplayBalanceAndAvailable: boolean;
    CanHideClosedAccounts: boolean;
    NewAccountsInterfaceEnabled: boolean;
    LoadCrossAccounts: boolean;
    AccountHistorySearchBarEnabled: boolean;
    ShouldShowCertificateDetails: boolean;
    ShouldShowApplyForCreditCard: boolean;
    ApplyForCreditCardUrl: string;
    ApplyForCreditCardUrlTarget: string;
    ShouldShowMicrNumber: boolean;
    UsePreviousMicrNumber: boolean;
    AccountInquiryExpirationTime: number;
    ShowMaskedAccountSuffixInAccountName: boolean;
    Nicknames: Nicknames;
    AccountHistoryQuickActions: AccountHistoryQuickActions;
    Authentication: Authentication;
    Cards: Cards;
}

export class Accounts implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Accounts'
    };


            private _displayBalanceAndAvailable: boolean;
            get displayBalanceAndAvailable(): boolean {
                return this._displayBalanceAndAvailable;
            }
            set displayBalanceAndAvailable(value: boolean) {
                this._displayBalanceAndAvailable = value;
            }

            private _canHideClosedAccounts: boolean;
            get canHideClosedAccounts(): boolean {
                return this._canHideClosedAccounts;
            }
            set canHideClosedAccounts(value: boolean) {
                this._canHideClosedAccounts = value;
            }

            private _newAccountsInterfaceEnabled: boolean;
            get newAccountsInterfaceEnabled(): boolean {
                return this._newAccountsInterfaceEnabled;
            }
            set newAccountsInterfaceEnabled(value: boolean) {
                this._newAccountsInterfaceEnabled = value;
            }

            private _loadCrossAccounts: boolean;
            get loadCrossAccounts(): boolean {
                return this._loadCrossAccounts;
            }
            set loadCrossAccounts(value: boolean) {
                this._loadCrossAccounts = value;
            }

            private _accountHistorySearchBarEnabled: boolean;
            get accountHistorySearchBarEnabled(): boolean {
                return this._accountHistorySearchBarEnabled;
            }
            set accountHistorySearchBarEnabled(value: boolean) {
                this._accountHistorySearchBarEnabled = value;
            }

            private _shouldShowCertificateDetails: boolean;
            get shouldShowCertificateDetails(): boolean {
                return this._shouldShowCertificateDetails;
            }
            set shouldShowCertificateDetails(value: boolean) {
                this._shouldShowCertificateDetails = value;
            }

            private _shouldShowApplyForCreditCard: boolean;
            get shouldShowApplyForCreditCard(): boolean {
                return this._shouldShowApplyForCreditCard;
            }
            set shouldShowApplyForCreditCard(value: boolean) {
                this._shouldShowApplyForCreditCard = value;
            }

            private _applyForCreditCardUrl: string;
            get applyForCreditCardUrl(): string {
                return this._applyForCreditCardUrl;
            }
            set applyForCreditCardUrl(value: string) {
                this._applyForCreditCardUrl = value;
            }

            private _applyForCreditCardUrlTarget: string;
            get applyForCreditCardUrlTarget(): string {
                return this._applyForCreditCardUrlTarget;
            }
            set applyForCreditCardUrlTarget(value: string) {
                this._applyForCreditCardUrlTarget = value;
            }

            private _shouldShowMicrNumber: boolean;
            get shouldShowMicrNumber(): boolean {
                return this._shouldShowMicrNumber;
            }
            set shouldShowMicrNumber(value: boolean) {
                this._shouldShowMicrNumber = value;
            }

            private _usePreviousMicrNumber: boolean;
            get usePreviousMicrNumber(): boolean {
                return this._usePreviousMicrNumber;
            }
            set usePreviousMicrNumber(value: boolean) {
                this._usePreviousMicrNumber = value;
            }

            private _accountInquiryExpirationTime: number;
            get accountInquiryExpirationTime(): number {
                return this._accountInquiryExpirationTime;
            }
            set accountInquiryExpirationTime(value: number) {
                this._accountInquiryExpirationTime = value;
            }

            private _showMaskedAccountSuffixInAccountName: boolean;
            get showMaskedAccountSuffixInAccountName(): boolean {
                return this._showMaskedAccountSuffixInAccountName;
            }
            set showMaskedAccountSuffixInAccountName(value: boolean) {
                this._showMaskedAccountSuffixInAccountName = value;
            }

            private _nicknames: Nicknames;
            get nicknames(): Nicknames {
                return this._nicknames;
            }
            set nicknames(value: Nicknames) {
                this._nicknames = value;
            }

            private _accountHistoryQuickActions: AccountHistoryQuickActions;
            get accountHistoryQuickActions(): AccountHistoryQuickActions {
                return this._accountHistoryQuickActions;
            }
            set accountHistoryQuickActions(value: AccountHistoryQuickActions) {
                this._accountHistoryQuickActions = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }

            private _cards: Cards;
            get cards(): Cards {
                return this._cards;
            }
            set cards(value: Cards) {
                this._cards = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Accounts.DisplayBalanceAndAvailable", value: this._displayBalanceAndAvailable, dataType: 'boolean', label: "Display Balance And Available" },
                { key: "Accounts.CanHideClosedAccounts", value: this._canHideClosedAccounts, dataType: 'boolean', label: "Can Hide Closed Accounts" },
                { key: "Accounts.NewAccountsInterfaceEnabled", value: this._newAccountsInterfaceEnabled, dataType: 'boolean', label: "New Accounts Interface Enabled" },
                { key: "Accounts.LoadCrossAccounts", value: this._loadCrossAccounts, dataType: 'boolean', label: "Load Cross Accounts" },
                { key: "Accounts.AccountHistorySearchBarEnabled", value: this._accountHistorySearchBarEnabled, dataType: 'boolean', label: "Account History Search Bar Enabled" },
                { key: "Accounts.ShouldShowCertificateDetails", value: this._shouldShowCertificateDetails, dataType: 'boolean', label: "Should Show Certificate Details" },
                { key: "Accounts.ShouldShowApplyForCreditCard", value: this._shouldShowApplyForCreditCard, dataType: 'boolean', label: "Should Show Apply For Credit Card" },
                { key: "Accounts.ApplyForCreditCardUrl", value: this._applyForCreditCardUrl, dataType: 'string', label: "Apply For Credit Card Url" },
                { key: "Accounts.ApplyForCreditCardUrlTarget", value: this._applyForCreditCardUrlTarget, dataType: 'string', label: "Apply For Credit Card Url Target" },
                { key: "Accounts.ShouldShowMicrNumber", value: this._shouldShowMicrNumber, dataType: 'boolean', label: "Should Show Micr Number" },
                { key: "Accounts.UsePreviousMicrNumber", value: this._usePreviousMicrNumber, dataType: 'boolean', label: "Use Previous Micr Number" },
                { key: "Accounts.AccountInquiryExpirationTime", value: this._accountInquiryExpirationTime, dataType: 'number', label: "Account Inquiry Expiration Time" },
                { key: "Accounts.ShowMaskedAccountSuffixInAccountName", value: this._showMaskedAccountSuffixInAccountName, dataType: 'boolean', label: "Show Masked Account Suffix In Account Name" },
                { key: "Accounts.Nicknames", value: this._nicknames, dataType: 'nicknames', label: "Nicknames" },
                { key: "Accounts.AccountHistoryQuickActions", value: this._accountHistoryQuickActions, dataType: 'accounthistoryquickactions', label: "Account History Quick Actions" },
                { key: "Accounts.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
                { key: "Accounts.Cards", value: this._cards, dataType: 'cards', label: "Cards" },
            ];
        }

}