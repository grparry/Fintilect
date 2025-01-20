// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface SendMoney {
    /** @settingKey Mobile.SendMoney.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.SendMoney.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.SendMoney.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.SendMoney.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.SendMoney.LandingEnabled */
    landingEnabled: boolean;
    /** @settingKey Mobile.SendMoney.DefaultBusinessFirstName */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// When a first name is not present on a business account, this first name will be used for Send Money.
     * /// /// </summary>
     * /// </summary>
     */
    defaultBusinessFirstName: string;
    authentication: Authentication;
}
