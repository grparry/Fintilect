// Generated imports
import { DisplayCheckHolds } from '../DisplayCheckHolds';
import { LinkedAccountHistory } from '../LinkedAccountHistory';
import { PendingTransactionTypeDisplayNames } from '../PendingTransactionTypeDisplayNames';
import { PointOfSaleOrAtmTransactionAccountCategories } from '../PointOfSaleOrAtmTransactionAccountCategories';
import { SymitarHoldTypes } from '../SymitarHoldTypes';
import { ShowPreviousAvailableBalanceAccountCategories } from '../ShowPreviousAvailableBalanceAccountCategories';

export interface AccountHistory {
    displayCheckHolds: DisplayCheckHolds;
    linkedAccountHistory: LinkedAccountHistory;
    /** @settingKey AccountHistoryDisplaySettings.IsOrderedBySequenceNumber */
    isOrderedBySequenceNumber: boolean;
    /** @settingKey AccountHistoryDisplaySettings.MortgagePaymentHistoryIncludesEscrowInfoEnabled */
    mortgagePaymentHistoryIncludesEscrowInfoEnabled: boolean;
    /** @settingKey EscrowHistory.ShouldAddDaysToEndDate */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If True, we will add 4 days to the end date of the escrow history date range selector.
     * /// /// Default value is 'true'
     * /// /// </summary>
     * /// </summary>
     */
    shouldAddDaysToEndDate: boolean;
    /** @settingKey AccountHistoryDisplaySettings.DisplayMortgagePaymentEscrowDetails */
    displayMortgagePaymentEscrowDetails: boolean;
    /** @settingKey AccountHistory.DisplaySettings.ShowPendingPaymentPostDate */
    showPendingPaymentPostDate: boolean;
    /** @settingKey AccountHistoryDisplaySettings.ShowExtraInfoInRowInsteadOfPopover */
    shouldShowExtraInfoInRowInsteadOfPopover: boolean;
    /** @settingKey AccountHistoryDisplaySettings.ShowAvailableBalanceMessagePopover */
    shouldShowAvailableBalanceMessagePopover: boolean;
    /** @settingKey AccountHistoryDisplaySettings.ShowAvailableBalanceMessagePopoverOnlyForShares */
    shouldShowAvailableBalanceMessagePopoverOnlyForShares: boolean;
    /** @settingKey AccountHistory.ShouldOpenMoreDetailsInExternalWebBrowser */
    shouldOpenMoreDetailsInExternalWebBrowser: boolean;
    /** @settingKey AccountHistory.PendingTransactionTypeDisplayNames */
    dictionary: PendingTransactionTypeDisplayNames;
    /** @settingKey AccountHistoryDisplaySettings.ShowAvailableBalanceInBoldFont */
    shouldShowAvailableBalanceInBoldFont: boolean;
    /** @settingKey AccountHistoryDisplaySettings.ShowPointOfSaleOrAtmTransactionMessage */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// if true, enable the showing of the point of sale/atm transaction message on the history page in online banking
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowPointOfSaleOrAtmTransactionMessage: boolean;
    /** @settingKey AccountHistoryDisplaySettings.PointOfSaleOrAtmTransactionAccountCategories */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// point of sale/atm transaction message account categories. comma delimited list. default: CACK,CPLC,CHSA,CCKG,BBEC,BBBC,BBAC,BNPC
     * /// /// </summary>
     * /// </summary>
     */
    list: PointOfSaleOrAtmTransactionAccountCategories;
    /** @settingKey AccountHistoryDisplaySettings.ShowPendingTransactionsTag */
    showPendingTransactionsTag: boolean;
    /** @settingKey AccountHistoryDisplaySettings.Symitar.HoldTypes */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// List of enum hold types that will be displayed when a transaction is pending or on hold
     * /// /// </summary>
     * /// </summary>
     */
    list: SymitarHoldTypes;
    /** @settingKey AccountHistoryDisplaySettings.Symitar.CheckHoldTypesEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Bool value to check whether or not to use the hold types settings when displaying holds
     * /// /// </summary>
     * /// </summary>
     */
    symitarCheckHoldTypesEnabled: boolean;
    /** @settingKey AccountHistory.ObscureSuffixInUrl */
    obscureSuffixInUrl: boolean;
    /** @settingKey AccountHistory.UseEffectiveDateInsteadOfPostDate */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// if true, use effective date NOT post date
     * /// /// </summary>
     * /// </summary>
     */
    useEffectiveDateInsteadOfPostDate: boolean;
    /** @settingKey AccountHistory.ShowPayoffMessageForLoanEvenWhenNoDueDate */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// if true, show payoff message for Loans/HELOCs even if there is not a payment due
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowPayoffMessageForLoanEvenWhenNoDueDate: boolean;
    /** @settingKey AccountNumberHistory.Enabled */
    accountNumberHistoryEnabled: boolean;
    /** @settingKey AccountHistory.ShouldShowPreviousAvailableBalance */
    /**
     * /// <summary> A bool that determines if we should display the PreviousAvailableBalance in each history item.  The data only exists for Symitar, anybody else will just show 0's </summary>
     */
    shouldShowPreviousAvailableBalance: boolean;
    /** @settingKey AccountHistory.SuppressPreviousAvailableBalanceForPendingTransactions */
    /**
     * /// <summary> A bool that determines if we should suppress the display of the PreviousAvailableBalance in each history item that is PENDING.  The data only exists for Symitar, anybody else will just show 0's. Default: FALSE </summary>
     */
    suppressPreviousAvailableBalanceForPendingTransactions: boolean;
    /** @settingKey AccountHistory.ShowPreviousAvailableMessagePopover */
    /**
     * /// <summary> A bool that determines if we should display the PreviousAvailableBalance Popover tip in each history item.  The data only exists for Symitar</summary>
     */
    showPreviousAvailableMessagePopover: boolean;
    /** @settingKey AccountHistory.ShowPreviousAvailableBalanceAccountCategories */
    list: ShowPreviousAvailableBalanceAccountCategories;
    /** @settingKey AccountHistory.ShouldExcludePendingTransactionOnExport */
    shouldExcludePendingTransactionOnExport: boolean;
}
