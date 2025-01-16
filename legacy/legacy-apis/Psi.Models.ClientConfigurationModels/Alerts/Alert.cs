using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using NLog;
using Psi.Data.Models.Domain.Alerts;

namespace Psi.Data.Models.ClientConfigurationModels.Alerts
{
    public class Alert : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private AdHocAlerts _adHocAlerts;
        private ExternalEvents _externalEvents;
        private MessagePumps _messagePumps;

        public Alert(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Alert.InactiveAccountsThresholdDayValues")]
        public List<int> InactiveAccountsThresholdDayValues
        {
            get
            {
                var stringValues = GetListValue();
                var intList = new List<int>();
                foreach (var stringValue in stringValues)
                {
                    if (int.TryParse(stringValue.Trim(), out var newInt))
                    {
                        intList.Add(newInt);
                    }
                }
                intList.Sort();
                return intList.Distinct().ToList();
            }
            set => SetValue(value);
        }

        [SettingKey("Alert.ScheduledAlertsEnabled")]
        public bool ScheduledAlertsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.ScheduledAlerts.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.CustomMessageAvailable")]
        public bool CustomMessageAvailable
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.MfaWhitelist")]
        public string MfaWhitelist
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.AvailableAccountCategoriesForAlerts")]
        public List<string> AvailableAccountCategoriesForAlerts
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("Alert.MemberCanReplyToUrgentAlertAfterLogin")]
        public bool MemberCanReplyToUrgentAlertAfterLogin
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.SetCurrentEmailAddressAsDefaultAlways")]
        public bool SetCurrentEmailAddressAsDefaultAlways
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.Alerts2Enabled")]
        public bool Alerts2Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public AdHocAlerts AdHocAlerts
        {
            get => _adHocAlerts ?? (_adHocAlerts = new AdHocAlerts(_settingsBase));
            set => _adHocAlerts = value;
        }

        public ExternalEvents ExternalEvents
        {
            get => _externalEvents ?? (_externalEvents = new ExternalEvents(_settingsBase));
            set => _externalEvents = value;
        }

        public MessagePumps MessagePumps
        {
            get => _messagePumps ?? (_messagePumps = new MessagePumps(_settingsBase));
            set => _messagePumps = value;
        }

        /// <summary>
        /// If true, then show a link to the member's alert inbox in TopNavigation.ascx in HomeBanking
        /// </summary>
        [SettingKey("Alert.ShowAlertsInboxLinkInTopNavigation")]
        public bool ShouldShowAlertsInboxLinkInTopNavigation
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines whether or not to show all "Current Email Address" on Alerts 2.0 add/edit subscription page.
        /// </summary>
        [SettingKey("Alert.ShouldShowAllCurrentEmailAddressUserDevices")]
        public bool ShouldShowAllCurrentEmailAddressUserDevices
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.AlertsToOldHostAddressDays")]
        public int DaysUntilOldDefaultDevicesShouldNotGetAlerts
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.SMSMessageMaxLength")]
        public int SMSMessageMaxLength
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.EmailMessageMaxLength")]
        public int EmailMessageMaxLength
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.OLBMessageMaxLength")]
        public int OLBMessageMaxLength
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Alert.PushNotificationMessageMaxLength")]
        public int PushNotificationMessageMaxLength
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Alerts.DefaultDeliveryChannels")]
        public List<string> DefaultDeliveryChannels
        {
            get
            {
                var channels = GetListValue();
                var result = new List<string> { AlertChannelKinds.HomeBanking };
                result.AddRange(channels.Where(channel => AlertChannelKinds.All.Contains(channel.Trim())));

                return result;
            }
            set => SetValue(value);
        }

        [SettingKey("Alerts.DataFeed.AccountTypes")]
        public List<DataFeedAccountType> DatafeedAccountTypes
        {
            get
            {
                try
                {
                    var rawConfig = GetValue();
                    if (string.IsNullOrEmpty(rawConfig))
                    {
                        return new List<DataFeedAccountType>();
                    }

                    var config = JsonConvert.DeserializeObject<List<DataFeedAccountType>>(GetValue());

                    return config;
                }
                catch (Exception ex)
                {
                    return new List<DataFeedAccountType>();
                }
            }
            set
            {
                SetValue(value);
            }
        }

        [SettingKey("Alerts.DataFeed.BulkInsertEnabled")]
        public bool DataFeedBulkInsertEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Alerts.DataFeed.BatchSize")]
        public int DataFeedBatchSize
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Alerts.DataFeed.StopStoringTransactionFeedsEnabled")]
        public bool DataFeedStopStoringTransactionFeedsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Alerts.DataFeed.MetadataIdsToSave")]
        public List<int> DataFeedMetadataIdsToSave
        {
            get => GetListValue<int>() ?? new List<int>();
            set => SetValue(value);
        }

        [SettingKey("Alerts.DataFeed.MetadataIdsThatDoNotGenerateAlerts")]
        public List<int> DataFeedMetadataIdsThatDoNotGenerateAlerts
        {
            get => GetListValue<int>() ?? new List<int>();
            set => SetValue(value);
        }

        [SettingKey("Alerts.DataFeed.MaxDegreeOfParallelism")]
        public int DataFeedMaxDegreeOfParallelism
        {
            get
            {
                var value = GetIntValue();
                return value <= 0 ? 1 : value;
            }
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.Alerts2SmtpSettings")]
        public AlertSmtpSettings SmtpSettings
        {
            get => GetJsonValueOrNull<AlertSmtpSettings>();
            set => SetValue(value);
        }
    }
}
