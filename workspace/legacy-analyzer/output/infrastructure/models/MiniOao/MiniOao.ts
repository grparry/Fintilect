// Generated imports
import { Authentication } from '../Authentication';

export interface MiniOao {
    /** @settingKey Mobile.AccountOpening.Mini.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.AccountOpening.Mini.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.AccountOpening.Mini.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.AccountOpening.Mini.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.AccountOpening.Mini.PurchaseCdUrl */
    purchaseCdUrl: string;
    /** @settingKey Mobile.AccountOpening.Mini.OpenSubAccountUrl */
    openSubAccountUrl: string;
    /** @settingKey Mobile.AccountOpening.Mini.ShouldVirusScanFiles */
    shouldVirusScanFiles: boolean;
    /** @settingKey Mobile.AccountOpening.Mini.ShouldShowMenuItem */
    shouldShowMenuItem: boolean;
    authentication: Authentication;
}
