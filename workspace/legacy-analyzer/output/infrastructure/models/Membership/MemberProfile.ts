// Generated imports

export interface MemberProfile {
    /** @settingKey MemberProfile.Enabled */
    enabled: boolean;
    /** @settingKey MemberProfile.UsPhoneRegex */
    /**
     * /// <summary>
     * /// // regex for us phone number -
     * /// // eg: ^\d{3}\-\d{3}\-\d{4}$
     * /// </summary>
     */
    usPhoneRegex: string;
    /** @settingKey MemberProfile.GetBeneficiaryFields */
    /**
     * // Get BEN1 and BEN2 UserFields boolean
     */
    shouldGetBeneficiaryFields: boolean;
    /** @settingKey X.App.HomeBanking.HideAddressLineThreeOnChangeAddressControl */
    /**
     * // If true, do not show 'address 3' entry in the memberprofile.vbhtml view in HomeBanking
     */
    shouldHideAddressLineThree: boolean;
}
