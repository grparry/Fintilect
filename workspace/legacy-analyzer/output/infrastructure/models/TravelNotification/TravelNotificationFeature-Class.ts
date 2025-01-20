function SettingKey(key: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__metadata) {
                instance.__metadata = {};
            }
            instance.__metadata[context.name.toString()] = key;
        });
    };
}

class TravelNotificationFeature {
    /** 
     * Indicates if the Travel Notification feature is enabled
     */
    @SettingKey("Features.TravelNotification.TravelNotificationEnabled")
    enabled: boolean;

    /**
     * Minimum version required for the Travel Notification feature
     */
    @SettingKey("Features.TravelNotification.MinVersion")
    minVersion: number;

    /**
     * Controls whether to show the cell number field on the travel notification form
     */
    @SettingKey("Features.TravelNotification.ShowCellNumberOnTravelNotificationForm")
    showCellNumberOnTravelNotificationForm: boolean;

    /**
     * If true, show the 'final instructions' section on the travel notification view
     */
    @SettingKey("Features.TravelNotification.ShowFinalInstructionsOnTravelNotificationForm")
    shouldShowFinalInstructionsOnTravelNotificationForm: boolean;

    /**
     * If true, show email as an option in the 'preferred method of contact' section of the form 
     * INSTEAD OF alternate phone number
     */
    @SettingKey("Features.TravelNotification.ShowEmailOptionInPreferredMethodOfContact")
    shouldShowEmailOptionInPreferredMethodOfContact: boolean;

    /**
     * The subject line for the secure message that is sent from Travel Notification
     */
    @SettingKey("Features.TravelNotification.SubjectLine")
    subjectLine: string;

    /**
     * If true, Subject Line will be {Features.TravelNotification.SubjectLine} [{EAgreementNumber}]
     * (ie. "Travel Notification [12345678]")
     */
    @SettingKey("Features.TravelNotification.IncludeEAgreementInSubject")
    includeEAgreementInSubject: boolean;

    /**
     * The message category that will be associated with the secure message that is sent 
     * from Travel Notification
     */
    @SettingKey("Features.TravelNotification.MessageCategory")
    messageCategory: string;

    /**
     * If true, show 'If you are traveling outside the US, do you plan to use online or 
     * mobile banking during your travel?' radio button on form
     */
    @SettingKey("Features.TravelNotification.ShowUseOutsideOfUsOption")
    shouldShowUseOutsideOfUsOption: boolean;

    /**
     * If true, travel notifications will be sent to PSCU
     */
    @SettingKey("Features.TravelNotification.SendToPscuEnabled")
    sendToPscuEnabled: boolean;

    /**
     * Number value of Fraud Suspend strategy to define Travel Notifications
     */
    @SettingKey("Features.TravelNotification.PSCU.FraudSuspendStrategy")
    pscuFraudSuspendStrategy: number;
}