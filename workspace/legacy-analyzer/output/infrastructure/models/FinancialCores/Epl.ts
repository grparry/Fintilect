// Generated imports

export interface Epl {
    /** @settingKey FinancialCore.Epl.ShouldAddAccountInquiryRepliesForCrossAccounts */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true (true is the default), then the epl account inquiry mapper will add account inquiry notes for each cross account.  If it is turned off,
     * /// /// the cross accounts (shares and loans that the logged in member has access to, but that are not part of the logged in member's main account) will all be added to the
     * /// /// same account inquiry node in the Home Banking Xlate reply.
     * /// /// </summary>
     * /// </summary>
     */
    shouldAddAccountInquiryRepliesForCrossAccounts: boolean;
    /** @settingKey FinancialCore.Epl.CreditCardDepositPermitted */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is set to true, cross accounts are able to make deposits to a credit card
     * /// /// </summary>
     * /// </summary>
     */
    creditCardDepositPermitted: boolean;
    /** @settingKey FinancialCore.Epl.CreditCardInquiryPermitted */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is set to true, cross accounts are able to make Inquiries to a credit card
     * /// /// </summary>
     * /// </summary>
     */
    creditCardInquiryPermitted: boolean;
    /** @settingKey FinancialCore.Epl.CreditCardWithdrawalPermitted */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is set to true, cross accounts are able to make Withdrawals to a credit card
     * /// /// </summary>
     * /// </summary>
     */
    creditCardWithdrawalPermitted: boolean;
}
