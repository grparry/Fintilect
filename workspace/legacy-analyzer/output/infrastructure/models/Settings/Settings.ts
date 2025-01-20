// Generated imports
import { ResetPassword } from '../MobileConfigurations/Settings/ChangeUserInformation/ResetPassword';
import { Notifications } from '../MobileConfigurations/Settings/Notifications/Notifications';
import { AtmLocator } from '../AtmLocator/AtmLocator';
import { BokuPhoneVerification } from '../BokuPhoneVerification';
import { ChangeAddress } from '../MobileConfigurations/Settings/ChangeUserInformation/ChangeAddress';
import { ChangeEmail } from '../MobileConfigurations/Settings/ChangeUserInformation/ChangeEmail';
import { TieredAccessAdmin } from '../TieredAccessAdmin';
import { ChangePhoneNumbers } from '../MobileConfigurations/Settings/ChangeUserInformation/ChangePhoneNumbers';
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface Settings {
    /** @settingKey Mobile.Settings.IsLogoutButtonEnabled */
    isLogoutButtonEnabled: boolean;
    resetPassword: ResetPassword;
    notifications: Notifications;
    atmLocator: AtmLocator;
    boku: BokuPhoneVerification;
    changeAddress: ChangeAddress;
    changeEmail: ChangeEmail;
    tieredAccessAdmin: TieredAccessAdmin;
    changePhoneNumbers: ChangePhoneNumbers;
    authentication: Authentication;
}
