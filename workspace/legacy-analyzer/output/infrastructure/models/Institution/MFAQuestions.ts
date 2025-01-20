// Generated imports

export interface MFAQuestions {
    /** @settingKey X.App.HomeBanking.MFASecurityCodeEnabled */
    mFASecurityCodeEnabled: boolean;
    /** @settingKey X.App.HomeBanking.MFAChallengeOptSecurityCodes */
    mFAChallengeOptSecurityCodes: boolean;
    /** @settingKey MFAQuestions.SetFocusOnFirst */
    setFocusOnFirst: boolean;
    /** @settingKey MFAQuestions.SecurityCodeRetryCount */
    securityCodeRetryCount: number;
    /** @settingKey MFAQuestions.SecurityCodeShouldUseCaseSensitiveCompare */
    securityCodeShouldUseCaseSensitiveCompare: boolean;
    /** @settingKey MFAQuestions.SecurityCodeQuestionID */
    securityCodeQuestionID: number;
    /** @settingKey MFAQuestions.FreeformMFA.MinVersion */
    minVersion: number;
    /** @settingKey MFAQuestions.EnablePlainTextAnswers */
    /**
     * /// <summary>
     * /// // if enabled, the user can enter their own answers as plain text instead of choosing from pre-set answers from a drop-down list
     * /// // both to set and to get (in order to check if they are correct during login verification)
     * /// </summary>
     */
    enablePlainTextAnswers: number;
    /** @settingKey MFAQuestions.FreeformMFA.Enable */
    freeformMFAEnabled: boolean;
    /** @settingKey MFAQuestions.FreeformMFA.EncryptionKey */
    freeformMFAEncryptionKey: string;
    /** @settingKey MFAQuestions.FreeformMFA.ChallengeViewQuestionCount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// On the challenge page (when logging in) how many questions to show to the user. Default is 1 (one).
     * /// /// For OLD MFA, this is in the db: dbo.MFAConfig.DisplayQuestionCount
     * /// /// </summary>
     * /// </summary>
     */
    challengeViewQuestionCount: string;
    /** @settingKey MFAQuestions.IPWhitelist.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines if IP whitelist feature is enabled.
     * /// /// </summary>
     * /// </summary>
     */
    iPWhitelistEnabled: boolean;
    /** @settingKey MFAQuestions.IPWhitelist */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This is an IP whitelist that allows the user to skip MFA questions if the IP is found in the whitelist.
     * /// /// </summary>
     * /// </summary>
     */
    iPWhitelist: string;
    /** @settingKey MFAQuestions.Enrollment.DisableSetup */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///  Used to disable to MFA Questions setup and use, for times when it isn't desired (MFA Security Code is used)
     * /// /// </summary>
     * /// </summary>
     */
    enrollmentDisableSetup: boolean;
}
