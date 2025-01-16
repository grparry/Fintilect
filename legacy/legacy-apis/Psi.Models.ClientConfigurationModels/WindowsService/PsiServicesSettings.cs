namespace Psi.Data.Models.ClientConfigurationModels.WindowsService
{
    public class PsiServicesSettings : SettingsBaseHelper
    {

        public PsiServicesSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// The Configurations for the various Services that are run by the Psi Windows Service. This is a JSON object and should be formatted like so:
        ///<remarks>
        /// [{
        ///     "StandardInterval": {
        ///         "Interval": "00:00:30"
        ///     },
        ///     "CalendarInterval": null,
        ///     "HourlyInterval": null,
        ///     "CronInterval": null,
        ///     "Enabled": false,
        ///     "IsScheduled": true,
        ///     "Name": "service 1 name"
        /// }]
        /// </remarks>
        /// </summary>
        [SettingKey("PsiServices.HostedServices.Configuration")]
        public string HostedServices
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The Json configuration for the DataFeedProcessing Service of PSIWindowsService. This is a JSON object and should be formatted like so:
        /// <remarks>
        /// {
        ///     'InputPath': 'feedInput',
        ///     'ErrorPath': 'feedError',
        ///     'CompletedPath': 'feedCompleted',
        ///     'ProcessedPath': 'feedProcessed',
        ///     'InputFileExclusiveAccessTimeout': '00:15:00'
        /// }
        /// </remarks>
        /// </summary>
        [SettingKey("PsiServices.DataFeedProcessing.Configuration")]
        public string DataFeedProcessing
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("PsiServices.ScheduledTransferService.ShouldCheckNextHourTransfersForInsufficientFunds")]
        public bool ScheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PsiServices.ScheduledTransferService.MaxDegreeOfParallelism")]
        public int ScheduledTransfersMaxDegreeOfParallelism
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("PsiServices.ScheduledTransferService.BatchSize")]
        public int ScheduledTransfersBatchSize
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("PsiServices.ScheduledTransferService.ValidTransferDaysRange")]
        public int ScheduledTransfersValidTransferDaysRange
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}
