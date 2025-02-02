import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { DeepTargetSettings } from '../DeepTargetSettings';
import { SkipPay } from '../SkipPay';
export interface PromotionsConfig {
    DeepTarget: DeepTargetSettings;
    SkipPay: SkipPay;
}

export class Promotions implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Promotions'
    };


            private _deepTarget: DeepTargetSettings;
            get deepTarget(): DeepTargetSettings {
                return this._deepTarget;
            }
            set deepTarget(value: DeepTargetSettings) {
                this._deepTarget = value;
            }

            private _skipPay: SkipPay;
            get skipPay(): SkipPay {
                return this._skipPay;
            }
            set skipPay(value: SkipPay) {
                this._skipPay = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Promotions.DeepTarget", value: this._deepTarget, dataType: 'deeptargetsettings', label: "Deep Target" },
                { key: "Promotions.SkipPay", value: this._skipPay, dataType: 'skippay', label: "Skip Pay" },
            ];
        }

}