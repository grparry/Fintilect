// Generated imports
import { FiservCertificateStore } from '../FiservCertificateStore';
import { FiservCardHistoryCycleTypes } from '../FiservCardHistoryCycleTypes';

export interface CardHistory {
    /** @settingKey History.Card.ShowPendingTransactionsFirst */
    showPendingTransactionsFirst: boolean;
    /** @settingKey History.Card.EnableCardHistoryDateRangeSearch */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     Enables/Disables the ability to use the date range
     * /// ///     field to search through credit card history
     * /// /// </summary>
     * /// </summary>
     */
    enableCardHistoryDateRangeSearch: boolean;
    /** @settingKey X.App.HomeBanking.PSCUSSOConfigID */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     Configuration ID in the SSOConfig table for PSCU SSO
     * /// /// </summary>
     * /// </summary>
     */
    pSCUSSOConfigID: string;
    /** @settingKey History.Card.UsePscuSsoUrl */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, get Pscu Sso URl instead of EZCardInfo
     * /// /// </summary>
     * /// </summary>
     */
    usePscuSsoUrl: boolean;
    /** @settingKey History.Card.ShouldSetPendingTransactionAmountAsNeutral */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     If true, card transactions that are Pending will be displayed as neutral (black and positive)
     * /// /// </summary>
     * /// </summary>
     */
    shouldSetPendingTransactionAmountAsNeutral: boolean;
    /** @settingKey History.Card.Fiserv.ApiBaseUrl */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     Base Url for use with the Fiserv API Card History
     * /// /// </summary>
     * /// </summary>
     */
    fiservApiBaseUrl: string;
    /** @settingKey History.Card.Fiserv.TokenCreateApiEndpoint */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     API Endpoint for use with Fiserv Card History API. Use this API endpoint to get a security token.
     * /// /// </summary>
     * /// </summary>
     */
    fiservTokenCreateApiEndpoint: string;
    /** @settingKey History.Card.Fiserv.UserId */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     UserId used with the Fiserv Card History API
     * /// /// </summary>
     * /// </summary>
     */
    fiservUserId: string;
    /** @settingKey History.Card.Fiserv.Password */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     Password used with the Fiserv Card History API
     * /// /// </summary>
     * /// </summary>
     */
    fiservPassword: string;
    /** @settingKey History.Card.Fiserv.x500Id */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     An Id used with Fiserv Card History API
     * /// /// </summary>
     * /// </summary>
     */
    fiservx500Id: string;
    /** @settingKey History.Card.Fiserv.CertificateStore */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     Certificate Store location of Fiserv API certificate
     * /// /// </summary>
     * /// </summary>
     */
    system: FiservCertificateStore;
    /** @settingKey History.Card.Fiserv.CertificateThumbPrint */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     Fiserv API certificate thumbprint
     * /// /// </summary>
     * /// </summary>
     */
    fiservCertificateThumbPrint: string;
    /** @settingKey History.Card.Fiserv.DebugModeEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     When enabled, will run the Fiserv Card History API in debug mode
     * /// /// </summary>
     * /// </summary>
     */
    fiservDebugModeEnabled: boolean;
    /** @settingKey History.Card.Fiserv.StatementDetailsApiEndpoint */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///     API Endpoint for use with Fiserv Card History API. Use this API endpoint to get card transactions.
     * /// /// </summary>
     * /// </summary>
     */
    fiservStatementDetailsApiEndpoint: string;
    /** @settingKey History.Card.Fiserv.CustomerInquiryApiEndpoint */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// API Endpoint for use with Fiserv Card History API. Use this API endpoint to get customer details (credit limit, current balance, etc).
     * /// /// </summary>
     * /// </summary>
     */
    fiservCustomerInquiryApiEndpoint: string;
    /** @settingKey History.Card.Pscu.ShouldShowDateForPendingTransactions */
    pscuShouldShowDateForPendingTransactions: boolean;
    /** @settingKey History.Card.Pscu.SsoEnabled */
    pscuSsoEnabled: boolean;
    /** @settingKey History.Card.Fiserv.Cycle */
    fiservCardHistoryCycleTypes: FiservCardHistoryCycleTypes;
}
