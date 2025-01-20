// Generated imports
import { FeeAccountsShareCategories } from '../FeeAccountsShareCategories';
import { FeeAccountsLoanCategories } from '../FeeAccountsLoanCategories';

export interface OnlineBankingConfiguration {
    /** @settingKey Application.OnlineBanking.IgnoreCanRun */
    ignoreCanRun: boolean;
    /** @settingKey Application.OnlineBanking.Version */
    version: number;
    /** @settingKey Transfers.FeeAccounts.ShareCategories */
    list: FeeAccountsShareCategories;
    /** @settingKey Transfers.FeeAccounts.LoanCategories */
    list: FeeAccountsLoanCategories;
    /** @settingKey Application.OnlineBanking.IsPersonCentricModeEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, this setting will change Corelation core integration to be person centric rather than account (member account) centric.
     * /// /// For example, if this setting is true, notes (also known as permissions or flags), will be set on the person level rather than the
     * /// /// account (member account) level.
     * /// /// </summary>
     * /// </summary>
     */
    isPersonCentricModeEnabled: boolean;
    /** @settingKey X.App.HomeBanking.KeepAliveInterval */
    keepAliveInterval: number;
    /** @settingKey X.App.HomeBanking.TimeoutWarningMessage */
    timeoutWarningMessage: string;
    /** @settingKey X.App.HomeBanking.ForceLoginByAccountAlias */
    forceLoginByAccountAlias: boolean;
    /** @settingKey X.App.HomeBanking.AccountIDRegEx */
    accountIDRegEx: string;
}
