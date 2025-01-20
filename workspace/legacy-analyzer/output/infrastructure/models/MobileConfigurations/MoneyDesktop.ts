// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface MoneyDesktop {
    /** @settingKey Mobile.MoneyDesktop.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.MoneyDesktop.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.MoneyDesktop.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.MoneyDesktop.Enabled */
    enabled: boolean;
    authentication: Authentication;
}
