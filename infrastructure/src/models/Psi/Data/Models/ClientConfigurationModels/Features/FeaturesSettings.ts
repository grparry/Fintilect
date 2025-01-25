import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface FeaturesSettingsConfig {
    EnableNewFeatures: boolean;
}

export class FeaturesSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FeaturesSettings'
    };


            private _enableNewFeatures: boolean;
            get enableNewFeatures(): boolean {
                return this._enableNewFeatures;
            }
            set enableNewFeatures(value: boolean) {
                this._enableNewFeatures = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "FeaturesSettings.EnableNewFeatures", value: this._enableNewFeatures, dataType: 'boolean', label: "Enable New Features" },
            ];
        }

}