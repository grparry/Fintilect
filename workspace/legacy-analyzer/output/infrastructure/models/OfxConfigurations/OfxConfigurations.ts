// Generated imports
import { AllowedShareRestrictedFlags } from '../AllowedShareRestrictedFlags';
import { AllowedLoanRestrictedFlags } from '../AllowedLoanRestrictedFlags';
import { AppIdsWithRestrictedFlagsExceptions } from '../AppIdsWithRestrictedFlagsExceptions';

export interface OfxConfigurations {
    /** @settingKey OFXConfigurations.OfxDirectIsAscending */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This setting is poorly named.  It applies to OFX WebConnect as well.  DirectConnect and WebConnect should alwayse behave in the same way.  Unfortunately,
     * /// /// we have two separate code bases for this at this time.  We really should combine them so that we don't have to mantain two versions of nearly identical code.
     * /// /// </summary>
     * /// </summary>
     */
    ofxDirectIsAscending: boolean;
    /** @settingKey OfxConfigurations.TransactionMessageEZIV */
    transactionMessageEZIV: string;
    /** @settingKey OfxConfigurations.TransactionPostingCreditMessage */
    transactionPostingCreditMessage: string;
    /** @settingKey OfxConfigurations.TransactionPostingDebitMessage */
    transactionPostingDebitMessage: string;
    /** @settingKey OfxConfigurations.LogLoginIsEnabled */
    logLoginIsEnabled: boolean;
    /** @settingKey OfxConfigurations.OfxTranTypeShouldUseExtraFields */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// When this setting is on, OFX transaction categorization will use the TransactionType, Amount, TellerInitials, and Branch fields to determine the transaction category.
     * /// /// When this setting is off, OFX transaction categorization will use the TransactionType and Amount to determine the transaction category.
     * /// /// </summary>
     * /// </summary>
     */
    ofxTranTypeShouldUseExtraFields: boolean;
    /** @settingKey OfxConfigurations.HideZeroValueTransactions */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// True - When building the OFX output, all transactions where Amount == 0 will be completely omitted
     * /// /// False - No change
     * /// /// </summary>
     * /// </summary>
     */
    hideZeroValueTransactions: boolean;
    /** @settingKey OfxConfigurations.GenerateNamesIfNeeded */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// True - When building the OFX output, all transactions where Name is null or whitespace will have the Name set to string resources
     * /// ///     If Amount >= 0 : Name = Ofx.PositiveTransactionName
     * /// ///     If Amount LessThan 0 : Name = Ofx.NegativeTransactionName
     * /// /// False - No change
     * /// /// </summary>
     * /// </summary>
     */
    generateNamesIfNeeded: boolean;
    /** @settingKey OfxConfigurations.PositiveTransactionName */
    positiveTransactionName: string;
    /** @settingKey OfxConfigurations.NegativeTransactionName */
    negativeTransactionName: string;
    /** @settingKey OfxConfigurations.ShouldIncludeCrossAccounts */
    shouldIncludeCrossAccounts: boolean;
    /** @settingKey OfxConfigurations.ShouldDeleteClosingTags */
    shouldDeleteClosingTags: boolean;
    /** @settingKey OfxConfigurations.AllowedShareRestrictedFlags */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// List of Restricted share flags that we still want OFX to return when retrieving the account list.
     * /// /// </summary>
     * /// /// <remarks>
     * /// /// Money Desktop expects us to return closed accounts.
     * /// /// They mark an account as closed on their end if the account has a balance of $0 or if a closed account flag is set.
     * /// /// </remarks>
     * /// </summary>
     */
    list: AllowedShareRestrictedFlags;
    /** @settingKey OfxConfigurations.AllowedLoanRestrictedFlags */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// List of Restricted share flags that we still want OFX to return when retrieving the account list.
     * /// /// </summary>
     * /// /// <remarks>
     * /// /// Money Desktop expects us to return closed accounts.
     * /// /// They mark an account as closed on their end if the account has a balance of $0 or if a closed account flag is set.
     * /// /// </remarks>
     * /// </summary>
     */
    list: AllowedLoanRestrictedFlags;
    /** @settingKey OfxConfigurations.AppIdsWithRestrictedFlagsExceptions */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// List of AppId's that we want to allow certain restricted flag accounts to be returned
     * /// /// </summary>
     * /// </summary>
     */
    list: AppIdsWithRestrictedFlagsExceptions;
    /** @settingKey OfxConfigurations.UseSymmetryMethodOfCreatingFitid */
    useSymmetryMethodOfCreatingFitid: boolean;
}
