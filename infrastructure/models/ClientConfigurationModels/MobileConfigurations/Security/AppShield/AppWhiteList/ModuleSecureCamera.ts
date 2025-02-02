import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ModuleSecureCameraConfig {
    Enabled: boolean;
}

export class ModuleSecureCamera implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ModuleSecureCamera'
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
                { key: "ModuleSecureCamera.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
            ];
        }

}