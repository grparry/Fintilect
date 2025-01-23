import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AccountNumberReassignmentSettingsConfig {
    ChangeUuidWhenAccountNumberMatches: boolean;
    RemoveMfaQuestion: boolean;
    DisableScheduledTransfersUsingAccount: boolean;
}

export class AccountNumberReassignmentSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountNumberReassignmentSettings'
    };


            private _changeUuidWhenAccountNumberMatches: boolean;
            get changeUuidWhenAccountNumberMatches(): boolean {
                return this._changeUuidWhenAccountNumberMatches;
            }
            set changeUuidWhenAccountNumberMatches(value: boolean) {
                this._changeUuidWhenAccountNumberMatches = value;
            }

            private _removeMfaQuestion: boolean;
            get removeMfaQuestion(): boolean {
                return this._removeMfaQuestion;
            }
            set removeMfaQuestion(value: boolean) {
                this._removeMfaQuestion = value;
            }

            private _disableScheduledTransfersUsingAccount: boolean;
            get disableScheduledTransfersUsingAccount(): boolean {
                return this._disableScheduledTransfersUsingAccount;
            }
            set disableScheduledTransfersUsingAccount(value: boolean) {
                this._disableScheduledTransfersUsingAccount = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountNumberReassignmentSettings.ChangeUuidWhenAccountNumberMatches", value: this._changeUuidWhenAccountNumberMatches, dataType: 'boolean', label: "Change Uuid When Account Number Matches" },
                { key: "AccountNumberReassignmentSettings.RemoveMfaQuestion", value: this._removeMfaQuestion, dataType: 'boolean', label: "Remove Mfa Question" },
                { key: "AccountNumberReassignmentSettings.DisableScheduledTransfersUsingAccount", value: this._disableScheduledTransfersUsingAccount, dataType: 'boolean', label: "Disable Scheduled Transfers Using Account" },
            ];
        }

}