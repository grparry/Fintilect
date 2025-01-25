import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MFAQuestionsConfig {
    MFASecurityCodeEnabled: boolean;
    MFAChallengeOptSecurityCodes: boolean;
    SetFocusOnFirst: boolean;
    SecurityCodeRetryCount: number;
    SecurityCodeShouldUseCaseSensitiveCompare: boolean;
    SecurityCodeQuestionID: number;
    MinVersion: number;
    EnablePlainTextAnswers: number;
    FreeformMFAEnabled: boolean;
    FreeformMFAEncryptionKey: string;
    ChallengeViewQuestionCount: string;
    IPWhitelistEnabled: boolean;
    IPWhitelist: string;
    EnrollmentDisableSetup: boolean;
}

export class MFAQuestions implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MFAQuestions'
    };


            private _mFASecurityCodeEnabled: boolean;
            get mFASecurityCodeEnabled(): boolean {
                return this._mFASecurityCodeEnabled;
            }
            set mFASecurityCodeEnabled(value: boolean) {
                this._mFASecurityCodeEnabled = value;
            }

            private _mFAChallengeOptSecurityCodes: boolean;
            get mFAChallengeOptSecurityCodes(): boolean {
                return this._mFAChallengeOptSecurityCodes;
            }
            set mFAChallengeOptSecurityCodes(value: boolean) {
                this._mFAChallengeOptSecurityCodes = value;
            }

            private _setFocusOnFirst: boolean;
            get setFocusOnFirst(): boolean {
                return this._setFocusOnFirst;
            }
            set setFocusOnFirst(value: boolean) {
                this._setFocusOnFirst = value;
            }

            private _securityCodeRetryCount: number;
            get securityCodeRetryCount(): number {
                return this._securityCodeRetryCount;
            }
            set securityCodeRetryCount(value: number) {
                this._securityCodeRetryCount = value;
            }

            private _securityCodeShouldUseCaseSensitiveCompare: boolean;
            get securityCodeShouldUseCaseSensitiveCompare(): boolean {
                return this._securityCodeShouldUseCaseSensitiveCompare;
            }
            set securityCodeShouldUseCaseSensitiveCompare(value: boolean) {
                this._securityCodeShouldUseCaseSensitiveCompare = value;
            }

            private _securityCodeQuestionID: number;
            get securityCodeQuestionID(): number {
                return this._securityCodeQuestionID;
            }
            set securityCodeQuestionID(value: number) {
                this._securityCodeQuestionID = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _enablePlainTextAnswers: number;
            get enablePlainTextAnswers(): number {
                return this._enablePlainTextAnswers;
            }
            set enablePlainTextAnswers(value: number) {
                this._enablePlainTextAnswers = value;
            }

            private _freeformMFAEnabled: boolean;
            get freeformMFAEnabled(): boolean {
                return this._freeformMFAEnabled;
            }
            set freeformMFAEnabled(value: boolean) {
                this._freeformMFAEnabled = value;
            }

            private _freeformMFAEncryptionKey: string;
            get freeformMFAEncryptionKey(): string {
                return this._freeformMFAEncryptionKey;
            }
            set freeformMFAEncryptionKey(value: string) {
                this._freeformMFAEncryptionKey = value;
            }

            private _challengeViewQuestionCount: string;
            get challengeViewQuestionCount(): string {
                return this._challengeViewQuestionCount;
            }
            set challengeViewQuestionCount(value: string) {
                this._challengeViewQuestionCount = value;
            }

            private _iPWhitelistEnabled: boolean;
            get iPWhitelistEnabled(): boolean {
                return this._iPWhitelistEnabled;
            }
            set iPWhitelistEnabled(value: boolean) {
                this._iPWhitelistEnabled = value;
            }

            private _iPWhitelist: string;
            get iPWhitelist(): string {
                return this._iPWhitelist;
            }
            set iPWhitelist(value: string) {
                this._iPWhitelist = value;
            }

            private _enrollmentDisableSetup: boolean;
            get enrollmentDisableSetup(): boolean {
                return this._enrollmentDisableSetup;
            }
            set enrollmentDisableSetup(value: boolean) {
                this._enrollmentDisableSetup = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MFAQuestions.MFASecurityCodeEnabled", value: this._mFASecurityCodeEnabled, dataType: 'boolean', label: "M F A Security Code Enabled" },
                { key: "MFAQuestions.MFAChallengeOptSecurityCodes", value: this._mFAChallengeOptSecurityCodes, dataType: 'boolean', label: "M F A Challenge Opt Security Codes" },
                { key: "MFAQuestions.SetFocusOnFirst", value: this._setFocusOnFirst, dataType: 'boolean', label: "Set Focus On First" },
                { key: "MFAQuestions.SecurityCodeRetryCount", value: this._securityCodeRetryCount, dataType: 'number', label: "Security Code Retry Count" },
                { key: "MFAQuestions.SecurityCodeShouldUseCaseSensitiveCompare", value: this._securityCodeShouldUseCaseSensitiveCompare, dataType: 'boolean', label: "Security Code Should Use Case Sensitive Compare" },
                { key: "MFAQuestions.SecurityCodeQuestionID", value: this._securityCodeQuestionID, dataType: 'number', label: "Security Code Question I D" },
                { key: "MFAQuestions.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "MFAQuestions.EnablePlainTextAnswers", value: this._enablePlainTextAnswers, dataType: 'number', label: "Enable Plain Text Answers" },
                { key: "MFAQuestions.FreeformMFAEnabled", value: this._freeformMFAEnabled, dataType: 'boolean', label: "Freeform M F A Enabled" },
                { key: "MFAQuestions.FreeformMFAEncryptionKey", value: this._freeformMFAEncryptionKey, dataType: 'string', label: "Freeform M F A Encryption Key" },
                { key: "MFAQuestions.ChallengeViewQuestionCount", value: this._challengeViewQuestionCount, dataType: 'string', label: "Challenge View Question Count" },
                { key: "MFAQuestions.IPWhitelistEnabled", value: this._iPWhitelistEnabled, dataType: 'boolean', label: "I P Whitelist Enabled" },
                { key: "MFAQuestions.IPWhitelist", value: this._iPWhitelist, dataType: 'string', label: "I P Whitelist" },
                { key: "MFAQuestions.EnrollmentDisableSetup", value: this._enrollmentDisableSetup, dataType: 'boolean', label: "Enrollment Disable Setup" },
            ];
        }

}