// Generated imports
import { QuickAccessPin } from '../QuickAccessPin';

export interface QuickAccess {
    /** @settingKey Mobile.Security.QuickAccess.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Security.QuickAccess.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Security.QuickAccess.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Security.QuickAccess.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Security.QuickAccess.ReturnPage */
    returnPage: string;
    /** @settingKey Mobile.Security.QuickAccess.DeleteTokensFromWebEnabled */
    deleteTokensFromWebEnabled: boolean;
    /** @settingKey Mobile.Security.QuickAccess.LoginScreenButtonEnabled */
    loginScreenButtonEnabled: boolean;
    /** @settingKey Mobile.Security.QuickAccess.EnrollOnLoginEnabled */
    enrollOnLoginEnabled: boolean;
    quickAccessPin: QuickAccessPin;
}
