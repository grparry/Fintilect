import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { VirusScanningSettings } from './VirusScanningSettings';
import { SecureCommunicationSettings } from './SecureCommunicationSettings';
import { FormattedSecureMessagingCategories } from './FormattedSecureMessagingCategories';
export interface SecureMessageSettingsConfig {
    VirusScanningSettings: VirusScanningSettings;
    Enabled: boolean;
    MinVersion: number;
    ServiceSettings: SecureCommunicationSettings;
    FileUploadsEnabled: boolean;
    FileUploadExtenstionTypes: string;
    SecureMessageMessageRegex: string;
    PropagateIncidentStatus: boolean;
    PropagateCategoryChange: boolean;
    NewSecureMessageMaxLength: number;
    NewSecureMessageNotificationSubject: string;
    NewSecureMessageNotificationMessage: string;
    EmailUsersWhenNewSecureMessageIsSentIsEnabled: boolean;
    FormattedSecureMessagingCategories: FormattedSecureMessagingCategories;
    ShouldShowMemberNameInAdminToolWhenSendingNewMessage: boolean;
    PreferredAccountColumnDataFormat: string[];
    ShouldShowNonUrgentMessagesAtLogin: boolean;
    AcknowledgeIndividualMessagesAtLogin: boolean;
    HideCategorySelection: boolean;
    DefaultCategory: string;
    CategoryThatTriggersAnEmail: string;
    EmailAddress: string;
    SendMessageByUsernameEnabled: boolean;
    EmailMessage: string;
    FromEmailAddress: string;
    ShouldSendEmailForSpecifiedCategory: boolean;
    ShouldSendMemberNumberInEmails: boolean;
    FormSecureMessageSubject: string;
    FormSecureMessageCategory: string;
    ShouldShowMemberDisplayNameInMessageResultsView: boolean;
    AdminSendAttachmentsEnabled: boolean;
    AdminShowMessageThreadWhenReplyingEnabled: boolean;
}

export class SecureMessageSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SecureMessageSettings'
    };


            private _virusScanningSettings: VirusScanningSettings;
            get virusScanningSettings(): VirusScanningSettings {
                return this._virusScanningSettings;
            }
            set virusScanningSettings(value: VirusScanningSettings) {
                this._virusScanningSettings = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _serviceSettings: SecureCommunicationSettings;
            get serviceSettings(): SecureCommunicationSettings {
                return this._serviceSettings;
            }
            set serviceSettings(value: SecureCommunicationSettings) {
                this._serviceSettings = value;
            }

            private _fileUploadsEnabled: boolean;
            get fileUploadsEnabled(): boolean {
                return this._fileUploadsEnabled;
            }
            set fileUploadsEnabled(value: boolean) {
                this._fileUploadsEnabled = value;
            }

            private _fileUploadExtenstionTypes: string;
            get fileUploadExtenstionTypes(): string {
                return this._fileUploadExtenstionTypes;
            }
            set fileUploadExtenstionTypes(value: string) {
                this._fileUploadExtenstionTypes = value;
            }

            private _secureMessageMessageRegex: string;
            get secureMessageMessageRegex(): string {
                return this._secureMessageMessageRegex;
            }
            set secureMessageMessageRegex(value: string) {
                this._secureMessageMessageRegex = value;
            }

            private _propagateIncidentStatus: boolean;
            get propagateIncidentStatus(): boolean {
                return this._propagateIncidentStatus;
            }
            set propagateIncidentStatus(value: boolean) {
                this._propagateIncidentStatus = value;
            }

            private _propagateCategoryChange: boolean;
            get propagateCategoryChange(): boolean {
                return this._propagateCategoryChange;
            }
            set propagateCategoryChange(value: boolean) {
                this._propagateCategoryChange = value;
            }

            private _newSecureMessageMaxLength: number;
            get newSecureMessageMaxLength(): number {
                return this._newSecureMessageMaxLength;
            }
            set newSecureMessageMaxLength(value: number) {
                this._newSecureMessageMaxLength = value;
            }

            private _newSecureMessageNotificationSubject: string;
            get newSecureMessageNotificationSubject(): string {
                return this._newSecureMessageNotificationSubject;
            }
            set newSecureMessageNotificationSubject(value: string) {
                this._newSecureMessageNotificationSubject = value;
            }

            private _newSecureMessageNotificationMessage: string;
            get newSecureMessageNotificationMessage(): string {
                return this._newSecureMessageNotificationMessage;
            }
            set newSecureMessageNotificationMessage(value: string) {
                this._newSecureMessageNotificationMessage = value;
            }

            private _emailUsersWhenNewSecureMessageIsSentIsEnabled: boolean;
            get emailUsersWhenNewSecureMessageIsSentIsEnabled(): boolean {
                return this._emailUsersWhenNewSecureMessageIsSentIsEnabled;
            }
            set emailUsersWhenNewSecureMessageIsSentIsEnabled(value: boolean) {
                this._emailUsersWhenNewSecureMessageIsSentIsEnabled = value;
            }

            private _formattedSecureMessagingCategories: FormattedSecureMessagingCategories;
            get formattedSecureMessagingCategories(): FormattedSecureMessagingCategories {
                return this._formattedSecureMessagingCategories;
            }
            set formattedSecureMessagingCategories(value: FormattedSecureMessagingCategories) {
                this._formattedSecureMessagingCategories = value;
            }

            private _shouldShowMemberNameInAdminToolWhenSendingNewMessage: boolean;
            get shouldShowMemberNameInAdminToolWhenSendingNewMessage(): boolean {
                return this._shouldShowMemberNameInAdminToolWhenSendingNewMessage;
            }
            set shouldShowMemberNameInAdminToolWhenSendingNewMessage(value: boolean) {
                this._shouldShowMemberNameInAdminToolWhenSendingNewMessage = value;
            }

            private _preferredAccountColumnDataFormat: string[];
            get preferredAccountColumnDataFormat(): string[] {
                return this._preferredAccountColumnDataFormat;
            }
            set preferredAccountColumnDataFormat(value: string[]) {
                this._preferredAccountColumnDataFormat = value;
            }

            private _shouldShowNonUrgentMessagesAtLogin: boolean;
            get shouldShowNonUrgentMessagesAtLogin(): boolean {
                return this._shouldShowNonUrgentMessagesAtLogin;
            }
            set shouldShowNonUrgentMessagesAtLogin(value: boolean) {
                this._shouldShowNonUrgentMessagesAtLogin = value;
            }

            private _acknowledgeIndividualMessagesAtLogin: boolean;
            get acknowledgeIndividualMessagesAtLogin(): boolean {
                return this._acknowledgeIndividualMessagesAtLogin;
            }
            set acknowledgeIndividualMessagesAtLogin(value: boolean) {
                this._acknowledgeIndividualMessagesAtLogin = value;
            }

            private _hideCategorySelection: boolean;
            get hideCategorySelection(): boolean {
                return this._hideCategorySelection;
            }
            set hideCategorySelection(value: boolean) {
                this._hideCategorySelection = value;
            }

            private _defaultCategory: string;
            get defaultCategory(): string {
                return this._defaultCategory;
            }
            set defaultCategory(value: string) {
                this._defaultCategory = value;
            }

            private _categoryThatTriggersAnEmail: string;
            get categoryThatTriggersAnEmail(): string {
                return this._categoryThatTriggersAnEmail;
            }
            set categoryThatTriggersAnEmail(value: string) {
                this._categoryThatTriggersAnEmail = value;
            }

            private _emailAddress: string;
            get emailAddress(): string {
                return this._emailAddress;
            }
            set emailAddress(value: string) {
                this._emailAddress = value;
            }

            private _sendMessageByUsernameEnabled: boolean;
            get sendMessageByUsernameEnabled(): boolean {
                return this._sendMessageByUsernameEnabled;
            }
            set sendMessageByUsernameEnabled(value: boolean) {
                this._sendMessageByUsernameEnabled = value;
            }

            private _emailMessage: string;
            get emailMessage(): string {
                return this._emailMessage;
            }
            set emailMessage(value: string) {
                this._emailMessage = value;
            }

            private _fromEmailAddress: string;
            get fromEmailAddress(): string {
                return this._fromEmailAddress;
            }
            set fromEmailAddress(value: string) {
                this._fromEmailAddress = value;
            }

            private _shouldSendEmailForSpecifiedCategory: boolean;
            get shouldSendEmailForSpecifiedCategory(): boolean {
                return this._shouldSendEmailForSpecifiedCategory;
            }
            set shouldSendEmailForSpecifiedCategory(value: boolean) {
                this._shouldSendEmailForSpecifiedCategory = value;
            }

            private _shouldSendMemberNumberInEmails: boolean;
            get shouldSendMemberNumberInEmails(): boolean {
                return this._shouldSendMemberNumberInEmails;
            }
            set shouldSendMemberNumberInEmails(value: boolean) {
                this._shouldSendMemberNumberInEmails = value;
            }

            private _formSecureMessageSubject: string;
            get formSecureMessageSubject(): string {
                return this._formSecureMessageSubject;
            }
            set formSecureMessageSubject(value: string) {
                this._formSecureMessageSubject = value;
            }

            private _formSecureMessageCategory: string;
            get formSecureMessageCategory(): string {
                return this._formSecureMessageCategory;
            }
            set formSecureMessageCategory(value: string) {
                this._formSecureMessageCategory = value;
            }

            private _shouldShowMemberDisplayNameInMessageResultsView: boolean;
            get shouldShowMemberDisplayNameInMessageResultsView(): boolean {
                return this._shouldShowMemberDisplayNameInMessageResultsView;
            }
            set shouldShowMemberDisplayNameInMessageResultsView(value: boolean) {
                this._shouldShowMemberDisplayNameInMessageResultsView = value;
            }

            private _adminSendAttachmentsEnabled: boolean;
            get adminSendAttachmentsEnabled(): boolean {
                return this._adminSendAttachmentsEnabled;
            }
            set adminSendAttachmentsEnabled(value: boolean) {
                this._adminSendAttachmentsEnabled = value;
            }

            private _adminShowMessageThreadWhenReplyingEnabled: boolean;
            get adminShowMessageThreadWhenReplyingEnabled(): boolean {
                return this._adminShowMessageThreadWhenReplyingEnabled;
            }
            set adminShowMessageThreadWhenReplyingEnabled(value: boolean) {
                this._adminShowMessageThreadWhenReplyingEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SecureMessageSettings.VirusScanningSettings", value: this._virusScanningSettings, dataType: 'virusscanningsettings', label: "Virus Scanning Settings" },
                { key: "SecureMessageSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SecureMessageSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "SecureMessageSettings.ServiceSettings", value: this._serviceSettings, dataType: 'securecommunicationsettings', label: "Service Settings" },
                { key: "SecureMessageSettings.FileUploadsEnabled", value: this._fileUploadsEnabled, dataType: 'boolean', label: "File Uploads Enabled" },
                { key: "SecureMessageSettings.FileUploadExtenstionTypes", value: this._fileUploadExtenstionTypes, dataType: 'string', label: "File Upload Extenstion Types" },
                { key: "SecureMessageSettings.SecureMessageMessageRegex", value: this._secureMessageMessageRegex, dataType: 'string', label: "Secure Message Message Regex" },
                { key: "SecureMessageSettings.PropagateIncidentStatus", value: this._propagateIncidentStatus, dataType: 'boolean', label: "Propagate Incident Status" },
                { key: "SecureMessageSettings.PropagateCategoryChange", value: this._propagateCategoryChange, dataType: 'boolean', label: "Propagate Category Change" },
                { key: "SecureMessageSettings.NewSecureMessageMaxLength", value: this._newSecureMessageMaxLength, dataType: 'number', label: "New Secure Message Max Length" },
                { key: "SecureMessageSettings.NewSecureMessageNotificationSubject", value: this._newSecureMessageNotificationSubject, dataType: 'string', label: "New Secure Message Notification Subject" },
                { key: "SecureMessageSettings.NewSecureMessageNotificationMessage", value: this._newSecureMessageNotificationMessage, dataType: 'string', label: "New Secure Message Notification Message" },
                { key: "SecureMessageSettings.EmailUsersWhenNewSecureMessageIsSentIsEnabled", value: this._emailUsersWhenNewSecureMessageIsSentIsEnabled, dataType: 'boolean', label: "Email Users When New Secure Message Is Sent Is Enabled" },
                { key: "SecureMessageSettings.FormattedSecureMessagingCategories", value: this._formattedSecureMessagingCategories, dataType: 'formattedsecuremessagingcategories', label: "Formatted Secure Messaging Categories" },
                { key: "SecureMessageSettings.ShouldShowMemberNameInAdminToolWhenSendingNewMessage", value: this._shouldShowMemberNameInAdminToolWhenSendingNewMessage, dataType: 'boolean', label: "Should Show Member Name In Admin Tool When Sending New Message" },
                { key: "SecureMessageSettings.PreferredAccountColumnDataFormat", value: this._preferredAccountColumnDataFormat, dataType: 'list<string>', label: "Preferred Account Column Data Format" },
                { key: "SecureMessageSettings.ShouldShowNonUrgentMessagesAtLogin", value: this._shouldShowNonUrgentMessagesAtLogin, dataType: 'boolean', label: "Should Show Non Urgent Messages At Login" },
                { key: "SecureMessageSettings.AcknowledgeIndividualMessagesAtLogin", value: this._acknowledgeIndividualMessagesAtLogin, dataType: 'boolean', label: "Acknowledge Individual Messages At Login" },
                { key: "SecureMessageSettings.HideCategorySelection", value: this._hideCategorySelection, dataType: 'boolean', label: "Hide Category Selection" },
                { key: "SecureMessageSettings.DefaultCategory", value: this._defaultCategory, dataType: 'string', label: "Default Category" },
                { key: "SecureMessageSettings.CategoryThatTriggersAnEmail", value: this._categoryThatTriggersAnEmail, dataType: 'string', label: "Category That Triggers An Email" },
                { key: "SecureMessageSettings.EmailAddress", value: this._emailAddress, dataType: 'string', label: "Email Address" },
                { key: "SecureMessageSettings.SendMessageByUsernameEnabled", value: this._sendMessageByUsernameEnabled, dataType: 'boolean', label: "Send Message By Username Enabled" },
                { key: "SecureMessageSettings.EmailMessage", value: this._emailMessage, dataType: 'string', label: "Email Message" },
                { key: "SecureMessageSettings.FromEmailAddress", value: this._fromEmailAddress, dataType: 'string', label: "From Email Address" },
                { key: "SecureMessageSettings.ShouldSendEmailForSpecifiedCategory", value: this._shouldSendEmailForSpecifiedCategory, dataType: 'boolean', label: "Should Send Email For Specified Category" },
                { key: "SecureMessageSettings.ShouldSendMemberNumberInEmails", value: this._shouldSendMemberNumberInEmails, dataType: 'boolean', label: "Should Send Member Number In Emails" },
                { key: "SecureMessageSettings.FormSecureMessageSubject", value: this._formSecureMessageSubject, dataType: 'string', label: "Form Secure Message Subject" },
                { key: "SecureMessageSettings.FormSecureMessageCategory", value: this._formSecureMessageCategory, dataType: 'string', label: "Form Secure Message Category" },
                { key: "SecureMessageSettings.ShouldShowMemberDisplayNameInMessageResultsView", value: this._shouldShowMemberDisplayNameInMessageResultsView, dataType: 'boolean', label: "Should Show Member Display Name In Message Results View" },
                { key: "SecureMessageSettings.AdminSendAttachmentsEnabled", value: this._adminSendAttachmentsEnabled, dataType: 'boolean', label: "Admin Send Attachments Enabled" },
                { key: "SecureMessageSettings.AdminShowMessageThreadWhenReplyingEnabled", value: this._adminShowMessageThreadWhenReplyingEnabled, dataType: 'boolean', label: "Admin Show Message Thread When Replying Enabled" },
            ];
        }

}