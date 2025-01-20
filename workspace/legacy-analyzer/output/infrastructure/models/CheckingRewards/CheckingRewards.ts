// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface CheckingRewards {
    /** @settingKey Mobile.Deals.CheckingRewards.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Deals.CheckingRewards.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Deals.CheckingRewards.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Deals.CheckingRewards.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Deals.CheckingRewards.Url */
    url: string;
    authentication: Authentication;
    /** @settingKey Mobile.Deals.CheckingRewards.ReslovingUrl */
    reslovingUrl: string;
}
