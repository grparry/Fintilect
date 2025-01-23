import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MarketingConfig {
    TargetedMarketingUrl: string;
    RotationInterval: number;
}

export class Marketing implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Marketing'
    };


            private _targetedMarketingUrl: string;
            get targetedMarketingUrl(): string {
                return this._targetedMarketingUrl;
            }
            set targetedMarketingUrl(value: string) {
                this._targetedMarketingUrl = value;
            }

            private _rotationInterval: number;
            get rotationInterval(): number {
                return this._rotationInterval;
            }
            set rotationInterval(value: number) {
                this._rotationInterval = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Marketing.TargetedMarketingUrl", value: this._targetedMarketingUrl, dataType: 'string', label: "Targeted Marketing Url" },
                { key: "Marketing.RotationInterval", value: this._rotationInterval, dataType: 'number', label: "Rotation Interval" },
            ];
        }

}