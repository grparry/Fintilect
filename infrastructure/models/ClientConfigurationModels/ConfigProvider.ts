import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ConfigProviderConfig {

}

export class ConfigProvider implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ConfigProvider'
    };



    constructor() {}


        toSettings(): Setting[] {
            return [
            ];
        }

}