import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ClientConfigurationRepositoryConfig {

}

export class ClientConfigurationRepository implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ClientConfigurationRepository'
    };



    constructor() {}


        toSettings(): Setting[] {
            return [
            ];
        }

}