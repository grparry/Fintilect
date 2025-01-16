using System.Collections.Generic;
using Psi.Data.Models.Domain.SecureCommunication;

namespace Psi.Data.Models.ClientConfigurationModels.SecureCommunication
{
    public class SecureMessageSettings : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private VirusScanningSettings _virusScanningSettings;

        public SecureMessageSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public VirusScanningSettings VirusScanningSettings
        {
            get => _virusScanningSettings ?? (_virusScanningSettings = new VirusScanningSettings(_settingsBase));
            set => _virusScanningSettings = value;
        }

        // Secure Messages enabled or not
        [SettingKey("SecureCommunication.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue() && ServiceSettings != null;
            set => SetValue(value);
        }
        // min version
        [SettingKey("SecureCommunication.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        // service settings
        [SettingKey("SecureCommunication.ServiceSettings")]
        public SecureCommunicationSettings ServiceSettings
        {
            get => GetJsonValueOrNull<SecureCommunicationSettings>();
            set => SetValue(value);
        }

        // if true, allow file uploads with secure messages
        [SettingKey("SecureCommunication.FileUploadsEnabled")]
        public bool FileUploadsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        // comma delimited list of acceptable file upload file types
        [SettingKey("SecureCommunication.FileUploadExtenstionTypes")]
        public string FileUploadExtenstionTypes
        {
            get => GetValue();
            set => SetValue(value);
        }

        // regular expression for the 'message' field in a secure message
        [SettingKey("SecureCommunication.SecureMessageMessageRegex")]
        public string SecureMessageMessageRegex
        {
            get => !string.IsNullOrEmpty(GetValue()) ? GetValue() : "^([\\s\\S]*)$";
            set => SetValue(value);
        }

        // if true, set the incident status for all messages in the same thread
        [SettingKey("SecureCommunication.PropagateIncidentStatus")]
        public bool PropagateIncidentStatus
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        // if true, set the category for all messages in the same thread
        [SettingKey("SecureCommunication.PropagateCategoryChange")]
        public bool PropagateCategoryChange
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// This int is the maximum text length allowed in New Secure Message message box.
        /// </summary>
        [SettingKey("SecureCommunication.NewSecureMessageMaxLength")]
        public int NewSecureMessageMaxLength
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// This string will be the subject of email/alert notifying user that they have a new secure message waiting.
        /// </summary>
        [SettingKey("SecureCommunication.NewSecureMessageNotificationSubject")]
        public string NewSecureMessageNotificationSubject
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// This string will be the body of messages sent to members to notify them that they have a new secure message waiting for them.
        /// </summary>
        [SettingKey("SecureCommunication.NewSecureMessageNotificationMessage")]
        public string NewSecureMessageNotificationMessage
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If this setting is true, then users will receive an email containing the text from 
        /// SecureCommunication.NewSecureMessageNotificationMessage when a credit union employee replies to their message.
        /// </summary>
        [SettingKey("SecureCommunication.EmailUsersWhenNewSecureMessageIsSentIsEnabled")]
        public bool EmailUsersWhenNewSecureMessageIsSentIsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("SecureCommunication.FormattedSecureMessagingCategories")]
        public FormattedSecureMessagingCategories FormattedSecureMessagingCategories
        {
            get => GetJsonValueOrNull<FormattedSecureMessagingCategories>();
            set => SetValue(value);
        }

        /// <summary>
        /// if true, then attempt to show the member name after entering their account info in the 'User' textbox
        /// </summary>
        [SettingKey("SecureCommunication.ShowMemberNameInAdminToolWhenSendingNewMessage")]
        public bool ShouldShowMemberNameInAdminToolWhenSendingNewMessage
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Preferred 'Member' column data format in the index view of Secure Messages in the Admin tool. Options are 'Account' | 'Account Number Alias' | 'Member Name'
        /// </summary>
        [SettingKey("SecureCommunication.PreferredAccountColumnDataFormat")]
        public List<string> PreferredAccountColumnDataFormat
        {
            get => GetListValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If this setting is true, then show non-urgent messages in the pop-up modal at login for OLB users.
        /// </summary>
        [SettingKey("SecureCommunication.ShowNonUrgentMessagesAtLogin")]
        public bool ShouldShowNonUrgentMessagesAtLogin
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If this setting is true, then allow individual messages to be acknowledged/replied to during login.
        /// </summary>
        [SettingKey("SecureCommunication.AcknowledgeIndividualMessagesAtLogin")]
        public bool AcknowledgeIndividualMessagesAtLogin
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If this is true, the category selector will not show up for users when sending a message to admins.
        /// </summary>
        [SettingKey("SecureCommunication.HideCategorySelection")]
        public bool HideCategorySelection
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The default category for a secure message from a user when they don't have the ability to select the category due to <see cref="HideCategorySelection"/>
        /// </summary>
        [SettingKey("SecureCommunication.DefaultCategory")]
        public string DefaultCategory
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Used for triggering an email when a specific category or secure message is sent
        /// </summary>
        [SettingKey("SecureCommunication.CategoryThatTriggersAnEmail")]
        public string CategoryThatTriggersAnEmail
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The email address where a triggered message will be sent
        /// </summary>
        [SettingKey("SecureCommunication.EmailAddress")]
        public string EmailAddress
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If this setting is true, then we will check to see if the value passed in by the user is a username (AccountNumberAlias)
        /// If the value passed in is a username then we will get the member information based on the username and use the member
        /// email to send the message.
        /// </summary>
        [SettingKey("SecureCommunication.SendMessageByUsername.Enabled")]
        public bool SendMessageByUsernameEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The email message for emails that are sent when triggered by a category <see cref="CategoryThatTriggersAnEmail"/>
        /// </summary>
        [SettingKey("SecureCommunication.EmailMessage")]
        public string EmailMessage
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The email address in the from field
        /// </summary>
        [SettingKey("X.App.HBBOL.gsEmailFrom")]
        public string FromEmailAddress
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If this is true, an email will be sent when a messages' category matches <see cref="CategoryThatTriggersAnEmail"/>
        /// </summary>
        [SettingKey("SecureCommunication.ShouldSendEmailForSpecifiedCategory")]
        public bool ShouldSendEmailForSpecifiedCategory
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If this is true, secure messages from members to the admin will contain the member number as the first line of the message body
        /// </summary>
        [SettingKey("SecureCommunication.ShouldSendMemberNumberInEmails")]
        public bool ShouldSendMemberNumberInEmails
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("SecureCommunication.FormSecureMessageSubject")]
        public string FormSecureMessageSubject
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("SecureCommunication.FormSecureMessageCategory")]
        public string FormSecureMessageCategory
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If this is true, show 'MemberDisplayName' in the first column of the _messageResults view in Admin
        /// If false, show either the 'AdminTellerUserName' or the 'SenderMember' property in the first column of the _messageResults view in Admin
        /// Default: False
        /// </summary>
        [SettingKey("SecureCommunication.ShouldShowMemberDisplayNameInMessageResultsView")]
        public bool ShouldShowMemberDisplayNameInMessageResultsView
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("SecureCommunication.Admin.SendAttachmentsEnabled")]
        public bool AdminSendAttachmentsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
     
        [SettingKey("SecureCommunication.Admin.ShowMessageThreadWhenReplyingEnabled")]
        public bool AdminShowMessageThreadWhenReplyingEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
