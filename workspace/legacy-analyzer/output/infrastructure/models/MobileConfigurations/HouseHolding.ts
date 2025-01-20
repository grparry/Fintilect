// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface HouseHolding {
    /** @settingKey Mobile.HouseHolding.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.HouseHolding.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.HouseHolding.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.HouseHolding.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.HouseHolding.PermissionsUrl */
    permissionsUrl: string;
    authentication: Authentication;
}
