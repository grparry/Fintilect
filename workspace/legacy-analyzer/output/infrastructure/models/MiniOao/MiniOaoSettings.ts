// Generated imports

export interface MiniOaoSettings {
    /** @settingKey MiniOao.ConnectAccountOpening.Enabled */
    enabled: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.MinimumVersion */
    minVersion: number;
    /** @settingKey MiniOao.ConnectAccountOpening.ShouldShowJointOwners */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, then show the 'add joint owners' view in the new account opening wizard
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowJointOwners: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.AddNewJointOwner.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, allow the creation of a new Joint Owner
     * /// /// </summary>
     * /// </summary>
     */
    addNewJointOwnerEnabled: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.ShouldSelectAllJointAccountsByDefaultOnNewAccountCreation */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, pre-check all Joint Owners during the new account creation process for a new account that is being created
     * /// /// </summary>
     * /// </summary>
     */
    shouldSelectAllJointAccountsByDefaultOnNewAccountCreation: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.AllowCreateNewJointOwnerDuringAccountCreation */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, allow the ability to create a new Joint-Owner during the account creation process
     * /// /// </summary>
     * /// </summary>
     */
    allowCreateNewJointOwnerDuringAccountCreation: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.AllowNewAccountFunding */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, allow the ability to fund a new account during the account creation process
     * /// /// </summary>
     * /// </summary>
     */
    allowNewAccountFunding: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.ShouldWarnUserIfNoDebitCardSelected */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, warn the user that they have not selected any debit cards for any of the Joint-Owners during the new
     * /// ///     account creation process
     * /// /// </summary>
     * /// </summary>
     */
    shouldWarnUserIfNoDebitCardSelected: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.PromoCodesEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, enable the use of Promo Codes during the new account creation process
     * /// /// </summary>
     * /// </summary>
     */
    promoCodesEnabled: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.ForceNewAccountOpeningDisclosure */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, then the user must accept a disclosure when creating a new Account during the new account creation process
     * /// /// </summary>
     * /// </summary>
     */
    forceNewAccountOpeningDisclosure: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.ForceAddNewJointOwnerDisclosure */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, then the user must accept a disclosure when creating a new Joint Owner during the new account creation
     * /// ///     process
     * /// /// </summary>
     * /// </summary>
     */
    forceAddNewJointOwnerDisclosure: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.AdapiUrl */
    adapiUrl: string;
    /** @settingKey MiniOao.ConnectAccountOpening.ShouldUseMockData */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, will use Mock Data instead of reaching out to OAO.
     * /// /// </summary>
     * /// /// <remarks>
     * /// ///     Since we do not have OAO hosted on dev machines, this lets us flip a switch to go between testing against OAO
     * /// ///     and testing against Mock data without needing to recompile
     * /// /// </remarks>
     * /// </summary>
     */
    shouldUseMockData: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.CanFundFromCrossAccounts */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, will return Cross accounts when retrieving FundingAccounts
     * /// /// </summary>
     * /// </summary>
     */
    canFundFromCrossAccount: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.DebitCardProductId */
    debitCardProductId: number;
    /** @settingKey MiniOao.ConnectAccountOpening.RequireIdInfoOnAddJointOwner */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, require id info (dl/id card, issue date & expire date) to be filled out on the 'add joint owner' form in accountOpening/AccountOpening mvc view in HomeBanking
     * /// /// </summary>
     * /// </summary>
     */
    requireIdInfoOnAddJointOwner: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.RequireEmployerInfoOnAddJointOwner */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, require employer info to be filled out on the 'add joint owner' form in accountOpening/AccountOpening mvc view in HomeBanking
     * /// /// </summary>
     * /// </summary>
     */
    requireEmployerInfoOnAddJointOwner: boolean;
    /** @settingKey MiniOao.ConnectAccountOpening.SecureMessageCategory */
    secureMessageCategory: string;
}
