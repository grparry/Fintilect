// Generated imports
import { SecurityCodeVerificationSettings } from './SecurityCodeVerificationSettings';

export interface SmsSettings {
    securityCodeVerificationSettings: SecurityCodeVerificationSettings;
    /** @settingKey Admin.SMS.SmsCodeOneTimeEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If set to True, show Send SMS control on member search page in Admin
     * /// /// </summary>
     * /// </summary>
     */
    smsCodeOneTimeEnabled: boolean;
    /** @settingKey Admin.SMS.SmsCodeOneTime.ShowPriorToGetMember */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If set to True, show Send SMS control prior to member being retrieved
     * /// /// </summary>
     * /// </summary>
     */
    showSMSPrior: boolean;
}
