// Generated imports

export interface AccountMaskingSettings {
    /** @settingKey Account.Masking.LengthToShow */
    maskingLengthToShow: number;
    /** @settingKey Account.Masking.HideWelcomeBarDetail */
    /**
     * //TODO:  This property to should be converted to a list of String, instead of relying on consumers of this setting to parse the comma delimited string.
     */
    hideWelcomeBarDetail: string;
    /** @settingKey Account.Masking.AccountHistoryMaskingEnabled */
    accountHistoryMaskingEnabled: boolean;
    /** @settingKey Account.Masking.AccountHistoryMaskingRegexMatchingPatterns */
    accountHistoryMaskingRegexMatchingPatterns: string;
    /** @settingKey Account.Masking.CheckCopyMaskingEnabled */
    checkCopyMaskingEnabled: boolean;
    /** @settingKey Account.Masking.ShowUnmaskedMemberNumberOnUserClick */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then show the unmasked Member Number when the user clicks on their Member Number in the PageMemberInfo.ascx member info control.
     * /// /// </summary>
     * /// </summary>
     */
    showUnmaskedMemberNumberOnUserClick: boolean;
}
