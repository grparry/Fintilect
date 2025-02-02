import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AdHocAlerts } from '../AdHocAlerts';
import { ExternalEvents } from '../ExternalEvents';
import { MessagePumps } from '../MessagePumps';
import { DataFeedAccountType } from '../DataFeedAccountType';
import { AlertSmtpSettings } from '../AlertSmtpSettings';
export interface AlertConfig {
    InactiveAccountsThresholdDayValues: number[];
    ScheduledAlertsEnabled: boolean;
    MinVersion: number;
    CustomMessageAvailable: boolean;
    MfaWhitelist: string;
    AvailableAccountCategoriesForAlerts: string[];
    MemberCanReplyToUrgentAlertAfterLogin: boolean;
    SetCurrentEmailAddressAsDefaultAlways: boolean;
    Alerts2Enabled: boolean;
    AdHocAlerts: AdHocAlerts;
    ExternalEvents: ExternalEvents;
    MessagePumps: MessagePumps;
    ShouldShowAlertsInboxLinkInTopNavigation: boolean;
    ShouldShowAllCurrentEmailAddressUserDevices: boolean;
    DaysUntilOldDefaultDevicesShouldNotGetAlerts: number;
    SMSMessageMaxLength: number;
    EmailMessageMaxLength: number;
    OLBMessageMaxLength: number;
    PushNotificationMessageMaxLength: number;
    DefaultDeliveryChannels: string[];
    DatafeedAccountTypes: DataFeedAccountType[];
    DataFeedBulkInsertEnabled: boolean;
    DataFeedBatchSize: number;
    DataFeedStopStoringTransactionFeedsEnabled: boolean;
    DataFeedMetadataIdsToSave: number[];
    DataFeedMetadataIdsThatDoNotGenerateAlerts: number[];
    DataFeedMaxDegreeOfParallelism: number;
    SmtpSettings: AlertSmtpSettings;
}

export class Alert implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Alert'
    };


            private _inactiveAccountsThresholdDayValues: number[];
            get inactiveAccountsThresholdDayValues(): number[] {
                return this._inactiveAccountsThresholdDayValues;
            }
            set inactiveAccountsThresholdDayValues(value: number[]) {
                this._inactiveAccountsThresholdDayValues = value;
            }

            private _scheduledAlertsEnabled: boolean;
            get scheduledAlertsEnabled(): boolean {
                return this._scheduledAlertsEnabled;
            }
            set scheduledAlertsEnabled(value: boolean) {
                this._scheduledAlertsEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _customMessageAvailable: boolean;
            get customMessageAvailable(): boolean {
                return this._customMessageAvailable;
            }
            set customMessageAvailable(value: boolean) {
                this._customMessageAvailable = value;
            }

            private _mfaWhitelist: string;
            get mfaWhitelist(): string {
                return this._mfaWhitelist;
            }
            set mfaWhitelist(value: string) {
                this._mfaWhitelist = value;
            }

            private _availableAccountCategoriesForAlerts: string[];
            get availableAccountCategoriesForAlerts(): string[] {
                return this._availableAccountCategoriesForAlerts;
            }
            set availableAccountCategoriesForAlerts(value: string[]) {
                this._availableAccountCategoriesForAlerts = value;
            }

            private _memberCanReplyToUrgentAlertAfterLogin: boolean;
            get memberCanReplyToUrgentAlertAfterLogin(): boolean {
                return this._memberCanReplyToUrgentAlertAfterLogin;
            }
            set memberCanReplyToUrgentAlertAfterLogin(value: boolean) {
                this._memberCanReplyToUrgentAlertAfterLogin = value;
            }

            private _setCurrentEmailAddressAsDefaultAlways: boolean;
            get setCurrentEmailAddressAsDefaultAlways(): boolean {
                return this._setCurrentEmailAddressAsDefaultAlways;
            }
            set setCurrentEmailAddressAsDefaultAlways(value: boolean) {
                this._setCurrentEmailAddressAsDefaultAlways = value;
            }

            private _alerts2Enabled: boolean;
            get alerts2Enabled(): boolean {
                return this._alerts2Enabled;
            }
            set alerts2Enabled(value: boolean) {
                this._alerts2Enabled = value;
            }

            private _adHocAlerts: AdHocAlerts;
            get adHocAlerts(): AdHocAlerts {
                return this._adHocAlerts;
            }
            set adHocAlerts(value: AdHocAlerts) {
                this._adHocAlerts = value;
            }

            private _externalEvents: ExternalEvents;
            get externalEvents(): ExternalEvents {
                return this._externalEvents;
            }
            set externalEvents(value: ExternalEvents) {
                this._externalEvents = value;
            }

            private _messagePumps: MessagePumps;
            get messagePumps(): MessagePumps {
                return this._messagePumps;
            }
            set messagePumps(value: MessagePumps) {
                this._messagePumps = value;
            }

            private _shouldShowAlertsInboxLinkInTopNavigation: boolean;
            get shouldShowAlertsInboxLinkInTopNavigation(): boolean {
                return this._shouldShowAlertsInboxLinkInTopNavigation;
            }
            set shouldShowAlertsInboxLinkInTopNavigation(value: boolean) {
                this._shouldShowAlertsInboxLinkInTopNavigation = value;
            }

            private _shouldShowAllCurrentEmailAddressUserDevices: boolean;
            get shouldShowAllCurrentEmailAddressUserDevices(): boolean {
                return this._shouldShowAllCurrentEmailAddressUserDevices;
            }
            set shouldShowAllCurrentEmailAddressUserDevices(value: boolean) {
                this._shouldShowAllCurrentEmailAddressUserDevices = value;
            }

            private _daysUntilOldDefaultDevicesShouldNotGetAlerts: number;
            get daysUntilOldDefaultDevicesShouldNotGetAlerts(): number {
                return this._daysUntilOldDefaultDevicesShouldNotGetAlerts;
            }
            set daysUntilOldDefaultDevicesShouldNotGetAlerts(value: number) {
                this._daysUntilOldDefaultDevicesShouldNotGetAlerts = value;
            }

            private _sMSMessageMaxLength: number;
            get sMSMessageMaxLength(): number {
                return this._sMSMessageMaxLength;
            }
            set sMSMessageMaxLength(value: number) {
                this._sMSMessageMaxLength = value;
            }

            private _emailMessageMaxLength: number;
            get emailMessageMaxLength(): number {
                return this._emailMessageMaxLength;
            }
            set emailMessageMaxLength(value: number) {
                this._emailMessageMaxLength = value;
            }

            private _oLBMessageMaxLength: number;
            get oLBMessageMaxLength(): number {
                return this._oLBMessageMaxLength;
            }
            set oLBMessageMaxLength(value: number) {
                this._oLBMessageMaxLength = value;
            }

            private _pushNotificationMessageMaxLength: number;
            get pushNotificationMessageMaxLength(): number {
                return this._pushNotificationMessageMaxLength;
            }
            set pushNotificationMessageMaxLength(value: number) {
                this._pushNotificationMessageMaxLength = value;
            }

            private _defaultDeliveryChannels: string[];
            get defaultDeliveryChannels(): string[] {
                return this._defaultDeliveryChannels;
            }
            set defaultDeliveryChannels(value: string[]) {
                this._defaultDeliveryChannels = value;
            }

            private _datafeedAccountTypes: DataFeedAccountType[];
            get datafeedAccountTypes(): DataFeedAccountType[] {
                return this._datafeedAccountTypes;
            }
            set datafeedAccountTypes(value: DataFeedAccountType[]) {
                this._datafeedAccountTypes = value;
            }

            private _dataFeedBulkInsertEnabled: boolean;
            get dataFeedBulkInsertEnabled(): boolean {
                return this._dataFeedBulkInsertEnabled;
            }
            set dataFeedBulkInsertEnabled(value: boolean) {
                this._dataFeedBulkInsertEnabled = value;
            }

            private _dataFeedBatchSize: number;
            get dataFeedBatchSize(): number {
                return this._dataFeedBatchSize;
            }
            set dataFeedBatchSize(value: number) {
                this._dataFeedBatchSize = value;
            }

            private _dataFeedStopStoringTransactionFeedsEnabled: boolean;
            get dataFeedStopStoringTransactionFeedsEnabled(): boolean {
                return this._dataFeedStopStoringTransactionFeedsEnabled;
            }
            set dataFeedStopStoringTransactionFeedsEnabled(value: boolean) {
                this._dataFeedStopStoringTransactionFeedsEnabled = value;
            }

            private _dataFeedMetadataIdsToSave: number[];
            get dataFeedMetadataIdsToSave(): number[] {
                return this._dataFeedMetadataIdsToSave;
            }
            set dataFeedMetadataIdsToSave(value: number[]) {
                this._dataFeedMetadataIdsToSave = value;
            }

            private _dataFeedMetadataIdsThatDoNotGenerateAlerts: number[];
            get dataFeedMetadataIdsThatDoNotGenerateAlerts(): number[] {
                return this._dataFeedMetadataIdsThatDoNotGenerateAlerts;
            }
            set dataFeedMetadataIdsThatDoNotGenerateAlerts(value: number[]) {
                this._dataFeedMetadataIdsThatDoNotGenerateAlerts = value;
            }

            private _dataFeedMaxDegreeOfParallelism: number;
            get dataFeedMaxDegreeOfParallelism(): number {
                return this._dataFeedMaxDegreeOfParallelism;
            }
            set dataFeedMaxDegreeOfParallelism(value: number) {
                this._dataFeedMaxDegreeOfParallelism = value;
            }

            private _smtpSettings: AlertSmtpSettings;
            get smtpSettings(): AlertSmtpSettings {
                return this._smtpSettings;
            }
            set smtpSettings(value: AlertSmtpSettings) {
                this._smtpSettings = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Alert.InactiveAccountsThresholdDayValues", value: this._inactiveAccountsThresholdDayValues, dataType: 'list<number>', label: "Inactive Accounts Threshold Day Values" },
                { key: "Alert.ScheduledAlertsEnabled", value: this._scheduledAlertsEnabled, dataType: 'boolean', label: "Scheduled Alerts Enabled" },
                { key: "Alert.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "Alert.CustomMessageAvailable", value: this._customMessageAvailable, dataType: 'boolean', label: "Custom Message Available" },
                { key: "Alert.MfaWhitelist", value: this._mfaWhitelist, dataType: 'string', label: "Mfa Whitelist" },
                { key: "Alert.AvailableAccountCategoriesForAlerts", value: this._availableAccountCategoriesForAlerts, dataType: 'list<string>', label: "Available Account Categories For Alerts" },
                { key: "Alert.MemberCanReplyToUrgentAlertAfterLogin", value: this._memberCanReplyToUrgentAlertAfterLogin, dataType: 'boolean', label: "Member Can Reply To Urgent Alert After Login" },
                { key: "Alert.SetCurrentEmailAddressAsDefaultAlways", value: this._setCurrentEmailAddressAsDefaultAlways, dataType: 'boolean', label: "Set Current Email Address As Default Always" },
                { key: "Alert.Alerts2Enabled", value: this._alerts2Enabled, dataType: 'boolean', label: "Alerts2 Enabled" },
                { key: "Alert.AdHocAlerts", value: this._adHocAlerts, dataType: 'adhocalerts', label: "Ad Hoc Alerts" },
                { key: "Alert.ExternalEvents", value: this._externalEvents, dataType: 'externalevents', label: "External Events" },
                { key: "Alert.MessagePumps", value: this._messagePumps, dataType: 'messagepumps', label: "Message Pumps" },
                { key: "Alert.ShouldShowAlertsInboxLinkInTopNavigation", value: this._shouldShowAlertsInboxLinkInTopNavigation, dataType: 'boolean', label: "Should Show Alerts Inbox Link In Top Navigation" },
                { key: "Alert.ShouldShowAllCurrentEmailAddressUserDevices", value: this._shouldShowAllCurrentEmailAddressUserDevices, dataType: 'boolean', label: "Should Show All Current Email Address User Devices" },
                { key: "Alert.DaysUntilOldDefaultDevicesShouldNotGetAlerts", value: this._daysUntilOldDefaultDevicesShouldNotGetAlerts, dataType: 'number', label: "Days Until Old Default Devices Should Not Get Alerts" },
                { key: "Alert.SMSMessageMaxLength", value: this._sMSMessageMaxLength, dataType: 'number', label: "S M S Message Max Length" },
                { key: "Alert.EmailMessageMaxLength", value: this._emailMessageMaxLength, dataType: 'number', label: "Email Message Max Length" },
                { key: "Alert.OLBMessageMaxLength", value: this._oLBMessageMaxLength, dataType: 'number', label: "O L B Message Max Length" },
                { key: "Alert.PushNotificationMessageMaxLength", value: this._pushNotificationMessageMaxLength, dataType: 'number', label: "Push Notification Message Max Length" },
                { key: "Alert.DefaultDeliveryChannels", value: this._defaultDeliveryChannels, dataType: 'list<string>', label: "Default Delivery Channels" },
                { key: "Alert.DatafeedAccountTypes", value: this._datafeedAccountTypes, dataType: 'array<DataFeedAccountType>', label: "Datafeed Account Types" },
                { key: "Alert.DataFeedBulkInsertEnabled", value: this._dataFeedBulkInsertEnabled, dataType: 'boolean', label: "Data Feed Bulk Insert Enabled" },
                { key: "Alert.DataFeedBatchSize", value: this._dataFeedBatchSize, dataType: 'number', label: "Data Feed Batch Size" },
                { key: "Alert.DataFeedStopStoringTransactionFeedsEnabled", value: this._dataFeedStopStoringTransactionFeedsEnabled, dataType: 'boolean', label: "Data Feed Stop Storing Transaction Feeds Enabled" },
                { key: "Alert.DataFeedMetadataIdsToSave", value: this._dataFeedMetadataIdsToSave, dataType: 'list<number>', label: "Data Feed Metadata Ids To Save" },
                { key: "Alert.DataFeedMetadataIdsThatDoNotGenerateAlerts", value: this._dataFeedMetadataIdsThatDoNotGenerateAlerts, dataType: 'list<number>', label: "Data Feed Metadata Ids That Do Not Generate Alerts" },
                { key: "Alert.DataFeedMaxDegreeOfParallelism", value: this._dataFeedMaxDegreeOfParallelism, dataType: 'number', label: "Data Feed Max Degree Of Parallelism" },
                { key: "Alert.SmtpSettings", value: this._smtpSettings, dataType: 'alertsmtpsettings', label: "Smtp Settings" },
            ];
        }

}