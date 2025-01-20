// Generated imports
import { RestrictedEmailDomainRegistrationList } from '../RestrictedEmailDomainRegistrationList';

export interface ChangeEmail {
    /** @settingKey ChangeEmail.PrimaryMemberCanUpdateJointOwnersEmail */
    primaryMemberCanUpdateJointOwnersEmail: boolean;
    /** @settingKey ChangeEmail.SendSecurityCodeToNewEmailOnlyOnEmailChange */
    sendSecurityCodeToNewEmailOnlyOnEmailChange: boolean;
    /** @settingKey ChangeEmail.UpdateBitEmailForPrimaryStatementAccountNumbers */
    updateBitEmailForPrimaryStatementAccountNumbers: boolean;
    /** @settingKey ChangeEmail.EmailDomainRegistrationCheckEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Enables Admin email domain checking in order to refuse certain email domains when HomeBanking users attempt to change their email to domains on the not included list
     * /// /// </summary>
     * /// </summary>
     */
    emailDomainRegistrationCheckEnabled: boolean;
    /** @settingKey ChangeEmail.RestrictedEmailDomainRegistrationList */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// list of restricted email domains that users can NOT change their email to in HomeBanking. eg: mac.com (like mikeb@mac.com). This must be a comma-delimited string.
     * /// /// </summary>
     * /// </summary>
     */
    list: RestrictedEmailDomainRegistrationList;
    /** @settingKey ChangeEmail.ShouldUpdateCoreWhenNoChanges */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, update the core regardless of whether there are updates or not
     * /// /// </summary>
     * /// </summary>
     */
    shouldUpdateCoreWhenNoChanges: boolean;
    /** @settingKey ChangeEmail.ShouldReturnSuccessWithNoChanges */
    shouldReturnSuccessWithNoChanges: boolean;
    /** @settingKey ChangeEmail.VerifyEmailEnabled */
    verifyEmailEnabled: boolean;
    /** @settingKey ChangeEmail.Zelle.UpdateEmailEnabled */
    zelleUpdateEmailEnabled: boolean;
}
