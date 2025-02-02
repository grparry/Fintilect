import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EnrollmentFeatureConfig {
    RequireTemporaryPasswordDuringEnrollment: boolean;
    FromEmailAddressForTemporaryPassword: string;
    ShouldHideLoginStepsControlDuringEnrollment: boolean;
    MinimumEnrollmentAgeIsRequired: boolean;
    MinimumEnrollmentAgeInYears: number;
    LoginPageUrlForOao: string;
    OaoAutoEnrollmentHideConfirmationPage: boolean;
    OaoSendUsernameAndPasswordEnabled: boolean;
}

export class EnrollmentFeature implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'EnrollmentFeature'
    };


            private _requireTemporaryPasswordDuringEnrollment: boolean;
            get requireTemporaryPasswordDuringEnrollment(): boolean {
                return this._requireTemporaryPasswordDuringEnrollment;
            }
            set requireTemporaryPasswordDuringEnrollment(value: boolean) {
                this._requireTemporaryPasswordDuringEnrollment = value;
            }

            private _fromEmailAddressForTemporaryPassword: string;
            get fromEmailAddressForTemporaryPassword(): string {
                return this._fromEmailAddressForTemporaryPassword;
            }
            set fromEmailAddressForTemporaryPassword(value: string) {
                this._fromEmailAddressForTemporaryPassword = value;
            }

            private _shouldHideLoginStepsControlDuringEnrollment: boolean;
            get shouldHideLoginStepsControlDuringEnrollment(): boolean {
                return this._shouldHideLoginStepsControlDuringEnrollment;
            }
            set shouldHideLoginStepsControlDuringEnrollment(value: boolean) {
                this._shouldHideLoginStepsControlDuringEnrollment = value;
            }

            private _minimumEnrollmentAgeIsRequired: boolean;
            get minimumEnrollmentAgeIsRequired(): boolean {
                return this._minimumEnrollmentAgeIsRequired;
            }
            set minimumEnrollmentAgeIsRequired(value: boolean) {
                this._minimumEnrollmentAgeIsRequired = value;
            }

            private _minimumEnrollmentAgeInYears: number;
            get minimumEnrollmentAgeInYears(): number {
                return this._minimumEnrollmentAgeInYears;
            }
            set minimumEnrollmentAgeInYears(value: number) {
                this._minimumEnrollmentAgeInYears = value;
            }

            private _loginPageUrlForOao: string;
            get loginPageUrlForOao(): string {
                return this._loginPageUrlForOao;
            }
            set loginPageUrlForOao(value: string) {
                this._loginPageUrlForOao = value;
            }

            private _oaoAutoEnrollmentHideConfirmationPage: boolean;
            get oaoAutoEnrollmentHideConfirmationPage(): boolean {
                return this._oaoAutoEnrollmentHideConfirmationPage;
            }
            set oaoAutoEnrollmentHideConfirmationPage(value: boolean) {
                this._oaoAutoEnrollmentHideConfirmationPage = value;
            }

            private _oaoSendUsernameAndPasswordEnabled: boolean;
            get oaoSendUsernameAndPasswordEnabled(): boolean {
                return this._oaoSendUsernameAndPasswordEnabled;
            }
            set oaoSendUsernameAndPasswordEnabled(value: boolean) {
                this._oaoSendUsernameAndPasswordEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "EnrollmentFeature.RequireTemporaryPasswordDuringEnrollment", value: this._requireTemporaryPasswordDuringEnrollment, dataType: 'boolean', label: "Require Temporary Password During Enrollment" },
                { key: "EnrollmentFeature.FromEmailAddressForTemporaryPassword", value: this._fromEmailAddressForTemporaryPassword, dataType: 'string', label: "From Email Address For Temporary Password" },
                { key: "EnrollmentFeature.ShouldHideLoginStepsControlDuringEnrollment", value: this._shouldHideLoginStepsControlDuringEnrollment, dataType: 'boolean', label: "Should Hide Login Steps Control During Enrollment" },
                { key: "EnrollmentFeature.MinimumEnrollmentAgeIsRequired", value: this._minimumEnrollmentAgeIsRequired, dataType: 'boolean', label: "Minimum Enrollment Age Is Required" },
                { key: "EnrollmentFeature.MinimumEnrollmentAgeInYears", value: this._minimumEnrollmentAgeInYears, dataType: 'number', label: "Minimum Enrollment Age In Years" },
                { key: "EnrollmentFeature.LoginPageUrlForOao", value: this._loginPageUrlForOao, dataType: 'string', label: "Login Page Url For Oao" },
                { key: "EnrollmentFeature.OaoAutoEnrollmentHideConfirmationPage", value: this._oaoAutoEnrollmentHideConfirmationPage, dataType: 'boolean', label: "Oao Auto Enrollment Hide Confirmation Page" },
                { key: "EnrollmentFeature.OaoSendUsernameAndPasswordEnabled", value: this._oaoSendUsernameAndPasswordEnabled, dataType: 'boolean', label: "Oao Send Username And Password Enabled" },
            ];
        }

}