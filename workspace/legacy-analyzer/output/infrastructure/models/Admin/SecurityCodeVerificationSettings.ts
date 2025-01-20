// Generated imports

export interface SecurityCodeVerificationSettings {
    /** @settingKey Admin.SmsSecurityCodeVerification.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If set to True, enables sms security code verification
     * /// /// </summary>
     * /// </summary>
     */
    enabled: boolean;
    /** @settingKey Admin.SmsSecurityCodeVerification.VoiceMessageEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If set to True, enables voice message security code delivery
     * /// /// </summary>
     * /// </summary>
     */
    voiceMessageEnabled: boolean;
    /** @settingKey Admin.SmsSecurityCodeVerification.NonOlbMemberEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If set to True, enables security code control on non-old members
     * /// /// </summary>
     * /// </summary>
     */
    nonOlbMemberEnabled: boolean;
}
