import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface VersionManagementConfig {
    EnableDeprecationMessages: boolean;
}

export class VersionManagement implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'VersionManagement'
    };


            private _enableDeprecationMessages: boolean;
            get enableDeprecationMessages(): boolean {
                return this._enableDeprecationMessages;
            }
            set enableDeprecationMessages(value: boolean) {
                this._enableDeprecationMessages = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "VersionManagement.EnableDeprecationMessages", value: this._enableDeprecationMessages, dataType: 'boolean', label: "Enable Deprecation Messages" },
            ];
        }

}