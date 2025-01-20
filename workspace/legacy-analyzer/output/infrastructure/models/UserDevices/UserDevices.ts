// Generated imports
import { StaticSecurityCodes[] } from '../StaticSecurityCodes[]';

export interface UserDevices {
    /** @settingKey Mobile.UserDevices.EnableStaticSecurityCode */
    enableStaticSecurityCode: boolean;
    /** @settingKey Mobile.UserDevices.StaticSecurityCodes */
    staticSecurityCodes: StaticSecurityCodes[];
    /** @settingKey Mobile.UserDevices.ValidSecurityCodeCharacters */
    validSecurityCodeCharacters: string;
    /** @settingKey X.App.HomeBanking.MobileAppKeyLength */
    appKeyLength: number;
    /** @settingKey Mobile.UserDevices.ImplicitRegistrationEnabled */
    implicitRegistrationEnabled: boolean;
    /** @settingKey Mobile.UserDevices.ImplicitRegistrationMinIosVersion */
    implicitRegistrationMinIosVersion: string;
    /** @settingKey Mobile.UserDevices.ImplicitRegistrationMinAndroidVersion */
    implicitRegistrationMinAndroidVersion: string;
}
