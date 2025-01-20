// Generated imports

export interface Payzur {
    /** @settingKey PersonPayments.Payzur.SyncCardsEnabled */
    syncCardsEnabled: boolean;
    /** @settingKey PersonPayments.Payzur.SyncCardsMinVersion */
    syncCardsMinVersion: number;
    /** @settingKey PersonPayments.Payzur.PublicKey */
    publicKey: string;
    /** @settingKey PersonPayments.Payzur.AccountTypes */
    /**
     * //TODO:  This should be a list of objects, and the setting string should be json format so that consumers of this setting don't have to know how to parse it.
     */
    accountTypes: string;
    /** @settingKey PersonPayments.Payzur.OpenInIframe */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, open person payments in an iFrame, and not in a new tab.
     * /// /// </summary>
     * /// </summary>
     */
    shouldOpenInIframe: boolean;
    /** @settingKey PersonPayments.Payzur.SyncDuplicateCardsEnabled */
    syncDuplicateCardsEnabled: boolean;
    /** @settingKey PersonPayments.Payzur.UseOAEP */
    useOAEP: boolean;
    /** @settingKey PersonPayments.Payzur.SyncAddedCardsEnabled */
    syncAddedCardsEnabled: boolean;
    /** @settingKey PersonPayments.Payzur.ShouldSkipCardSyncWhenCoreIsDown */
    shouldSkipCardSyncWhenCoreIsDown: boolean;
}
