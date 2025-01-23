import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { DisplayCheckHolds } from './DisplayCheckHolds';
import { LinkedAccountHistory } from './LinkedAccountHistory';
export interface AccountHistoryConfig {
    DisplayCheckHolds: DisplayCheckHolds;
    LinkedAccounts: LinkedAccountHistory;
    IsOrderedBySequenceNumber: boolean;
    MortgagePaymentHistoryIncludesEscrowInfoEnabled: boolean;
    ShouldAddDaysToEndDate: boolean;
    DisplayMortgagePaymentEscrowDetails: boolean;
    ShowPendingPaymentPostDate: boolean;
    ShouldShowExtraInfoInRowInsteadOfPopover: boolean;
    ShouldShowAvailableBalanceMessagePopover: boolean;
    ShouldShowAvailableBalanceMessagePopoverOnlyForShares: boolean;
    ShouldOpenMoreDetailsInExternalWebBrowser: boolean;
    PendingTransactionTypeDisplayNames: Record<string, string>;
    ShouldShowAvailableBalanceInBoldFont: boolean;
    ShouldShowPointOfSaleOrAtmTransactionMessage: boolean;
    PointOfSaleOrAtmTransactionAccountCategories: string[];
    ShowPendingTransactionsTag: boolean;
    SymitarHoldTypes: string[];
    SymitarCheckHoldTypesEnabled: boolean;
    ObscureSuffixInUrl: boolean;
    UseEffectiveDateInsteadOfPostDate: boolean;
    ShouldShowPayoffMessageForLoanEvenWhenNoDueDate: boolean;
    AccountNumberHistoryEnabled: boolean;
    ShouldShowPreviousAvailableBalance: boolean;
    SuppressPreviousAvailableBalanceForPendingTransactions: boolean;
    ShowPreviousAvailableMessagePopover: boolean;
    ShowPreviousAvailableBalanceAccountCategories: string[];
    ShouldExcludePendingTransactionOnExport: boolean;
}

export class AccountHistory implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountHistory'
    };


            private _displayCheckHolds: DisplayCheckHolds;
            get displayCheckHolds(): DisplayCheckHolds {
                return this._displayCheckHolds;
            }
            set displayCheckHolds(value: DisplayCheckHolds) {
                this._displayCheckHolds = value;
            }

            private _linkedAccounts: LinkedAccountHistory;
            get linkedAccounts(): LinkedAccountHistory {
                return this._linkedAccounts;
            }
            set linkedAccounts(value: LinkedAccountHistory) {
                this._linkedAccounts = value;
            }

            private _isOrderedBySequenceNumber: boolean;
            get isOrderedBySequenceNumber(): boolean {
                return this._isOrderedBySequenceNumber;
            }
            set isOrderedBySequenceNumber(value: boolean) {
                this._isOrderedBySequenceNumber = value;
            }

            private _mortgagePaymentHistoryIncludesEscrowInfoEnabled: boolean;
            get mortgagePaymentHistoryIncludesEscrowInfoEnabled(): boolean {
                return this._mortgagePaymentHistoryIncludesEscrowInfoEnabled;
            }
            set mortgagePaymentHistoryIncludesEscrowInfoEnabled(value: boolean) {
                this._mortgagePaymentHistoryIncludesEscrowInfoEnabled = value;
            }

            private _shouldAddDaysToEndDate: boolean;
            get shouldAddDaysToEndDate(): boolean {
                return this._shouldAddDaysToEndDate;
            }
            set shouldAddDaysToEndDate(value: boolean) {
                this._shouldAddDaysToEndDate = value;
            }

            private _displayMortgagePaymentEscrowDetails: boolean;
            get displayMortgagePaymentEscrowDetails(): boolean {
                return this._displayMortgagePaymentEscrowDetails;
            }
            set displayMortgagePaymentEscrowDetails(value: boolean) {
                this._displayMortgagePaymentEscrowDetails = value;
            }

            private _showPendingPaymentPostDate: boolean;
            get showPendingPaymentPostDate(): boolean {
                return this._showPendingPaymentPostDate;
            }
            set showPendingPaymentPostDate(value: boolean) {
                this._showPendingPaymentPostDate = value;
            }

            private _shouldShowExtraInfoInRowInsteadOfPopover: boolean;
            get shouldShowExtraInfoInRowInsteadOfPopover(): boolean {
                return this._shouldShowExtraInfoInRowInsteadOfPopover;
            }
            set shouldShowExtraInfoInRowInsteadOfPopover(value: boolean) {
                this._shouldShowExtraInfoInRowInsteadOfPopover = value;
            }

            private _shouldShowAvailableBalanceMessagePopover: boolean;
            get shouldShowAvailableBalanceMessagePopover(): boolean {
                return this._shouldShowAvailableBalanceMessagePopover;
            }
            set shouldShowAvailableBalanceMessagePopover(value: boolean) {
                this._shouldShowAvailableBalanceMessagePopover = value;
            }

            private _shouldShowAvailableBalanceMessagePopoverOnlyForShares: boolean;
            get shouldShowAvailableBalanceMessagePopoverOnlyForShares(): boolean {
                return this._shouldShowAvailableBalanceMessagePopoverOnlyForShares;
            }
            set shouldShowAvailableBalanceMessagePopoverOnlyForShares(value: boolean) {
                this._shouldShowAvailableBalanceMessagePopoverOnlyForShares = value;
            }

            private _shouldOpenMoreDetailsInExternalWebBrowser: boolean;
            get shouldOpenMoreDetailsInExternalWebBrowser(): boolean {
                return this._shouldOpenMoreDetailsInExternalWebBrowser;
            }
            set shouldOpenMoreDetailsInExternalWebBrowser(value: boolean) {
                this._shouldOpenMoreDetailsInExternalWebBrowser = value;
            }

            private _pendingTransactionTypeDisplayNames: Record<string, string>;
            get pendingTransactionTypeDisplayNames(): Record<string, string> {
                return this._pendingTransactionTypeDisplayNames;
            }
            set pendingTransactionTypeDisplayNames(value: Record<string, string>) {
                this._pendingTransactionTypeDisplayNames = value;
            }

            private _shouldShowAvailableBalanceInBoldFont: boolean;
            get shouldShowAvailableBalanceInBoldFont(): boolean {
                return this._shouldShowAvailableBalanceInBoldFont;
            }
            set shouldShowAvailableBalanceInBoldFont(value: boolean) {
                this._shouldShowAvailableBalanceInBoldFont = value;
            }

            private _shouldShowPointOfSaleOrAtmTransactionMessage: boolean;
            get shouldShowPointOfSaleOrAtmTransactionMessage(): boolean {
                return this._shouldShowPointOfSaleOrAtmTransactionMessage;
            }
            set shouldShowPointOfSaleOrAtmTransactionMessage(value: boolean) {
                this._shouldShowPointOfSaleOrAtmTransactionMessage = value;
            }

            private _pointOfSaleOrAtmTransactionAccountCategories: string[];
            get pointOfSaleOrAtmTransactionAccountCategories(): string[] {
                return this._pointOfSaleOrAtmTransactionAccountCategories;
            }
            set pointOfSaleOrAtmTransactionAccountCategories(value: string[]) {
                this._pointOfSaleOrAtmTransactionAccountCategories = value;
            }

            private _showPendingTransactionsTag: boolean;
            get showPendingTransactionsTag(): boolean {
                return this._showPendingTransactionsTag;
            }
            set showPendingTransactionsTag(value: boolean) {
                this._showPendingTransactionsTag = value;
            }

            private _symitarHoldTypes: string[];
            get symitarHoldTypes(): string[] {
                return this._symitarHoldTypes;
            }
            set symitarHoldTypes(value: string[]) {
                this._symitarHoldTypes = value;
            }

            private _symitarCheckHoldTypesEnabled: boolean;
            get symitarCheckHoldTypesEnabled(): boolean {
                return this._symitarCheckHoldTypesEnabled;
            }
            set symitarCheckHoldTypesEnabled(value: boolean) {
                this._symitarCheckHoldTypesEnabled = value;
            }

            private _obscureSuffixInUrl: boolean;
            get obscureSuffixInUrl(): boolean {
                return this._obscureSuffixInUrl;
            }
            set obscureSuffixInUrl(value: boolean) {
                this._obscureSuffixInUrl = value;
            }

            private _useEffectiveDateInsteadOfPostDate: boolean;
            get useEffectiveDateInsteadOfPostDate(): boolean {
                return this._useEffectiveDateInsteadOfPostDate;
            }
            set useEffectiveDateInsteadOfPostDate(value: boolean) {
                this._useEffectiveDateInsteadOfPostDate = value;
            }

            private _shouldShowPayoffMessageForLoanEvenWhenNoDueDate: boolean;
            get shouldShowPayoffMessageForLoanEvenWhenNoDueDate(): boolean {
                return this._shouldShowPayoffMessageForLoanEvenWhenNoDueDate;
            }
            set shouldShowPayoffMessageForLoanEvenWhenNoDueDate(value: boolean) {
                this._shouldShowPayoffMessageForLoanEvenWhenNoDueDate = value;
            }

            private _accountNumberHistoryEnabled: boolean;
            get accountNumberHistoryEnabled(): boolean {
                return this._accountNumberHistoryEnabled;
            }
            set accountNumberHistoryEnabled(value: boolean) {
                this._accountNumberHistoryEnabled = value;
            }

            private _shouldShowPreviousAvailableBalance: boolean;
            get shouldShowPreviousAvailableBalance(): boolean {
                return this._shouldShowPreviousAvailableBalance;
            }
            set shouldShowPreviousAvailableBalance(value: boolean) {
                this._shouldShowPreviousAvailableBalance = value;
            }

            private _suppressPreviousAvailableBalanceForPendingTransactions: boolean;
            get suppressPreviousAvailableBalanceForPendingTransactions(): boolean {
                return this._suppressPreviousAvailableBalanceForPendingTransactions;
            }
            set suppressPreviousAvailableBalanceForPendingTransactions(value: boolean) {
                this._suppressPreviousAvailableBalanceForPendingTransactions = value;
            }

            private _showPreviousAvailableMessagePopover: boolean;
            get showPreviousAvailableMessagePopover(): boolean {
                return this._showPreviousAvailableMessagePopover;
            }
            set showPreviousAvailableMessagePopover(value: boolean) {
                this._showPreviousAvailableMessagePopover = value;
            }

            private _showPreviousAvailableBalanceAccountCategories: string[];
            get showPreviousAvailableBalanceAccountCategories(): string[] {
                return this._showPreviousAvailableBalanceAccountCategories;
            }
            set showPreviousAvailableBalanceAccountCategories(value: string[]) {
                this._showPreviousAvailableBalanceAccountCategories = value;
            }

            private _shouldExcludePendingTransactionOnExport: boolean;
            get shouldExcludePendingTransactionOnExport(): boolean {
                return this._shouldExcludePendingTransactionOnExport;
            }
            set shouldExcludePendingTransactionOnExport(value: boolean) {
                this._shouldExcludePendingTransactionOnExport = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountHistory.DisplayCheckHolds", value: this._displayCheckHolds, dataType: 'displaycheckholds', label: "Display Check Holds" },
                { key: "AccountHistory.LinkedAccounts", value: this._linkedAccounts, dataType: 'linkedaccounthistory', label: "Linked Accounts" },
                { key: "AccountHistory.IsOrderedBySequenceNumber", value: this._isOrderedBySequenceNumber, dataType: 'boolean', label: "Is Ordered By Sequence Number" },
                { key: "AccountHistory.MortgagePaymentHistoryIncludesEscrowInfoEnabled", value: this._mortgagePaymentHistoryIncludesEscrowInfoEnabled, dataType: 'boolean', label: "Mortgage Payment History Includes Escrow Info Enabled" },
                { key: "AccountHistory.ShouldAddDaysToEndDate", value: this._shouldAddDaysToEndDate, dataType: 'boolean', label: "Should Add Days To End Date" },
                { key: "AccountHistory.DisplayMortgagePaymentEscrowDetails", value: this._displayMortgagePaymentEscrowDetails, dataType: 'boolean', label: "Display Mortgage Payment Escrow Details" },
                { key: "AccountHistory.ShowPendingPaymentPostDate", value: this._showPendingPaymentPostDate, dataType: 'boolean', label: "Show Pending Payment Post Date" },
                { key: "AccountHistory.ShouldShowExtraInfoInRowInsteadOfPopover", value: this._shouldShowExtraInfoInRowInsteadOfPopover, dataType: 'boolean', label: "Should Show Extra Info In Row Instead Of Popover" },
                { key: "AccountHistory.ShouldShowAvailableBalanceMessagePopover", value: this._shouldShowAvailableBalanceMessagePopover, dataType: 'boolean', label: "Should Show Available Balance Message Popover" },
                { key: "AccountHistory.ShouldShowAvailableBalanceMessagePopoverOnlyForShares", value: this._shouldShowAvailableBalanceMessagePopoverOnlyForShares, dataType: 'boolean', label: "Should Show Available Balance Message Popover Only For Shares" },
                { key: "AccountHistory.ShouldOpenMoreDetailsInExternalWebBrowser", value: this._shouldOpenMoreDetailsInExternalWebBrowser, dataType: 'boolean', label: "Should Open More Details In External Web Browser" },
                { key: "AccountHistory.PendingTransactionTypeDisplayNames", value: this._pendingTransactionTypeDisplayNames, dataType: 'record<string, string>', label: "Pending Transaction Type Display Names" },
                { key: "AccountHistory.ShouldShowAvailableBalanceInBoldFont", value: this._shouldShowAvailableBalanceInBoldFont, dataType: 'boolean', label: "Should Show Available Balance In Bold Font" },
                { key: "AccountHistory.ShouldShowPointOfSaleOrAtmTransactionMessage", value: this._shouldShowPointOfSaleOrAtmTransactionMessage, dataType: 'boolean', label: "Should Show Point Of Sale Or Atm Transaction Message" },
                { key: "AccountHistory.PointOfSaleOrAtmTransactionAccountCategories", value: this._pointOfSaleOrAtmTransactionAccountCategories, dataType: 'list<string>', label: "Point Of Sale Or Atm Transaction Account Categories" },
                { key: "AccountHistory.ShowPendingTransactionsTag", value: this._showPendingTransactionsTag, dataType: 'boolean', label: "Show Pending Transactions Tag" },
                { key: "AccountHistory.SymitarHoldTypes", value: this._symitarHoldTypes, dataType: 'list<string>', label: "Symitar Hold Types" },
                { key: "AccountHistory.SymitarCheckHoldTypesEnabled", value: this._symitarCheckHoldTypesEnabled, dataType: 'boolean', label: "Symitar Check Hold Types Enabled" },
                { key: "AccountHistory.ObscureSuffixInUrl", value: this._obscureSuffixInUrl, dataType: 'boolean', label: "Obscure Suffix In Url" },
                { key: "AccountHistory.UseEffectiveDateInsteadOfPostDate", value: this._useEffectiveDateInsteadOfPostDate, dataType: 'boolean', label: "Use Effective Date Instead Of Post Date" },
                { key: "AccountHistory.ShouldShowPayoffMessageForLoanEvenWhenNoDueDate", value: this._shouldShowPayoffMessageForLoanEvenWhenNoDueDate, dataType: 'boolean', label: "Should Show Payoff Message For Loan Even When No Due Date" },
                { key: "AccountHistory.AccountNumberHistoryEnabled", value: this._accountNumberHistoryEnabled, dataType: 'boolean', label: "Account Number History Enabled" },
                { key: "AccountHistory.ShouldShowPreviousAvailableBalance", value: this._shouldShowPreviousAvailableBalance, dataType: 'boolean', label: "Should Show Previous Available Balance" },
                { key: "AccountHistory.SuppressPreviousAvailableBalanceForPendingTransactions", value: this._suppressPreviousAvailableBalanceForPendingTransactions, dataType: 'boolean', label: "Suppress Previous Available Balance For Pending Transactions" },
                { key: "AccountHistory.ShowPreviousAvailableMessagePopover", value: this._showPreviousAvailableMessagePopover, dataType: 'boolean', label: "Show Previous Available Message Popover" },
                { key: "AccountHistory.ShowPreviousAvailableBalanceAccountCategories", value: this._showPreviousAvailableBalanceAccountCategories, dataType: 'list<string>', label: "Show Previous Available Balance Account Categories" },
                { key: "AccountHistory.ShouldExcludePendingTransactionOnExport", value: this._shouldExcludePendingTransactionOnExport, dataType: 'boolean', label: "Should Exclude Pending Transaction On Export" },
            ];
        }

}