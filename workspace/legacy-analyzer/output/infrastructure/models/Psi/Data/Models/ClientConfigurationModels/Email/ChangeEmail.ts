import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ChangeEmailConfig {
    PrimaryMemberCanUpdateJointOwnersEmail: boolean;
    SendSecurityCodeToNewEmailOnlyOnEmailChange: boolean;
    UpdateBitEmailForPrimaryStatementAccountNumbers: boolean;
    EmailDomainRegistrationCheckEnabled: boolean;
    RestrictedEmailDomainRegistrationList: string[];
    ShouldUpdateCoreWhenNoChanges: boolean;
    ShouldReturnSuccessWithNoChanges: boolean;
    VerifyEmailEnabled: boolean;
    ZelleUpdateEmailEnabled: boolean;
}

export class ChangeEmail implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ChangeEmail'
    };


            private _primaryMemberCanUpdateJointOwnersEmail: boolean;
            get primaryMemberCanUpdateJointOwnersEmail(): boolean {
                return this._primaryMemberCanUpdateJointOwnersEmail;
            }
            set primaryMemberCanUpdateJointOwnersEmail(value: boolean) {
                this._primaryMemberCanUpdateJointOwnersEmail = value;
            }

            private _sendSecurityCodeToNewEmailOnlyOnEmailChange: boolean;
            get sendSecurityCodeToNewEmailOnlyOnEmailChange(): boolean {
                return this._sendSecurityCodeToNewEmailOnlyOnEmailChange;
            }
            set sendSecurityCodeToNewEmailOnlyOnEmailChange(value: boolean) {
                this._sendSecurityCodeToNewEmailOnlyOnEmailChange = value;
            }

            private _updateBitEmailForPrimaryStatementAccountNumbers: boolean;
            get updateBitEmailForPrimaryStatementAccountNumbers(): boolean {
                return this._updateBitEmailForPrimaryStatementAccountNumbers;
            }
            set updateBitEmailForPrimaryStatementAccountNumbers(value: boolean) {
                this._updateBitEmailForPrimaryStatementAccountNumbers = value;
            }

            private _emailDomainRegistrationCheckEnabled: boolean;
            get emailDomainRegistrationCheckEnabled(): boolean {
                return this._emailDomainRegistrationCheckEnabled;
            }
            set emailDomainRegistrationCheckEnabled(value: boolean) {
                this._emailDomainRegistrationCheckEnabled = value;
            }

            private _restrictedEmailDomainRegistrationList: string[];
            get restrictedEmailDomainRegistrationList(): string[] {
                return this._restrictedEmailDomainRegistrationList;
            }
            set restrictedEmailDomainRegistrationList(value: string[]) {
                this._restrictedEmailDomainRegistrationList = value;
            }

            private _shouldUpdateCoreWhenNoChanges: boolean;
            get shouldUpdateCoreWhenNoChanges(): boolean {
                return this._shouldUpdateCoreWhenNoChanges;
            }
            set shouldUpdateCoreWhenNoChanges(value: boolean) {
                this._shouldUpdateCoreWhenNoChanges = value;
            }

            private _shouldReturnSuccessWithNoChanges: boolean;
            get shouldReturnSuccessWithNoChanges(): boolean {
                return this._shouldReturnSuccessWithNoChanges;
            }
            set shouldReturnSuccessWithNoChanges(value: boolean) {
                this._shouldReturnSuccessWithNoChanges = value;
            }

            private _verifyEmailEnabled: boolean;
            get verifyEmailEnabled(): boolean {
                return this._verifyEmailEnabled;
            }
            set verifyEmailEnabled(value: boolean) {
                this._verifyEmailEnabled = value;
            }

            private _zelleUpdateEmailEnabled: boolean;
            get zelleUpdateEmailEnabled(): boolean {
                return this._zelleUpdateEmailEnabled;
            }
            set zelleUpdateEmailEnabled(value: boolean) {
                this._zelleUpdateEmailEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ChangeEmail.PrimaryMemberCanUpdateJointOwnersEmail", value: this._primaryMemberCanUpdateJointOwnersEmail, dataType: 'boolean', label: "Primary Member Can Update Joint Owners Email" },
                { key: "ChangeEmail.SendSecurityCodeToNewEmailOnlyOnEmailChange", value: this._sendSecurityCodeToNewEmailOnlyOnEmailChange, dataType: 'boolean', label: "Send Security Code To New Email Only On Email Change" },
                { key: "ChangeEmail.UpdateBitEmailForPrimaryStatementAccountNumbers", value: this._updateBitEmailForPrimaryStatementAccountNumbers, dataType: 'boolean', label: "Update Bit Email For Primary Statement Account Numbers" },
                { key: "ChangeEmail.EmailDomainRegistrationCheckEnabled", value: this._emailDomainRegistrationCheckEnabled, dataType: 'boolean', label: "Email Domain Registration Check Enabled" },
                { key: "ChangeEmail.RestrictedEmailDomainRegistrationList", value: this._restrictedEmailDomainRegistrationList, dataType: 'list<string>', label: "Restricted Email Domain Registration List" },
                { key: "ChangeEmail.ShouldUpdateCoreWhenNoChanges", value: this._shouldUpdateCoreWhenNoChanges, dataType: 'boolean', label: "Should Update Core When No Changes" },
                { key: "ChangeEmail.ShouldReturnSuccessWithNoChanges", value: this._shouldReturnSuccessWithNoChanges, dataType: 'boolean', label: "Should Return Success With No Changes" },
                { key: "ChangeEmail.VerifyEmailEnabled", value: this._verifyEmailEnabled, dataType: 'boolean', label: "Verify Email Enabled" },
                { key: "ChangeEmail.ZelleUpdateEmailEnabled", value: this._zelleUpdateEmailEnabled, dataType: 'boolean', label: "Zelle Update Email Enabled" },
            ];
        }

}