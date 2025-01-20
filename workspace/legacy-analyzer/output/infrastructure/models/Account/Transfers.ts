// Generated imports
import { AchTransfer } from './AchTransfer';
import { WireTransfer } from '../WireTransfer';
import { TransferLimits } from './TransferLimits';
import { MortgageLoanCategories } from '../MortgageLoanCategories';
import { MortgageTransfersCategoriesForAdjustedToBalance } from '../MortgageTransfersCategoriesForAdjustedToBalance';
import { TransLoanCollateralForBal } from '../TransLoanCollateralForBal';
import { TransExternalLoan } from '../TransExternalLoan';
import { MortgageCategories } from '../MortgageCategories';
import { AllowedTransferToAccountCategories } from '../AllowedTransferToAccountCategories';
import { AllowedTransferFromAccountCategories } from '../AllowedTransferFromAccountCategories';
import { AnyMemberTransfers } from './AnyMemberTransfers';
import { TransferTimeouts } from './TransferTimeouts';

export interface Transfers {
    achTransfer: AchTransfer;
    wireTransfer: WireTransfer;
    transferLimits: TransferLimits;
    /** @settingKey Transfers.CustomTransferLimitMessagesEnabled */
    customTransferLimitMessagesEnabled: boolean;
    /** @settingKey Transfers.DisplayTransferLimitOnError */
    displayTransferLimitOnError: boolean;
    /** @settingKey Transfers.ShowShareLoanIds */
    showShareLoanIds: boolean;
    /** @settingKey Transfers.LimtInExcessTransferToCards */
    limtInExcessTransferToCards: boolean;
    /** @settingKey Transfers.ScheduledTransferIsOpenEndDateDisabledForDaily */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Gets or sets a value indicating whether scheduled transfer open end date is disabled for daily transfers.  If this value if false (the default)
     * /// /// The no end date option will be available to users.
     * /// /// </summary>
     * /// </summary>
     */
    scheduledTransferIsOpenEndDateDisabledForDaily: boolean;
    /** @settingKey Transfers.AllowLoanToLoanTransfers */
    allowLoanToLoanTransfers: boolean;
    /** @settingKey Transfers.MortgageLoanCategories */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Loans that have a category that matches one of the categories in this list will be treated as mortgage loans by the transfers widget and transfers2.
     * /// /// </summary>
     * /// /// <remarks>
     * /// /// This is used to determine whether or not to display a message about transferring to a mortgage on the transfer page.
     * /// /// </remarks>
     * /// </summary>
     */
    list: MortgageLoanCategories;
    /** @settingKey Admin.ScheduledTransfers.HideEndDateOption */
    hideEndDateOption: boolean;
    /** @settingKey Transfers.AllowPaymentsGreaterThanPayoffAmount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Allows users to make scheduled payments greater than their payoff amount
     * /// ///True - Can overpay
     * /// ///False - Cannot Overpay, if Payment Amount is greater than Payoff Amount, Payment Amount will be set to the Payoff Amount or 0 if Payoff Amount is 0
     * /// /// </summary>
     * /// </summary>
     */
    allowPaymentsGreaterThanPayoffAmount: boolean;
    /** @settingKey Transfers.HidePreviousBalanceAndPreviousAvailable */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, hide the previous balance and the previous available on the transfer result screen in the CompletedTransferDetails template
     * /// /// </summary>
     * /// </summary>
     */
    shouldHidePreviousBalanceAndPreviousAvailable: boolean;
    /** @settingKey Transfers.GroupAdditionalTransferOptions */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, set transfer 'sub items' (is scheduled transfer checkbox, apply extra to principal checkbox, etc) into a separate area that can be expanded and contracted
     * /// /// </summary>
     * /// </summary>
     */
    groupAdditionalTransferOptions: boolean;
    /** @settingKey Transfers.AllowBalanceTransferBetweenCreditCards */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, allow members to transfer the balance of their credit card to another card, thus "paying it off". Default: FALSE
     * /// /// </summary>
     * /// </summary>
     */
    allowBalanceTransferBetweenCreditCards: boolean;
    /** @settingKey Transfers.CreditCardBalanceTransfersSendAsSecureMessage */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, send the credit card balance transfer as a secure message to the credit union, instead of an email to the credit union. Default: FALSE
     * /// /// </summary>
     * /// </summary>
     */
    creditCardBalanceTransfersSendAsSecureMessage: boolean;
    /** @settingKey Transfers.CreditCardBalanceTransfersRecipientEmailAddress */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// the recipient email address for the credit union
     * /// /// </summary>
     * /// </summary>
     */
    creditCardBalanceTransfersRecipientEmailAddress: string;
    /** @settingKey Transfers.AllowEBalconTransfersBetweenCreditCards */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, allow members to transfer the balance of their credit card to another cards using PSCU E-Balcon. Default: FALSE
     * /// /// </summary>
     * /// </summary>
     */
    allowEBalconTransfersBetweenCreditCards: boolean;
    /** @settingKey Transfers.AllowAdjustedToBalanceForMortgageTransfersEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, allow adjusted 'ToBalance' on Mortgages to be re-calculated by subtracting the interest due amount on the payment. Default: FALSE
     * /// /// </summary>
     * /// </summary>
     */
    allowAdjustedToBalanceOnMortgageTransfersEnabled: boolean;
    /** @settingKey Transfers.AdjustedToBalanceForMortgageTransfersCategories */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Categories of Mortgages to be considered when calculating the 'ToBalance' when considering interest due.
     * /// /// </summary>
     * /// </summary>
     */
    list: MortgageTransfersCategoriesForAdjustedToBalance;
    /** @settingKey Transfers.SuffixLabelEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then when transfers are viewed, the suffix will be shown for each account
     * /// /// </summary>
     * /// </summary>
     */
    suffixLabelEnabled: boolean;
    /** @settingKey Transfers.PostTransferNavigationOptionsEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then the member will be presented with buttons/options to navigate to after a transfer.
     * /// /// </summary>
     * /// </summary>
     */
    postTransferNavigationOptionsEnabled: boolean;
    /** @settingKey X.App.HomeBanking.TransLoanCollateralForBal */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Categories of Mortgages to be considered when calculating the 'ToBalance' when considering interest due.
     * /// /// </summary>
     * /// </summary>
     */
    list: TransLoanCollateralForBal;
    /** @settingKey X.App.HomeBanking.TransExternalLoan */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Categories of Mortgages to be considered when calculating the 'ToBalance' when considering interest due.
     * /// /// </summary>
     * /// </summary>
     */
    list: TransExternalLoan;
    /** @settingKey X.App.HomeBanking.obsMortgages */
    list: MortgageCategories;
    /** @settingKey Transfers.ShowTodaysDateOnTransferReceipt */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then show today's date on the transfer reciept in OLB.
     * /// /// </summary>
     * /// </summary>
     */
    showTodaysDateOnTransferReceipt: boolean;
    /** @settingKey Transfers.ShowTransferDescriptionOnTransferReceipt */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then show the Transfer Description on the transfer receipt in OLB.
     * /// /// </summary>
     * /// </summary>
     */
    showTransferDescriptionOnTransferReceipt: boolean;
    /** @settingKey Admin.ScheduledTransfers.GetHouseholdingAccounts.Enabled */
    getHouseholdingAccountsEnabled: boolean;
    /** @settingKey X.App.HomeBanking.AllowCreditCardTransfer */
    allowCreditCardTransfer: boolean;
    /** @settingKey X.App.Homebanking.obsTransferToAccounts */
    list: AllowedTransferToAccountCategories;
    /** @settingKey X.App.HomeBanking.obsTransferFromAccounts */
    list: AllowedTransferFromAccountCategories;
    /** @settingKey Admin.ScheduledTransfers.NonOlbMember.Enabled */
    nonOlbMemberEnabled: boolean;
    /** @settingKey Transfers.QuickAction.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then the QuickAction button will allow member to transfer
     * /// /// </summary>
     * /// </summary>
     */
    quickActionEnabled: boolean;
    /** @settingKey Transfers.QuickAction.ToAndFromEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then the QuickAction button will have separate To/From transfer options
     * /// /// </summary>
     * /// </summary>
     */
    quickActionToAndFromEnabled: boolean;
    anyMemberTransfers: AnyMemberTransfers;
    transferTimeouts: TransferTimeouts;
}
