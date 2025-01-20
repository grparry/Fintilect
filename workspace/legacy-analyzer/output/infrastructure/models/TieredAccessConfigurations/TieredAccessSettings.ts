// Generated imports

export interface TieredAccessSettings {
    /** @settingKey TieredAccess.RestrictAccessbyAccountEnabled */
    restrictAccessbyAccountEnabled: boolean;
    /** @settingKey TieredAccess.QuickAccessEnabledForSubUsers */
    quickAccessForSubUsersEnabled: boolean;
    /** @settingKey TieredAccess.CrossAccountsAreIncludedInSubAccountPermissions */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Specifies whether cross accounts (accounts that are not under the umbrella of the current member account, whether they be specified on the financial core, or linked
     * /// /// through Online Banking's householding feature) will be included in the list of accounts that tiered access users can grant or deny access for sub users.
     * /// /// If this is not set in the database, it will return false by default.
     * /// /// </summary>
     * /// </summary>
     */
    crossAccountsAreIncludedInSubAccountPermissions: boolean;
    /** @settingKey TieredAccess.SubUsersCanUseCrossAccounts */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Specifies whether sub users can use the primary account's cross accounts.
     * /// /// This applies to inquiry, deposit, and withdrawal access.
     * /// /// </summary>
     * /// </summary>
     */
    subUsersCanUseCrossAccounts: boolean;
}
