// Generated imports
import { char } from '../char';

export interface LinkedAccount {
    /** @settingKey LinkedAccount.ShouldShowAddNewAccountOnHistoryPage */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// True - Add New Linked Account Modal will show on the Linked Account History page
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowAddNewAccountOnHistoryPage: boolean;
    /** @settingKey Admin.LinkedAccount.ShouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// True - Enable ability to disable a linked account in the Admin tool
     * /// /// </summary>
     * /// </summary>
     */
    shouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled: boolean;
    /** @settingKey X.App.HBBOL.LinkedAccountEncryptionKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Linked accounts encryption key
     * /// /// </summary>
     * /// </summary>
     */
    linkedAccountEncryptionKey: string;
    /** @settingKey LinkedAccount.SearchByUuidEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Indicates if linked accounts should be retrieved by UUID instead of account number
     * /// /// </summary>
     * /// </summary>
     */
    searchByUuidEnabled: boolean;
    /** @settingKey LinkedAccounts.Enabled */
    enabled: boolean;
    /** @settingKey LinkedAccounts.MinVersion */
    minVersion: number;
    /** @settingKey LinkedAccounts.DeleteAccountEnabled */
    deleteAccountEnabled: boolean;
    /** @settingKey LinkedAccounts.IntraBankEnabled */
    intraBankEnabled: boolean;
    /** @settingKey LinkedAccounts.CrossBankEnabled */
    crossBankEnabled: boolean;
    /** @settingKey LinkedAccounts.ShowDeletedAccounts.Enabled */
    showDeletedAccountsEnabled: boolean;
    /** @settingKey X.App.HomeBanking.ShowLinkedAccounts */
    showCfsAccounts: boolean;
    /** @settingKey X.App.HomeBanking.ShowLinkedAchAccounts */
    showAchAccounts: boolean;
    /** @settingKey LinkedAccounts.AccountMaskingCharacter */
    accountMaskingCharacter: char;
    /** @settingKey X.App.HBBOL.ACHGLAccount */
    achGlAccount: string;
}
