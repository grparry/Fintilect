import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ModulePortAuthorityConfig {
    Enabled: boolean;
}

export class ModulePortAuthority implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ModulePortAuthority'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ModulePortAuthority.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
            ];
        }

}