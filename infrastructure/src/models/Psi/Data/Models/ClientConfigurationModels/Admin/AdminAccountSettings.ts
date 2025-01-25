import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AccountNumberReassignmentSettings } from './AccountNumberReassignmentSettings';
export interface AdminAccountSettingsConfig {
    AccountNumberReassignment: AccountNumberReassignmentSettings;
    AllowAccountNumberReassignmentEnabled: boolean;
    PromptDeactivateExternalScheduledTransfers: boolean;
    ShouldConvertHouseholding: boolean;
}

export class AdminAccountSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AdminAccountSettings'
    };


            private _accountNumberReassignment: AccountNumberReassignmentSettings;
            get accountNumberReassignment(): AccountNumberReassignmentSettings {
                return this._accountNumberReassignment;
            }
            set accountNumberReassignment(value: AccountNumberReassignmentSettings) {
                this._accountNumberReassignment = value;
            }

            private _allowAccountNumberReassignmentEnabled: boolean;
            get allowAccountNumberReassignmentEnabled(): boolean {
                return this._allowAccountNumberReassignmentEnabled;
            }
            set allowAccountNumberReassignmentEnabled(value: boolean) {
                this._allowAccountNumberReassignmentEnabled = value;
            }

            private _promptDeactivateExternalScheduledTransfers: boolean;
            get promptDeactivateExternalScheduledTransfers(): boolean {
                return this._promptDeactivateExternalScheduledTransfers;
            }
            set promptDeactivateExternalScheduledTransfers(value: boolean) {
                this._promptDeactivateExternalScheduledTransfers = value;
            }

            private _shouldConvertHouseholding: boolean;
            get shouldConvertHouseholding(): boolean {
                return this._shouldConvertHouseholding;
            }
            set shouldConvertHouseholding(value: boolean) {
                this._shouldConvertHouseholding = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AdminAccountSettings.AccountNumberReassignment", value: this._accountNumberReassignment, dataType: 'accountnumberreassignmentsettings', label: "Account Number Reassignment" },
                { key: "AdminAccountSettings.AllowAccountNumberReassignmentEnabled", value: this._allowAccountNumberReassignmentEnabled, dataType: 'boolean', label: "Allow Account Number Reassignment Enabled" },
                { key: "AdminAccountSettings.PromptDeactivateExternalScheduledTransfers", value: this._promptDeactivateExternalScheduledTransfers, dataType: 'boolean', label: "Prompt Deactivate External Scheduled Transfers" },
                { key: "AdminAccountSettings.ShouldConvertHouseholding", value: this._shouldConvertHouseholding, dataType: 'boolean', label: "Should Convert Householding" },
            ];
        }

}