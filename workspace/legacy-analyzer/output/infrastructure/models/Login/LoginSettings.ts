// Generated imports
import { ConnectNativeLoginRedirectChoiceType } from '../ConnectNativeLoginRedirectChoiceType';

export interface LoginSettings {
    /** @settingKey Features.Login.LoginFailuresBeforeLockingAccount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This utilizes the key in omega, but subtracts one because of the logic that previously utilized it.
     * /// /// Previously the user had 3 login attempts, but the logic was checking against 2.  So we're allowing the
     * /// /// PM to use a nicely named variable, then converting it to show the default of 2 when they intend 3
     * /// /// </summary>
     * /// </summary>
     */
    loginFailuresBeforeLockingAccountMinusOne: number;
    /** @settingKey Features.Login.ConnectNativeLandingPageUrl */
    connectNativeLandingPageUrl: string;
    /** @settingKey Features.Login.ConnectNativeLoginRedirectChoiceType */
    connectNativeLoginRedirectChoiceType: ConnectNativeLoginRedirectChoiceType;
    /** @settingKey X.App.HomeBanking.UsePlainTextPwd */
    usePlainTextPassword: boolean;
    /** @settingKey Features.Login.EnableLoginStatusReasonEncryption */
    enableLoginStatusEncryption: boolean;
    /** @settingKey X.App.HBBOL.CredentialsStorageMethod */
    credentialStorageMethod: string;
    /** @settingKey X.App.HomeBanking.AccountNumberAliasRequired */
    accountNumberAliasRequired: boolean;
    /** @settingKey X.App.HomeBanking.DisableLoginWithAccountNumber */
    disableLoginWithAccountNumber: boolean;
    /** @settingKey X.App.HBBOL.AllowSSNInsteadOfCall24 */
    allowSSNInsteadOfCall24: boolean;
}
