// Generated imports
import { Authentication } from '../Authentication';

export interface LinkedAccounts {
    /** @settingKey Mobile.LinkedAccounts.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.LinkedAccounts.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.LinkedAccounts.VerifyAccountEnabled */
    verifyAccountEnabled: boolean;
    /** @settingKey X.App.HomeBanking.AlphaNumSpace */
    linkedAccountNameRegex: string;
    /** @settingKey LinkedAccounts.ShowDeletedAccounts.Enabled */
    showDeletedAccountsEnabled: boolean;
    authentication: Authentication;
}
