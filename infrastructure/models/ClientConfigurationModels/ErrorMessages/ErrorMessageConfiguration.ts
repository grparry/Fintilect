import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { PassThroughErrorMessageConfiguration } from '../PassThroughErrorMessageConfiguration';
export interface ErrorMessageConfigurationConfig {
    PassThroughErrorConfiguration: PassThroughErrorMessageConfiguration;
}

export class ErrorMessageConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ErrorMessageConfiguration'
    };


            private _passThroughErrorConfiguration: PassThroughErrorMessageConfiguration;
            get passThroughErrorConfiguration(): PassThroughErrorMessageConfiguration {
                return this._passThroughErrorConfiguration;
            }
            set passThroughErrorConfiguration(value: PassThroughErrorMessageConfiguration) {
                this._passThroughErrorConfiguration = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ErrorMessageConfiguration.PassThroughErrorConfiguration", value: this._passThroughErrorConfiguration, dataType: 'passthrougherrormessageconfiguration', label: "Pass Through Error Configuration" },
            ];
        }

}