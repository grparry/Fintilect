// Generated imports
import { system } from '../system';

export interface DigitalWallet {
    /** @settingKey Mobile.DigitalWallet.Enabled */
    /**
     * // enabled setting
     */
    enabled: boolean;
    /** @settingKey Mobile.DigitalWallet.EndpointAddress */
    /**
     * // Endpoint Address of web service
     */
    endpointAddress: string;
    /** @settingKey Mobile.DigitalWallet.userId */
    /**
     * // userId for this client
     */
    userId: string;
    /** @settingKey Mobile.DigitalWallet.password */
    /**
     * // password for this client
     */
    password: string;
    /** @settingKey Mobile.DigitalWallet.SchemaVersion */
    /**
     * // Validated field. This references the web service schema version being used, as provided by Card Services.
     */
    schemaVersion: string;
    /** @settingKey Mobile.DigitalWallet.clientId */
    /**
     * // Card Services assigned financial institution identifier(FIID) associated with the client.   Example: 00000001
     */
    clientId: string;
    /** @settingKey Mobile.DigitalWallet.system */
    /**
     * // Must contain a valid value assigned to the client's designated Card Service platform. Values:  EPOC  |  EPOC_CM   |  CREDIT
     */
    list: system;
    /** @settingKey Mobile.DigitalWallet.clientApplicationName */
    /**
     * // Name of the application calling this web service. Must be suitably descriptive.
     */
    clientApplicationName: string;
    /** @settingKey Mobile.DigitalWallet.clientVersion */
    /**
     * // Version of the application calling this web service
     */
    clientVersion: string;
    /** @settingKey Mobile.DigitalWallet.clientVendorName */
    /**
     * // Client vendor identifier. Entity that initiates the web service.
     */
    clientVendorName: string;
    /** @settingKey Mobile.DigitalWallet.EncryptionSecurityKey */
    /**
     * // security key for encrypting/decrypting the password for this client
     */
    encryptionSecurityKey: string;
    /** @settingKey Mobile.DigitalWallet.CertificateName */
    /**
     * // Certificate Name
     */
    certificateName: string;
    /** @settingKey Mobile.DigitalWallet.CertificatePassword */
    /**
     * // Certificate Password
     */
    certificatePassword: string;
    /** @settingKey Mobile.DigitalWallet.AndroidStoreUrl */
    androidStoreUrl: string;
    /** @settingKey Mobile.DigitalWallet.IosStoreUrl */
    iosStoreUrl: string;
    /** @settingKey Mobile.DigitalWallet.PackageName */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Package Name used by Android
     * /// /// </summary>
     * /// </summary>
     */
    packageName: string;
    /** @settingKey Mobile.DigitalWallet.UrlScheme */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Url Scheme used by iOS
     * /// /// </summary>
     * /// </summary>
     */
    urlScheme: string;
    /** @settingKey Mobile.DigitalWallet.PopupEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If popup is enabled
     * /// /// </summary>
     * /// </summary>
     */
    popupEnabled: boolean;
    /** @settingKey Mobile.DigitalWallet.TimeBeforeRepeatPopup */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Time in Days before repeat popup is displayed
     * /// /// </summary>
     * /// </summary>
     */
    timeBeforeRepeatPopup: number;
    /** @settingKey Mobile.DigitalWallet.ShowEnrollmentPromptFlagNumber */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Flag number used to determine if a popup should be displayed to enroll user
     * /// /// </summary>
     * /// </summary>
     */
    showEnrollmentPromptFlagNumber: number;
    /** @settingKey Mobile.DigitalWallet.DebitCardControlFlagNumber */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Flag number used to determine if a debit card exists on the account
     * /// /// </summary>
     * /// </summary>
     */
    debitCardControlFlagNumber: number;
    /** @settingKey Mobile.DigitalWallet.CreditCardControlFlagNumber */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Flag number used to determine if a credit card exists on the account
     * /// /// </summary>
     * /// </summary>
     */
    creditCardControlFlagNumber: number;
}
