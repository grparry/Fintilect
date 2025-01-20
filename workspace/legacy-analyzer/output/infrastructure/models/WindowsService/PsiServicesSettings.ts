// Generated imports

export interface PsiServicesSettings {
    /** @settingKey PsiServices.HostedServices.Configuration */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The Configurations for the various Services that are run by the Psi Windows Service. This is a JSON object and should be formatted like so:
     * /// ///<remarks>
     * /// /// [{
     * /// ///     "StandardInterval": {
     * /// ///         "Interval": "00:00:30"
     * /// ///     },
     * /// ///     "CalendarInterval": null,
     * /// ///     "HourlyInterval": null,
     * /// ///     "CronInterval": null,
     * /// ///     "Enabled": false,
     * /// ///     "IsScheduled": true,
     * /// ///     "Name": "service 1 name"
     * /// /// }]
     * /// /// </remarks>
     * /// /// </summary>
     * /// </summary>
     */
    hostedServices: string;
    /** @settingKey PsiServices.DataFeedProcessing.Configuration */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The Json configuration for the DataFeedProcessing Service of PSIWindowsService. This is a JSON object and should be formatted like so:
     * /// /// <remarks>
     * /// /// {
     * /// ///     'InputPath': 'feedInput',
     * /// ///     'ErrorPath': 'feedError',
     * /// ///     'CompletedPath': 'feedCompleted',
     * /// ///     'ProcessedPath': 'feedProcessed',
     * /// ///     'InputFileExclusiveAccessTimeout': '00:15:00'
     * /// /// }
     * /// /// </remarks>
     * /// /// </summary>
     * /// </summary>
     */
    dataFeedProcessing: string;
    /** @settingKey PsiServices.ScheduledTransferService.ShouldCheckNextHourTransfersForInsufficientFunds */
    scheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds: boolean;
    /** @settingKey PsiServices.ScheduledTransferService.MaxDegreeOfParallelism */
    scheduledTransfersMaxDegreeOfParallelism: number;
    /** @settingKey PsiServices.ScheduledTransferService.BatchSize */
    scheduledTransfersBatchSize: number;
    /** @settingKey PsiServices.ScheduledTransferService.ValidTransferDaysRange */
    scheduledTransfersValidTransferDaysRange: number;
}
