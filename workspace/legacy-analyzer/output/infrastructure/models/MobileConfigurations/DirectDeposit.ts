// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface DirectDeposit {
    /** @settingKey Mobile.DirectDepositInformation.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.DirectDepositInformation.Url */
    url: string;
    /** @settingKey Mobile.DirectDepositInformation.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.DirectDepositInformation.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.DirectDepositInformation.ShouldShowMenuItem */
    shouldShowMenuItem: boolean;
    authentication: Authentication;
}
