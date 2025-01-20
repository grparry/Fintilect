// Generated imports

export interface PersonPaymentSecuritySettings {
    /** @settingKey PersonPayment.Security.Enabled */
    enabled: boolean;
    /** @settingKey PersonPayment.Security.MinVersion */
    minVersion: number;
    /** @settingKey PersonPayment.Security.DaysAfterSensitiveInfoChangeAccessRestriction */
    daysAfterSensitiveInfoChangeAccessRestriction: number;
    /** @settingKey PersonPayment.Security.SpectrumMemoNumber */
    spectrumMemoNumber: string;
    /** @settingKey PersonPayment.Security.RestrictAccessFlagNumber */
    restrictAccessFlagNumber: string;
    /** @settingKey PersonPayment.Security.SymitarRestrictAccessFlagNumber */
    symitarRestrictAccessFlagNumber: number;
    /** @settingKey PersonPayment.Security.DnaRestrictAccessFlagNumber */
    dnaRestrictAccessFlagNumber: string;
    /** @settingKey PersonPayment.Security.CoreRestrictAccessFlagNumber */
    coreRestrictAccessFlagNumber: string;
    /** @settingKey PersonPayment.Security.ShouldRestrictAccessAfterAddressChange */
    shouldRestrictAccessAfterAddressChange: boolean;
    /** @settingKey PersonPayment.Security.ShouldRestrictAccessAfterEmailChange */
    shouldRestrictAccessAfterEmailChange: boolean;
    /** @settingKey PersonPayment.Security.ShouldRestrictAccessAfterForgotPassword */
    shouldRestrictAccessAfterForgotPassword: boolean;
    /** @settingKey PersonPayment.Security.ShouldRestrictAccessAfterMobileDeviceRegistration */
    shouldRestrictAccessAfterMobileDeviceRegistration: boolean;
}
