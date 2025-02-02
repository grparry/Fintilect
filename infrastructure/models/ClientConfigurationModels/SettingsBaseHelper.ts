import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SettingsBaseHelperConfig {
    EnvironmentName: string;
}

export class SettingsBaseHelper implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SettingsBaseHelper'
    };


            private _environmentName: string;
            get environmentName(): string {
                return this._environmentName;
            }
            set environmentName(value: string) {
                this._environmentName = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SettingsBaseHelper.EnvironmentName", value: this._environmentName, dataType: 'string', label: "Environment Name" },
            ];
        }

}