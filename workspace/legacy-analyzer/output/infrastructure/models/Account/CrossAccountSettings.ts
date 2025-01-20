// Generated imports

export interface CrossAccountSettings {
    /** @settingKey Account.CrossAccount.ShouldUseCrossAccountOwnerNameAsCrossAccountDescription */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Whether or not the name of the owner of a cross account will be used as the description of the cross account.  If false, the masked cross account number will be displayed.
     * /// /// If true, the name of the owner will be mapped to online banking.
     * /// /// </summary>
     * /// </summary>
     */
    shouldUseCrossAccountOwnerNameAsCrossAccountDescription: boolean;
    /** @settingKey Account.CrossAccount.HouseHoldingCreditCardHistoryEnabled */
    houseHoldingCreditCardHistoryEnabled: boolean;
    /** @settingKey Account.CrossAccount.DisclosureAcceptanceEnabled */
    /**
     * /// <summary>
     * /// ///<summary>
     * /// /// Cross Accounts (HouseHolding) disclosure acceptance feature enabled
     * /// /// </summary>
     * /// </summary>
     */
    disclosureAcceptanceEnabled: boolean;
    /** @settingKey Account.CrossAccount.DisclosureAcceptanceFlag */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Cross Accounts (HouseHolding) disclosure acceptance flag name (on core)
     * /// /// </summary>
     * /// </summary>
     */
    disclosureAcceptanceFlag: string;
    /** @settingKey Account.CrossAccount.HideAbilityToRequestPermissionsForAnotherAccount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Cross Accounts (HouseHolding) hide request permissions button / page for another account   TRUE | FALSE
     * /// /// </summary>
     * /// </summary>
     */
    hideAbilityToRequestPermissionsForAnotherAccount: boolean;
    /** @settingKey Account.CrossAccount.ShouldShowSsoLinkForCrossAccountLoans */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Controls whether to show a link to SSO for cross account Loans
     * /// /// True: Show SSO Link for Cross Account Loans
     * /// /// False: Do Not Show SSO Link for Cross Account Loans
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowSsoLinkForCrossAccountLoans: boolean;
    /** @settingKey Account.CrossAccount.DisallowWithdrawalsFromCreditCards */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, disallow withdrawals from credit cards on the cross-account access screens
     * /// /// </summary>
     * /// </summary>
     */
    disallowWithdrawalsFromCreditCards: boolean;
    /** @settingKey Account.CrossAccount.DisableCreditCardMoreDetailButton */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, disable the 'more details' button next to credit cards in the card summary section of the Welcome/Summary page in Home Banking
     * /// /// </summary>
     * /// </summary>
     */
    disableCreditCardMoreDetailButton: boolean;
    /** @settingKey Account.CrossAccount.GetHouseholdingPermissionsFromCrossAccountNode */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, will use the CrossAccountNode that has already been mapped to set the HouseHoldingAccess
     * /// /// </summary>
     * /// </summary>
     */
    getHouseholdingPermissionsFromCrossAccountNode: boolean;
    /** @settingKey Account.CrossAccount.ReadCreditCardsFromCore */
    readCreditCardsFromCore: boolean;
    /** @settingKey X.App.HBBOL.IsCrossAccountInquiryByTin */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, will use the TIN when performing account inquiry
     * /// /// </summary>
     * /// </summary>
     */
    isCrossAccountInquiryByTin: boolean;
    /** @settingKey Householding.GrantInquiryPermissionDelayTime */
    grantInquiryPermissionDelayTime: number;
    /** @settingKey Householding.GrantDepositPermissionDelayTime */
    grantDepositPermissionDelayTime: number;
    /** @settingKey Householding.GrantWithdrawalPermissionDelayTime */
    grantWithdrawalPermissionDelayTime: number;
    /** @settingKey Householding.CheckHouseHoldingValuesFromDatabase */
    checkHouseHoldingValuesFromDatabase: boolean;
    /** @settingKey X.App.HBBOL.HouseholdingPermissionSource */
    householdingPermissionSource: string;
    /** @settingKey X.App.HBBOL.DeleteSubAccountNoHouseholding */
    deleteSubAccountNoHouseholding: boolean;
}
