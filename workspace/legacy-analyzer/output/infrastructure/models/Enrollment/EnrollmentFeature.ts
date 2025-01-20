// Generated imports

export interface EnrollmentFeature {
    /** @settingKey Enrollment.RequireTemporaryPasswordDuringEnrollment */
    requireTemporaryPasswordDuringEnrollment: boolean;
    /** @settingKey Enrollment.FromEmailAddressForTemporaryPassword */
    fromEmailAddressForTemporaryPassword: string;
    /** @settingKey Enrollment.HideLoginStepsControlDuringEnrollment */
    shouldHideLoginStepsControlDuringEnrollment: boolean;
    /** @settingKey Enrollment.MinimumEnrollmentAgeIsRequired */
    minimumEnrollmentAgeIsRequired: boolean;
    /** @settingKey Enrollment.MinimumEnrollmentAgeInYears */
    minimumEnrollmentAgeInYears: number;
    /** @settingKey Enrollment.LoginPageUrlForOAO */
    loginPageUrlForOao: string;
    /** @settingKey Enrollment.Oao.AutoEnrollment.HideConfirmationPage */
    oaoAutoEnrollmentHideConfirmationPage: boolean;
    /** @settingKey Enrollment.Oao.AutoEnrollment.OaoSendUsernameAndPasswordEnabled */
    oaoSendUsernameAndPasswordEnabled: boolean;
}
