import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DocumentCenterConfig {
    Enabled: boolean;
}

export class DocumentCenter implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DocumentCenter'
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
                { key: "DocumentCenter.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
            ];
        }

}