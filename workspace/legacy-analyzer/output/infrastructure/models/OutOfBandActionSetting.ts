import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { FeatureActionTypeEnum } from './FeatureActionTypeEnum';
import { Money } from './Money';
export interface OutOfBandActionSettingConfig {
    ActionType: FeatureActionTypeEnum;
    Enabled: boolean;
    TransferLimit: Money;
}

export class OutOfBandActionSetting implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OutOfBandActionSetting'
    };


            private _actionType: FeatureActionTypeEnum;
            get actionType(): FeatureActionTypeEnum {
                return this._actionType;
            }
            set actionType(value: FeatureActionTypeEnum) {
                this._actionType = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _transferLimit: Money;
            get transferLimit(): Money {
                return this._transferLimit;
            }
            set transferLimit(value: Money) {
                this._transferLimit = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OutOfBandActionSetting.ActionType", value: this._actionType, dataType: 'clientconfigurationrepository.featureactiontypeenum', label: "Action Type" },
                { key: "OutOfBandActionSetting.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "OutOfBandActionSetting.TransferLimit", value: this._transferLimit, dataType: 'money', label: "Transfer Limit" },
            ];
        }

}