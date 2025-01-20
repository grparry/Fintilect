// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface Cardlytics {
    /** @settingKey Mobile.Deals.Cardlytics.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Deals.Cardlytics.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Deals.Cardlytics.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Deals.Cardlytics.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Deals.Cardlytics.NearMeEnabled */
    nearMeEnabled: boolean;
    authentication: Authentication;
}
