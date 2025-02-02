import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { TransferLimitsSettings } from '../TransferLimitsSettings';
export interface TransferLimitsConfig {
    Limits: TransferLimitsSettings;
    CustomTransferLimitMessagesEnabled: boolean;
}

export class TransferLimits implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TransferLimits'
    };


            private _limits: TransferLimitsSettings;
            get limits(): TransferLimitsSettings {
                return this._limits;
            }
            set limits(value: TransferLimitsSettings) {
                this._limits = value;
            }

            private _customTransferLimitMessagesEnabled: boolean;
            get customTransferLimitMessagesEnabled(): boolean {
                return this._customTransferLimitMessagesEnabled;
            }
            set customTransferLimitMessagesEnabled(value: boolean) {
                this._customTransferLimitMessagesEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TransferLimits.Limits", value: this._limits, dataType: 'transferlimitssettings', label: "Limits" },
                { key: "TransferLimits.CustomTransferLimitMessagesEnabled", value: this._customTransferLimitMessagesEnabled, dataType: 'boolean', label: "Custom Transfer Limit Messages Enabled" },
            ];
        }

}