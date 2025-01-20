// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface CardAlerts {
    /** @settingKey Mobile.CardAlerts.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.CardAlerts.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.CardAlerts.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.CardAlerts.Urls */
    urls: string;
    authentication: Authentication;
}
