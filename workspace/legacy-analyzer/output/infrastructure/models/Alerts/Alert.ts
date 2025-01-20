// Generated imports
import { InactiveAccountsThresholdDayValues } from '../InactiveAccountsThresholdDayValues';
import { AvailableAccountCategoriesForAlerts } from '../AvailableAccountCategoriesForAlerts';
import { AdHocAlerts } from './AdHocAlerts';
import { ExternalEvents } from '../ExternalEvents';
import { MessagePumps } from '../MessagePumps';
import { DefaultDeliveryChannels } from '../DefaultDeliveryChannels';
import { DatafeedAccountTypes } from '../DatafeedAccountTypes';
import { DataFeedMetadataIdsToSave } from '../DataFeedMetadataIdsToSave';
import { DataFeedMetadataIdsThatDoNotGenerateAlerts } from '../DataFeedMetadataIdsThatDoNotGenerateAlerts';
import { AlertSmtpSettings } from '../AlertSmtpSettings';

export interface Alert {
    /** @settingKey Alert.InactiveAccountsThresholdDayValues */
    list: InactiveAccountsThresholdDayValues;
    /** @settingKey Alert.ScheduledAlertsEnabled */
    scheduledAlertsEnabled: boolean;
    /** @settingKey Alert.ScheduledAlerts.MinVersion */
    minVersion: number;
    /** @settingKey Alert.CustomMessageAvailable */
    customMessageAvailable: boolean;
    /** @settingKey Alert.MfaWhitelist */
    mfaWhitelist: string;
    /** @settingKey Alert.AvailableAccountCategoriesForAlerts */
    list: AvailableAccountCategoriesForAlerts;
    /** @settingKey Alert.MemberCanReplyToUrgentAlertAfterLogin */
    memberCanReplyToUrgentAlertAfterLogin: boolean;
    /** @settingKey Alert.SetCurrentEmailAddressAsDefaultAlways */
    setCurrentEmailAddressAsDefaultAlways: boolean;
    /** @settingKey X.App.HomeBanking.Alerts2Enabled */
    alerts2Enabled: boolean;
    adHocAlerts: AdHocAlerts;
    externalEvents: ExternalEvents;
    messagePumps: MessagePumps;
    /** @settingKey Alert.ShowAlertsInboxLinkInTopNavigation */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then show a link to the member's alert inbox in TopNavigation.ascx in HomeBanking
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowAlertsInboxLinkInTopNavigation: boolean;
    /** @settingKey Alert.ShouldShowAllCurrentEmailAddressUserDevices */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines whether or not to show all "Current Email Address" on Alerts 2.0 add/edit subscription page.
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowAllCurrentEmailAddressUserDevices: boolean;
    /** @settingKey X.App.HBBOL.AlertsToOldHostAddressDays */
    daysUntilOldDefaultDevicesShouldNotGetAlerts: number;
    /** @settingKey Alert.SMSMessageMaxLength */
    sMSMessageMaxLength: number;
    /** @settingKey Alert.EmailMessageMaxLength */
    emailMessageMaxLength: number;
    /** @settingKey Alert.OLBMessageMaxLength */
    oLBMessageMaxLength: number;
    /** @settingKey Alert.PushNotificationMessageMaxLength */
    pushNotificationMessageMaxLength: number;
    /** @settingKey Alerts.DefaultDeliveryChannels */
    list: DefaultDeliveryChannels;
    /** @settingKey Alerts.DataFeed.AccountTypes */
    list: DatafeedAccountTypes;
    /** @settingKey Alerts.DataFeed.BulkInsertEnabled */
    dataFeedBulkInsertEnabled: boolean;
    /** @settingKey Alerts.DataFeed.BatchSize */
    dataFeedBatchSize: number;
    /** @settingKey Alerts.DataFeed.StopStoringTransactionFeedsEnabled */
    dataFeedStopStoringTransactionFeedsEnabled: boolean;
    /** @settingKey Alerts.DataFeed.MetadataIdsToSave */
    list: DataFeedMetadataIdsToSave;
    /** @settingKey Alerts.DataFeed.MetadataIdsThatDoNotGenerateAlerts */
    list: DataFeedMetadataIdsThatDoNotGenerateAlerts;
    /** @settingKey Alerts.DataFeed.MaxDegreeOfParallelism */
    dataFeedMaxDegreeOfParallelism: number;
    /** @settingKey X.App.HBBOL.Alerts2SmtpSettings */
    alertSmtpSettings: AlertSmtpSettings;
}
