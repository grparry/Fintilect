// Generated imports
import { SkippedEnrollmentSteps } from '../SkippedEnrollmentSteps';

export interface IntegratedEnrollmentSettings {
    /** @settingKey IntegratedEnrollment.Ach.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true will make a call to OAO to get ACH accounts during OAO Integrated Enrollment
     * /// /// </summary>
     * /// /// <remarks>Default Value is True</remarks>
     * /// </summary>
     */
    achEnabled: boolean;
    /** @settingKey IntegratedEnrollment.SSO.ShouldStoreUserIdAndPassword */
    shouldStoreUserIdAndPassword: boolean;
    /** @settingKey IntegratedEnrollment.ThirdPartyOao.Enabled */
    thirdPartyOaoEnabled: boolean;
    /** @settingKey IntegratedEnrollment.ThirdPartyOao.MinVersion */
    thirdPartyOaoMinVersion: number;
    /** @settingKey IntegratedEnrollment.SSO.SkippedEnrollmentSteps */
    dictionary: SkippedEnrollmentSteps;
}
