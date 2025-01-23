import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { FeatureAction } from './FeatureAction';
export interface AuthenticationConfig {
    FeatureActions: FeatureAction[];
}

export class Authentication implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Authentication'
    };


            private _featureActions: FeatureAction[];
            get featureActions(): FeatureAction[] {
                return this._featureActions;
            }
            set featureActions(value: FeatureAction[]) {
                this._featureActions = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Authentication.FeatureActions", value: this._featureActions, dataType: 'array<FeatureAction>', label: "Feature Actions" },
            ];
        }

}