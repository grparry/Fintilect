import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SettingKeyAttributeConfig {
    Key: string;
}

export class SettingKeyAttribute implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SettingKeyAttribute'
    };


            private _key: string;
            get key(): string {
                return this._key;
            }
            set key(value: string) {
                this._key = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SettingKeyAttribute.Key", value: this._key, dataType: 'string', label: "Key" },
            ];
        }

}