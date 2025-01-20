// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface StopPay {
    /** @settingKey Mobile.StopPay.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.StopPay.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.StopPay.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.StopPay.Enabled */
    enabled: boolean;
    authentication: Authentication;
    /** @settingKey Mobile.StopPay.Url */
    url: string;
}
