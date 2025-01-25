import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AccountNumberAssociationConfig {
    Enabled: boolean;
    DeactivateExternalScheduledTransfers: boolean;
}

export class AccountNumberAssociation implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountNumberAssociation'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _deactivateExternalScheduledTransfers: boolean;
            get deactivateExternalScheduledTransfers(): boolean {
                return this._deactivateExternalScheduledTransfers;
            }
            set deactivateExternalScheduledTransfers(value: boolean) {
                this._deactivateExternalScheduledTransfers = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountNumberAssociation.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AccountNumberAssociation.DeactivateExternalScheduledTransfers", value: this._deactivateExternalScheduledTransfers, dataType: 'boolean', label: "Deactivate External Scheduled Transfers" },
            ];
        }

}