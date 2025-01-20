// Generated imports
import { VirusScanningSettings } from '../VirusScanningSettings';
import { SecureCommunicationSettings } from '../SecureCommunicationSettings';
import { FormattedSecureMessagingCategories } from '../FormattedSecureMessagingCategories';
import { PreferredAccountColumnDataFormat } from '../PreferredAccountColumnDataFormat';

export interface SecureMessageSettings {
    virusScanningSettings: VirusScanningSettings;
    /** @settingKey SecureCommunication.Enabled */
    /**
     * // Secure Messages enabled or not
     */
    enabled: boolean;
    /** @settingKey SecureCommunication.MinVersion */
    /**
     * // min version
     */
    minVersion: number;
    /** @settingKey SecureCommunication.ServiceSettings */
    /**
     * // service settings
     */
    secureCommunicationSettings: SecureCommunicationSettings;
    /** @settingKey SecureCommunication.FileUploadsEnabled */
    /**
     * // if true, allow file uploads with secure messages
     */
    fileUploadsEnabled: boolean;
    /** @settingKey SecureCommunication.FileUploadExtenstionTypes */
    /**
     * // comma delimited list of acceptable file upload file types
     */
    fileUploadExtenstionTypes: string;
    /** @settingKey SecureCommunication.SecureMessageMessageRegex */
    /**
     * // regular expression for the 'message' field in a secure message
     */
    secureMessageMessageRegex: string;
    /** @settingKey SecureCommunication.PropagateIncidentStatus */
    /**
     * // if true, set the incident status for all messages in the same thread
     */
    propagateIncidentStatus: boolean;
    /** @settingKey SecureCommunication.PropagateCategoryChange */
    /**
     * // if true, set the category for all messages in the same thread
     */
    propagateCategoryChange: boolean;
    /** @settingKey SecureCommunication.NewSecureMessageMaxLength */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This int is the maximum text length allowed in New Secure Message message box.
     * /// /// </summary>
     * /// </summary>
     */
    newSecureMessageMaxLength: number;
    /** @settingKey SecureCommunication.NewSecureMessageNotificationSubject */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This string will be the subject of email/alert notifying user that they have a new secure message waiting.
     * /// /// </summary>
     * /// </summary>
     */
    newSecureMessageNotificationSubject: string;
    /** @settingKey SecureCommunication.NewSecureMessageNotificationMessage */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This string will be the body of messages sent to members to notify them that they have a new secure message waiting for them.
     * /// /// </summary>
     * /// </summary>
     */
    newSecureMessageNotificationMessage: string;
    /** @settingKey SecureCommunication.EmailUsersWhenNewSecureMessageIsSentIsEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, then users will receive an email containing the text from
     * /// /// SecureCommunication.NewSecureMessageNotificationMessage when a credit union employee replies to their message.
     * /// /// </summary>
     * /// </summary>
     */
    emailUsersWhenNewSecureMessageIsSentIsEnabled: boolean;
    /** @settingKey SecureCommunication.FormattedSecureMessagingCategories */
    formattedSecureMessagingCategories: FormattedSecureMessagingCategories;
    /** @settingKey SecureCommunication.ShowMemberNameInAdminToolWhenSendingNewMessage */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// if true, then attempt to show the member name after entering their account info in the 'User' textbox
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowMemberNameInAdminToolWhenSendingNewMessage: boolean;
    /** @settingKey SecureCommunication.PreferredAccountColumnDataFormat */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Preferred 'Member' column data format in the index view of Secure Messages in the Admin tool. Options are 'Account' | 'Account Number Alias' | 'Member Name'
     * /// /// </summary>
     * /// </summary>
     */
    list: PreferredAccountColumnDataFormat;
    /** @settingKey SecureCommunication.ShowNonUrgentMessagesAtLogin */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, then show non-urgent messages in the pop-up modal at login for OLB users.
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowNonUrgentMessagesAtLogin: boolean;
    /** @settingKey SecureCommunication.AcknowledgeIndividualMessagesAtLogin */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, then allow individual messages to be acknowledged/replied to during login.
     * /// /// </summary>
     * /// </summary>
     */
    acknowledgeIndividualMessagesAtLogin: boolean;
    /** @settingKey SecureCommunication.HideCategorySelection */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this is true, the category selector will not show up for users when sending a message to admins.
     * /// /// </summary>
     * /// </summary>
     */
    hideCategorySelection: boolean;
    /** @settingKey SecureCommunication.DefaultCategory */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The default category for a secure message from a user when they don't have the ability to select the category due to <see cref="HideCategorySelection"/>
     * /// /// </summary>
     * /// </summary>
     */
    defaultCategory: string;
    /** @settingKey SecureCommunication.CategoryThatTriggersAnEmail */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Used for triggering an email when a specific category or secure message is sent
     * /// /// </summary>
     * /// </summary>
     */
    categoryThatTriggersAnEmail: string;
    /** @settingKey SecureCommunication.EmailAddress */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The email address where a triggered message will be sent
     * /// /// </summary>
     * /// </summary>
     */
    emailAddress: string;
    /** @settingKey SecureCommunication.SendMessageByUsername.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, then we will check to see if the value passed in by the user is a username (AccountNumberAlias)
     * /// /// If the value passed in is a username then we will get the member information based on the username and use the member
     * /// /// email to send the message.
     * /// /// </summary>
     * /// </summary>
     */
    sendMessageByUsernameEnabled: boolean;
    /** @settingKey SecureCommunication.EmailMessage */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The email message for emails that are sent when triggered by a category <see cref="CategoryThatTriggersAnEmail"/>
     * /// /// </summary>
     * /// </summary>
     */
    emailMessage: string;
    /** @settingKey X.App.HBBOL.gsEmailFrom */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The email address in the from field
     * /// /// </summary>
     * /// </summary>
     */
    fromEmailAddress: string;
    /** @settingKey SecureCommunication.ShouldSendEmailForSpecifiedCategory */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this is true, an email will be sent when a messages' category matches <see cref="CategoryThatTriggersAnEmail"/>
     * /// /// </summary>
     * /// </summary>
     */
    shouldSendEmailForSpecifiedCategory: boolean;
    /** @settingKey SecureCommunication.ShouldSendMemberNumberInEmails */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this is true, secure messages from members to the admin will contain the member number as the first line of the message body
     * /// /// </summary>
     * /// </summary>
     */
    shouldSendMemberNumberInEmails: boolean;
    /** @settingKey SecureCommunication.FormSecureMessageSubject */
    formSecureMessageSubject: string;
    /** @settingKey SecureCommunication.FormSecureMessageCategory */
    formSecureMessageCategory: string;
    /** @settingKey SecureCommunication.ShouldShowMemberDisplayNameInMessageResultsView */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this is true, show 'MemberDisplayName' in the first column of the _messageResults view in Admin
     * /// /// If false, show either the 'AdminTellerUserName' or the 'SenderMember' property in the first column of the _messageResults view in Admin
     * /// /// Default: False
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowMemberDisplayNameInMessageResultsView: boolean;
    /** @settingKey SecureCommunication.Admin.SendAttachmentsEnabled */
    adminSendAttachmentsEnabled: boolean;
    /** @settingKey SecureCommunication.Admin.ShowMessageThreadWhenReplyingEnabled */
    adminShowMessageThreadWhenReplyingEnabled: boolean;
}
