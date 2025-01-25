import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Transfers } from './Transfers';
import { ScheduledTransfers } from './ScheduledTransfers';
import { AccountOpening } from './AccountOpening';
import { CrossAccountSettings } from './CrossAccountSettings';
import { DebitCards } from './DebitCards';
import { JointOwners } from './JointOwners';
import { Cards } from './Cards';
import { Escheat } from './Escheat';
export interface AccountSettingsConfig {
    GetDebitCardsDuringAccountInquiry: boolean;
    ShowClosedAccountsOnDashboard: boolean;
    HideLoanSummaryControlWhenMemberHasNoLoans: boolean;
    ShouldShowRateForSharesOnDashboardAndSummary: boolean;
    CertificateCategoriesForRates: string[];
    UseCoreSuffixNicknamesOnly: boolean;
    AccountCategoriesWithChecks: string[];
    CheckingAccountCategories: string[];
    ShareAccountCategories: string[];
    SavingsAccountCategories: string[];
    ShouldShowMmaChecks: boolean;
    HomeEquityCheckingAccountCategories: string[];
    Transfers: Transfers;
    ScheduledTransfers: ScheduledTransfers;
    AccountOpening: AccountOpening;
    CrossAccount: CrossAccountSettings;
    DebitCards: DebitCards;
    JointOwners: JointOwners;
    Cards: Cards;
    Escheat: Escheat;
    LineOfCreditCategories: string[];
    CoreCategoryToDisplayCategoryMappings: Record<string, string>;
    UsePreviousMicrNumber: boolean;
    RemoteDepositAccounts: string[];
    AliasType1: string;
    NicknameValidationRegex: string;
    ShowAccountLimitsOnDirectDepositPage: boolean;
}

export class AccountSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountSettings'
    };


            private _getDebitCardsDuringAccountInquiry: boolean;
            get getDebitCardsDuringAccountInquiry(): boolean {
                return this._getDebitCardsDuringAccountInquiry;
            }
            set getDebitCardsDuringAccountInquiry(value: boolean) {
                this._getDebitCardsDuringAccountInquiry = value;
            }

            private _showClosedAccountsOnDashboard: boolean;
            get showClosedAccountsOnDashboard(): boolean {
                return this._showClosedAccountsOnDashboard;
            }
            set showClosedAccountsOnDashboard(value: boolean) {
                this._showClosedAccountsOnDashboard = value;
            }

            private _hideLoanSummaryControlWhenMemberHasNoLoans: boolean;
            get hideLoanSummaryControlWhenMemberHasNoLoans(): boolean {
                return this._hideLoanSummaryControlWhenMemberHasNoLoans;
            }
            set hideLoanSummaryControlWhenMemberHasNoLoans(value: boolean) {
                this._hideLoanSummaryControlWhenMemberHasNoLoans = value;
            }

            private _shouldShowRateForSharesOnDashboardAndSummary: boolean;
            get shouldShowRateForSharesOnDashboardAndSummary(): boolean {
                return this._shouldShowRateForSharesOnDashboardAndSummary;
            }
            set shouldShowRateForSharesOnDashboardAndSummary(value: boolean) {
                this._shouldShowRateForSharesOnDashboardAndSummary = value;
            }

            private _certificateCategoriesForRates: string[];
            get certificateCategoriesForRates(): string[] {
                return this._certificateCategoriesForRates;
            }
            set certificateCategoriesForRates(value: string[]) {
                this._certificateCategoriesForRates = value;
            }

            private _useCoreSuffixNicknamesOnly: boolean;
            get useCoreSuffixNicknamesOnly(): boolean {
                return this._useCoreSuffixNicknamesOnly;
            }
            set useCoreSuffixNicknamesOnly(value: boolean) {
                this._useCoreSuffixNicknamesOnly = value;
            }

            private _accountCategoriesWithChecks: string[];
            get accountCategoriesWithChecks(): string[] {
                return this._accountCategoriesWithChecks;
            }
            set accountCategoriesWithChecks(value: string[]) {
                this._accountCategoriesWithChecks = value;
            }

            private _checkingAccountCategories: string[];
            get checkingAccountCategories(): string[] {
                return this._checkingAccountCategories;
            }
            set checkingAccountCategories(value: string[]) {
                this._checkingAccountCategories = value;
            }

            private _shareAccountCategories: string[];
            get shareAccountCategories(): string[] {
                return this._shareAccountCategories;
            }
            set shareAccountCategories(value: string[]) {
                this._shareAccountCategories = value;
            }

            private _savingsAccountCategories: string[];
            get savingsAccountCategories(): string[] {
                return this._savingsAccountCategories;
            }
            set savingsAccountCategories(value: string[]) {
                this._savingsAccountCategories = value;
            }

            private _shouldShowMmaChecks: boolean;
            get shouldShowMmaChecks(): boolean {
                return this._shouldShowMmaChecks;
            }
            set shouldShowMmaChecks(value: boolean) {
                this._shouldShowMmaChecks = value;
            }

            private _homeEquityCheckingAccountCategories: string[];
            get homeEquityCheckingAccountCategories(): string[] {
                return this._homeEquityCheckingAccountCategories;
            }
            set homeEquityCheckingAccountCategories(value: string[]) {
                this._homeEquityCheckingAccountCategories = value;
            }

            private _transfers: Transfers;
            get transfers(): Transfers {
                return this._transfers;
            }
            set transfers(value: Transfers) {
                this._transfers = value;
            }

            private _scheduledTransfers: ScheduledTransfers;
            get scheduledTransfers(): ScheduledTransfers {
                return this._scheduledTransfers;
            }
            set scheduledTransfers(value: ScheduledTransfers) {
                this._scheduledTransfers = value;
            }

            private _accountOpening: AccountOpening;
            get accountOpening(): AccountOpening {
                return this._accountOpening;
            }
            set accountOpening(value: AccountOpening) {
                this._accountOpening = value;
            }

            private _crossAccount: CrossAccountSettings;
            get crossAccount(): CrossAccountSettings {
                return this._crossAccount;
            }
            set crossAccount(value: CrossAccountSettings) {
                this._crossAccount = value;
            }

            private _debitCards: DebitCards;
            get debitCards(): DebitCards {
                return this._debitCards;
            }
            set debitCards(value: DebitCards) {
                this._debitCards = value;
            }

            private _jointOwners: JointOwners;
            get jointOwners(): JointOwners {
                return this._jointOwners;
            }
            set jointOwners(value: JointOwners) {
                this._jointOwners = value;
            }

            private _cards: Cards;
            get cards(): Cards {
                return this._cards;
            }
            set cards(value: Cards) {
                this._cards = value;
            }

            private _escheat: Escheat;
            get escheat(): Escheat {
                return this._escheat;
            }
            set escheat(value: Escheat) {
                this._escheat = value;
            }

            private _lineOfCreditCategories: string[];
            get lineOfCreditCategories(): string[] {
                return this._lineOfCreditCategories;
            }
            set lineOfCreditCategories(value: string[]) {
                this._lineOfCreditCategories = value;
            }

            private _coreCategoryToDisplayCategoryMappings: Record<string, string>;
            get coreCategoryToDisplayCategoryMappings(): Record<string, string> {
                return this._coreCategoryToDisplayCategoryMappings;
            }
            set coreCategoryToDisplayCategoryMappings(value: Record<string, string>) {
                this._coreCategoryToDisplayCategoryMappings = value;
            }

            private _usePreviousMicrNumber: boolean;
            get usePreviousMicrNumber(): boolean {
                return this._usePreviousMicrNumber;
            }
            set usePreviousMicrNumber(value: boolean) {
                this._usePreviousMicrNumber = value;
            }

            private _remoteDepositAccounts: string[];
            get remoteDepositAccounts(): string[] {
                return this._remoteDepositAccounts;
            }
            set remoteDepositAccounts(value: string[]) {
                this._remoteDepositAccounts = value;
            }

            private _aliasType1: string;
            get aliasType1(): string {
                return this._aliasType1;
            }
            set aliasType1(value: string) {
                this._aliasType1 = value;
            }

            private _nicknameValidationRegex: string;
            get nicknameValidationRegex(): string {
                return this._nicknameValidationRegex;
            }
            set nicknameValidationRegex(value: string) {
                this._nicknameValidationRegex = value;
            }

            private _showAccountLimitsOnDirectDepositPage: boolean;
            get showAccountLimitsOnDirectDepositPage(): boolean {
                return this._showAccountLimitsOnDirectDepositPage;
            }
            set showAccountLimitsOnDirectDepositPage(value: boolean) {
                this._showAccountLimitsOnDirectDepositPage = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountSettings.GetDebitCardsDuringAccountInquiry", value: this._getDebitCardsDuringAccountInquiry, dataType: 'boolean', label: "Get Debit Cards During Account Inquiry" },
                { key: "AccountSettings.ShowClosedAccountsOnDashboard", value: this._showClosedAccountsOnDashboard, dataType: 'boolean', label: "Show Closed Accounts On Dashboard" },
                { key: "AccountSettings.HideLoanSummaryControlWhenMemberHasNoLoans", value: this._hideLoanSummaryControlWhenMemberHasNoLoans, dataType: 'boolean', label: "Hide Loan Summary Control When Member Has No Loans" },
                { key: "AccountSettings.ShouldShowRateForSharesOnDashboardAndSummary", value: this._shouldShowRateForSharesOnDashboardAndSummary, dataType: 'boolean', label: "Should Show Rate For Shares On Dashboard And Summary" },
                { key: "AccountSettings.CertificateCategoriesForRates", value: this._certificateCategoriesForRates, dataType: 'list<string>', label: "Certificate Categories For Rates" },
                { key: "AccountSettings.UseCoreSuffixNicknamesOnly", value: this._useCoreSuffixNicknamesOnly, dataType: 'boolean', label: "Use Core Suffix Nicknames Only" },
                { key: "AccountSettings.AccountCategoriesWithChecks", value: this._accountCategoriesWithChecks, dataType: 'list<string>', label: "Account Categories With Checks" },
                { key: "AccountSettings.CheckingAccountCategories", value: this._checkingAccountCategories, dataType: 'list<string>', label: "Checking Account Categories" },
                { key: "AccountSettings.ShareAccountCategories", value: this._shareAccountCategories, dataType: 'list<string>', label: "Share Account Categories" },
                { key: "AccountSettings.SavingsAccountCategories", value: this._savingsAccountCategories, dataType: 'list<string>', label: "Savings Account Categories" },
                { key: "AccountSettings.ShouldShowMmaChecks", value: this._shouldShowMmaChecks, dataType: 'boolean', label: "Should Show Mma Checks" },
                { key: "AccountSettings.HomeEquityCheckingAccountCategories", value: this._homeEquityCheckingAccountCategories, dataType: 'list<string>', label: "Home Equity Checking Account Categories" },
                { key: "AccountSettings.Transfers", value: this._transfers, dataType: 'transfers', label: "Transfers" },
                { key: "AccountSettings.ScheduledTransfers", value: this._scheduledTransfers, dataType: 'scheduledtransfers', label: "Scheduled Transfers" },
                { key: "AccountSettings.AccountOpening", value: this._accountOpening, dataType: 'accountopening', label: "Account Opening" },
                { key: "AccountSettings.CrossAccount", value: this._crossAccount, dataType: 'crossaccountsettings', label: "Cross Account" },
                { key: "AccountSettings.DebitCards", value: this._debitCards, dataType: 'debitcards', label: "Debit Cards" },
                { key: "AccountSettings.JointOwners", value: this._jointOwners, dataType: 'jointowners', label: "Joint Owners" },
                { key: "AccountSettings.Cards", value: this._cards, dataType: 'cards', label: "Cards" },
                { key: "AccountSettings.Escheat", value: this._escheat, dataType: 'escheat', label: "Escheat" },
                { key: "AccountSettings.LineOfCreditCategories", value: this._lineOfCreditCategories, dataType: 'list<string>', label: "Line Of Credit Categories" },
                { key: "AccountSettings.CoreCategoryToDisplayCategoryMappings", value: this._coreCategoryToDisplayCategoryMappings, dataType: 'record<string, string>', label: "Core Category To Display Category Mappings" },
                { key: "AccountSettings.UsePreviousMicrNumber", value: this._usePreviousMicrNumber, dataType: 'boolean', label: "Use Previous Micr Number" },
                { key: "AccountSettings.RemoteDepositAccounts", value: this._remoteDepositAccounts, dataType: 'list<string>', label: "Remote Deposit Accounts" },
                { key: "AccountSettings.AliasType1", value: this._aliasType1, dataType: 'string', label: "Alias Type1" },
                { key: "AccountSettings.NicknameValidationRegex", value: this._nicknameValidationRegex, dataType: 'string', label: "Nickname Validation Regex" },
                { key: "AccountSettings.ShowAccountLimitsOnDirectDepositPage", value: this._showAccountLimitsOnDirectDepositPage, dataType: 'boolean', label: "Show Account Limits On Direct Deposit Page" },
            ];
        }

}