// Generated imports
import { Preferences } from '../MobileConfigurations/QuickBalance/Preferences';

export interface QuickBalance {
    /** @settingKey Mobile.QuickBalance.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.QuickBalance.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.QuickBalance.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.QuickBalance.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.QuickBalance.RefreshTime */
    refreshTime: number;
    /** @settingKey Mobile.QuickBalance.MaxNumberOfAccounts */
    maxNumberOfAccounts: number;
    preferences: Preferences;
}
