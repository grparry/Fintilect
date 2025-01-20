// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface FicoCreditScore {
    /** @settingKey Mobile.FicoCreditScore.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.FicoCreditScore.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.FicoCreditScore.Enabled */
    enabled: boolean;
    authentication: Authentication;
}
