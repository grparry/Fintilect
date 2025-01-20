// Generated imports

export interface BokuSettings {
    /** @settingKey PhoneIdentification.Boku.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines if the Boku Feature is Enabled, works in conjunction with the MinVersion Config
     * /// /// </summary>
     * /// </summary>
     */
    enabled: boolean;
    /** @settingKey PhoneIdentification.Boku.MinVersion */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines what the minimum OLB version is required to use this feature.
     * /// /// </summary>
     * /// </summary>
     */
    minVersion: number;
    /** @settingKey PhoneIdentification.Boku.ApiUrl */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This is a url to the api that is provided by Boku at the time of Onboarding and is unique to each client
     * /// /// </summary>
     * /// </summary>
     */
    apiUrl: string;
    /** @settingKey PhoneIdentification.Boku.MerchantId */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// A unique string assigned by Danal to identify the merchant.
     * /// /// This ID will be provided by Danal during the onboarding process.
     * /// /// Max Length: 30
     * /// /// Example MerchantID=00DF00000015
     * /// /// </summary>
     * /// /// <remarks>This is a required field</remarks>
     * /// </summary>
     */
    merchantId: string;
    /** @settingKey PhoneIdentification.Boku.SubMerchantId */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This unique ID is assigned to a reseller’s end merchant. This ID will be provided by Boku during the onboarding process and must be sent in the payload if it exists.
     * /// /// Max length: 30
     * /// /// Example submerchantId: 00DF00000016
     * /// /// </summary>
     * /// /// <remarks>This is Not a required field</remarks>
     * /// </summary>
     */
    subMerchantId: string;
    /** @settingKey PhoneIdentification.Boku.ClientAccessKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Key that identifies that the request is originating from a valid merchant. Shared with merchant at onboarding.
     * /// /// Max Length: 256
     * /// /// </summary>
     * /// </summary>
     */
    clientAccessKey: string;
    /** @settingKey PhoneIdentification.Boku.ApiSecret */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Merchant’s Secret sent by merchant in the request header. Shared with merchant at onboarding.
     * /// /// </summary>
     * /// </summary>
     */
    apiSecret: string;
    /** @settingKey PhoneIdentification.Boku.EncryptionKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Key used by merchant to decrypt encrypted API responses. Shared with merchant at onboarding
     * /// /// </summary>
     * /// </summary>
     */
    encryptionKey: string;
    /** @settingKey PhoneIdentification.Boku.PhoneNumber.EncryptionKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Key used to encrypte/decrypt the PhoneNumber in the BokuPhoneIdentificationDevice table
     * /// /// </summary>
     * /// </summary>
     */
    phoneNumberEncryptionKey: string;
    /** @settingKey PhoneIdentification.Boku.PhoneNumber.CipherKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Cipher used along with the EncryptionKey to encrypte/decrypt the PhoneNumber in the BokuPhoneIdentificationDevice table
     * /// /// </summary>
     * /// </summary>
     */
    phoneNumberCipherKey: string;
    /** @settingKey PhoneIdentification.Boku.EVURL.EncryptionKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Key used by merchant to encrypt the payload in the EVURL. Shared with merchant at onboarding.
     * /// /// Max Length: 256
     * /// /// </summary>
     * /// </summary>
     */
    evurlEncryptionKey: string;
    /** @settingKey PhoneIdentification.Boku.EVURL.BaseUrl */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Base URL is used for constructing EVURL at merchant side. It’s a unique URL generated for the merchant.
     * /// /// </summary>
     * /// </summary>
     */
    evurlBaseUrl: string;
    /** @settingKey PhoneVerification.Boku.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Indicated whether boku phone verification is enabled
     * /// /// </summary>
     * /// </summary>
     */
    phoneVerificationEnabled: boolean;
    /** @settingKey PhoneVerification.Boku.MinVersion */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Indicates the minimum release version for using boku phone verification
     * /// /// </summary>
     * /// </summary>
     */
    phoneVerificationMinVersion: number;
    /** @settingKey PhoneVerification.Boku.MinVersionAndroid */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Indicates the minimum release version for using boku phone verification on Android devices
     * /// /// </summary>
     * /// </summary>
     */
    phoneVerificationMinVersionAndroid: string;
    /** @settingKey PhoneVerification.Boku.MinVersionIos */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Indicates the minimum release version for using boku phone verification on IOS devices
     * /// /// </summary>
     * /// </summary>
     */
    phoneVerificationMinVersionIos: string;
    /** @settingKey PhoneVerification.Boku.DaysBeforeRetry */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The number of days that must be waited before trying to verify again
     * /// /// </summary>
     * /// </summary>
     */
    phoneVerificationDaysBeforeRetry: number;
    /** @settingKey PhoneVerification.Boku.DaysBeforeTokenExpires */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The number of days before tokens expire
     * /// /// </summary>
     * /// </summary>
     */
    phoneVerificationDaysBeforeTokenExpires: number;
}
