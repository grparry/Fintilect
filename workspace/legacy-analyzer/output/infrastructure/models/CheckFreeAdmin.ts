import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CheckFreeAdminConfig {
    BankAccountListCallEnabled: boolean;
    BankAccountInactivateCallEnabled: boolean;
    SubscriberModifyCallEnabled: boolean;
    SubscriberInactivateCallEnabled: boolean;
    BankAccountModifyCallEnabled: boolean;
    SubscriberReactivateCallEnabled: boolean;
}

export class CheckFreeAdmin implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CheckFreeAdmin'
    };


            private _bankAccountListCallEnabled: boolean;
            get bankAccountListCallEnabled(): boolean {
                return this._bankAccountListCallEnabled;
            }
            set bankAccountListCallEnabled(value: boolean) {
                this._bankAccountListCallEnabled = value;
            }

            private _bankAccountInactivateCallEnabled: boolean;
            get bankAccountInactivateCallEnabled(): boolean {
                return this._bankAccountInactivateCallEnabled;
            }
            set bankAccountInactivateCallEnabled(value: boolean) {
                this._bankAccountInactivateCallEnabled = value;
            }

            private _subscriberModifyCallEnabled: boolean;
            get subscriberModifyCallEnabled(): boolean {
                return this._subscriberModifyCallEnabled;
            }
            set subscriberModifyCallEnabled(value: boolean) {
                this._subscriberModifyCallEnabled = value;
            }

            private _subscriberInactivateCallEnabled: boolean;
            get subscriberInactivateCallEnabled(): boolean {
                return this._subscriberInactivateCallEnabled;
            }
            set subscriberInactivateCallEnabled(value: boolean) {
                this._subscriberInactivateCallEnabled = value;
            }

            private _bankAccountModifyCallEnabled: boolean;
            get bankAccountModifyCallEnabled(): boolean {
                return this._bankAccountModifyCallEnabled;
            }
            set bankAccountModifyCallEnabled(value: boolean) {
                this._bankAccountModifyCallEnabled = value;
            }

            private _subscriberReactivateCallEnabled: boolean;
            get subscriberReactivateCallEnabled(): boolean {
                return this._subscriberReactivateCallEnabled;
            }
            set subscriberReactivateCallEnabled(value: boolean) {
                this._subscriberReactivateCallEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CheckFreeAdmin.BankAccountListCallEnabled", value: this._bankAccountListCallEnabled, dataType: 'boolean', label: "Bank Account List Call Enabled" },
                { key: "CheckFreeAdmin.BankAccountInactivateCallEnabled", value: this._bankAccountInactivateCallEnabled, dataType: 'boolean', label: "Bank Account Inactivate Call Enabled" },
                { key: "CheckFreeAdmin.SubscriberModifyCallEnabled", value: this._subscriberModifyCallEnabled, dataType: 'boolean', label: "Subscriber Modify Call Enabled" },
                { key: "CheckFreeAdmin.SubscriberInactivateCallEnabled", value: this._subscriberInactivateCallEnabled, dataType: 'boolean', label: "Subscriber Inactivate Call Enabled" },
                { key: "CheckFreeAdmin.BankAccountModifyCallEnabled", value: this._bankAccountModifyCallEnabled, dataType: 'boolean', label: "Bank Account Modify Call Enabled" },
                { key: "CheckFreeAdmin.SubscriberReactivateCallEnabled", value: this._subscriberReactivateCallEnabled, dataType: 'boolean', label: "Subscriber Reactivate Call Enabled" },
            ];
        }

}