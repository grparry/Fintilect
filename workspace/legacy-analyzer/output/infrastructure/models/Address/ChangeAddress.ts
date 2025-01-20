// Generated imports

export interface ChangeAddress {
    /** @settingKey ChangeAddress.SendEmailOnUpdate */
    sendEmailOnUpdate: boolean;
    /** @settingKey ChangeAddress.PrimaryMemberCanUpdateJointOwnersAddress */
    primaryMemberCanUpdateJointOwnersAddress: boolean;
    /** @settingKey ChangeAddress.ForeignAddressCountryCodeAndSubdivisionsEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// When this setting is enabled, user will be given a list of possible country codes and subdivision (state/province etc.) codes when changing their address if it is a foreign address.
     * /// /// </summary>
     * /// </summary>
     */
    foreignAddressCountryCodeAndSubdivisionsEnabled: boolean;
    /** @settingKey ChangeAddress.MaximumAddressLineLength */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Controls the length of the address line input fields on the change address page.
     * /// /// </summary>
     * /// </summary>
     */
    maximumAddressLineLength: number;
    /** @settingKey ChangeEmail.UpdateBitAddressForPrimaryStatementAccountNumbers */
    updateBitAddressForPrimaryStatementAccountNumbers: boolean;
    /** @settingKey ChangeAddress.CityRegex */
    cityRegex: string;
    /** @settingKey ChangeAddress.ShouldUpdateCoreWhenNoChanges */
    shouldUpdateAddressOnCoreWhenNoChanges: boolean;
    /** @settingKey ChangeAddress.ShouldRedirectAfterUpdate */
    shouldRedirectAfterUpdate: boolean;
    /** @settingKey ChangeAddress.VerifyAddressEnabled */
    verifyAddressEnabled: boolean;
}
