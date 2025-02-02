import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface InvalidConfigurationExceptionConfig {

}

export class InvalidConfigurationException implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'InvalidConfigurationException'
    };



    constructor() {}


        toSettings(): Setting[] {
            return [
            ];
        }

}