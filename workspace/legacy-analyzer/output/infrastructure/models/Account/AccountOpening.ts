// Generated imports

export interface AccountOpening {
    /** @settingKey Accounts.AccountOpening.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If enabled, then credit union can access Views/AccountOpening.cshtml and the features that accompany it.
     * /// /// </summary>
     * /// </summary>
     */
    enabled: boolean;
    /** @settingKey Accounts.AccountOpening.MinVersion */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Minimum version for this feature to run
     * /// /// </summary>
     * /// </summary>
     */
    minVersion: number;
    /** @settingKey Accounts.AccountOpening.OnlySendEmailOnNewAccountCreation */
    onlySendEmailOnNewAccountCreation: boolean;
    /** @settingKey Accounts.AccountOpening.HideContactInfoDuringSubAccountOpening */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, enable the hiding of the 'contact info' area on the new sub account opening page in HomeBanking
     * /// /// </summary>
     * /// </summary>
     */
    shouldHideContactInfoDuringSubAccountOpening: boolean;
}
