// Generated imports

export interface SmsSecurityCodeSettings {
    /** @settingKey Mfa.SmsSecurityCode.Enabled */
    enabled: boolean;
    /** @settingKey Mfa.SmsSecurityCode.MinVersion */
    minVersion: number;
    /** @settingKey Mfa.SmsSecurityCode.Length */
    securityCodeLength: number;
    /** @settingKey Mfa.SmsSecurityCode.MinutesUntilCodeExpires */
    minutesUntilCodeExpires: number;
    /** @settingKey Mfa.SmsSecurityCode.ValidSecurityCodeCharacters */
    validSecurityCodeCharacters: string;
    /** @settingKey Mfa.SmsSecurityCode.SkipEmail */
    skipEmail: boolean;
    /** @settingKey Mfa.SmsSecurityCode.VoiceDeliveryEnabled */
    voiceDeliveryEnabled: boolean;
    /** @settingKey Mfa.SmsSecurityCode.VoiceMessageApiBaseUrl */
    voiceMessageApiBaseUrl: string;
    /** @settingKey Mfa.SmsSecurityCode.VoiceServiceConfiguration */
    voiceServiceConfiguration: string;
    /** @settingKey SmsProvider */
    smsProvider: string;
    /** @settingKey Mfa.SmsSecurityCode.VoiceMessageSendUsernameEnabled */
    voiceMessageSendUsernameEnabled: boolean;
    /** @settingKey Mfa.SmsSecurityCode.VoiceMessageSendPasswordEnabled */
    voiceMessageSendPasswordEnabled: boolean;
    /** @settingKey Mfa.SmsSecurityCode.EncryptionKey */
    encryptionKey: string;
    /** @settingKey Mfa.SmsSecurityCode.MaxCodeResends */
    maxCodeResends: number;
    /** @settingKey Mfa.SmsSecurityCode.ResendCodeEnabled */
    resendCodeEnabled: boolean;
    /** @settingKey Mfa.SmsSecurityCode.VoiceMessageCodeDelimitingEnabled */
    voiceMessageCodeDelimitingEnabled: boolean;
    /** @settingKey Mfa.SmsSecurityCode.VoiceMessageCodeDelimiter */
    voiceMessageCodeDelimiter: string;
    /** @settingKey Mfa.SmsSecurityCode.UseForEnrollmentEnabled */
    useForEnrollmentEnabled: boolean;
}
