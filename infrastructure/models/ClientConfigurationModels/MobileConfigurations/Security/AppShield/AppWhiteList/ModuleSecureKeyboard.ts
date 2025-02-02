import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ModuleSecureKeyboardConfig {
    AndroidEnabled: boolean;
    IosEnabled: boolean;
}

export class ModuleSecureKeyboard implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ModuleSecureKeyboard'
    };


            private _androidEnabled: boolean;
            get androidEnabled(): boolean {
                return this._androidEnabled;
            }
            set androidEnabled(value: boolean) {
                this._androidEnabled = value;
            }

            private _iosEnabled: boolean;
            get iosEnabled(): boolean {
                return this._iosEnabled;
            }
            set iosEnabled(value: boolean) {
                this._iosEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ModuleSecureKeyboard.AndroidEnabled", value: this._androidEnabled, dataType: 'boolean', label: "Android Enabled" },
                { key: "ModuleSecureKeyboard.IosEnabled", value: this._iosEnabled, dataType: 'boolean', label: "Ios Enabled" },
            ];
        }

}