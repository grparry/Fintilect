import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { ConnectNative } from './ConnectNative';
export interface ThemesConfig {
    ConnectNative: ConnectNative;
}

export class Themes implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Themes'
    };


            private _connectNative: ConnectNative;
            get connectNative(): ConnectNative {
                return this._connectNative;
            }
            set connectNative(value: ConnectNative) {
                this._connectNative = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Themes.ConnectNative", value: this._connectNative, dataType: 'connectnative', label: "Connect Native" },
            ];
        }

}