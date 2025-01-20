// Generated imports
import { IpWhitelist } from '../IpWhitelist';

export interface HomeBankingLoginConfiguration {
    /** @settingKey HomeBankingLogin.UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Allows users to log in during enrollment using the last 4 of any Tax ID (usually SSN) that is associated with an
     * /// /// owner or joint owner of a member account.  In order to use this setting,
     * /// /// X.App.HBBOL.AllowSSNInsteadOfCall24 must also be turned on.
     * /// /// If Tax Ids are allowed for authentication during enrollment, and UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount
     * /// /// is false, users will only be able to log in during enrollment if they know the last
     * /// /// 4 of the social of the primary owner of the member account.
     * /// /// </summary>
     * /// </summary>
     */
    usersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount: boolean;
    /** @settingKey HomeBankingLogin.UsersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Allows users to verify their identity by using the name, zip, ssn, date of birth information that is associated with any individual that is associated
     * /// /// with a member account.  This allows joint owners to enroll in online banking without having to know the PII for the primary account owner.
     * /// /// </summary>
     * /// </summary>
     */
    usersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount: boolean;
    /** @settingKey HomeBankingLogin.MimeTypeRegex */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Validates MimeTypes on login
     * /// /// </summary>
     * /// </summary>
     */
    mimeTypeRegex: string;
    /** @settingKey HomeBankingLogin.ReorderCaptchaTabOrder */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Reorders the tab indexes of the captcha image and its associated text entry
     * /// /// </summary>
     * /// </summary>
     */
    reorderCaptchaTabOrder: boolean;
    /** @settingKey HomeBankingLogin.RemoveLeadingZerosFromUid */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Remove all leading zero's from Uid when logging in.
     * /// /// </summary>
     * /// </summary>
     */
    removeLeadingZerosFromUid: boolean;
    /** @settingKey HomeBankingLogin.ShouldNewUserLinkNavigateToNewUserForm */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then don't show the 'help' window as a new 'popped-up' window through javascript when clicking the 'new user' link on the login page.
     * /// /// Instead navigate to lognin.aspx?new=y like you can from the mini-login page. Default: False
     * /// /// </summary>
     * /// </summary>
     */
    shouldNewUserLinkNavigateToNewUserForm: boolean;
    /** @settingKey HomeBankingLogin.Captcha.IpWhitelistEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, enable IP Whitelisting for the Connect Captcha
     * /// /// </summary>
     * /// </summary>
     */
    ipWhitelistEnabled: boolean;
    /** @settingKey HomeBankingLogin.Captcha.IpWhitelist */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Comma delimited string of IP address to add to the Ip Whitelist feature
     * /// /// </summary>
     * /// </summary>
     */
    list: IpWhitelist;
}
