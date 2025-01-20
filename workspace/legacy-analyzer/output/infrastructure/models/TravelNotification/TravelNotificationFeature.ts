// Generated imports

export interface TravelNotificationFeature {
    /** @settingKey Features.TravelNotification.TravelNotificationEnabled */
    enabled: boolean;
    /** @settingKey Features.TravelNotification.MinVersion */
    minVersion: number;
    /** @settingKey Features.TravelNotification.ShowCellNumberOnTravelNotificationForm */
    showCellNumberOnTravelNotificationForm: boolean;
    /** @settingKey Features.TravelNotification.ShowFinalInstructionsOnTravelNotificationForm */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, show the 'final instructions' section on the travel notification view
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowFinalInstructionsOnTravelNotificationForm: boolean;
    /** @settingKey Features.TravelNotification.ShowEmailOptionInPreferredMethodOfContact */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, show email as an option in the 'preferred method of contact' section of the form INSTEAD OF alternate phone number
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowEmailOptionInPreferredMethodOfContact: boolean;
    /** @settingKey Features.TravelNotification.SubjectLine */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The subject line for the secure message that is sent from Travel Notification
     * /// /// </summary>
     * /// </summary>
     */
    subjectLine: string;
    /** @settingKey Features.TravelNotification.IncludeEAgreementInSubject */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, Subject Line will be {Features.TravelNotification.SubjectLine} [{EAgreementNumber}] (ie. "Travel Notification [12345678]")
     * /// /// </summary>
     * /// </summary>
     */
    includeEAgreementInSubject: boolean;
    /** @settingKey Features.TravelNotification.MessageCategory */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The message category that will be associated with the secure message that is sent from Travel Notification
     * /// /// </summary>
     * /// </summary>
     */
    messageCategory: string;
    /** @settingKey Features.TravelNotification.ShowUseOutsideOfUsOption */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, show 'If you are traveling outside the US, do you plan to use online or mobile banking during your travel?' radio button on form
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowUseOutsideOfUsOption: boolean;
    /** @settingKey Features.TravelNotification.SendToPscuEnabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, travel notifications will be sent to PSCU
     * /// /// </summary>
     * /// </summary>
     */
    sendToPscuEnabled: boolean;
    /** @settingKey Features.TravelNotification.PSCU.FraudSuspendStrategy */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Number value of Fraud Suspend strategy to define Travel Notifications
     * /// /// </summary>
     * /// </summary>
     */
    pscuFraudSuspendStrategy: number;
}
