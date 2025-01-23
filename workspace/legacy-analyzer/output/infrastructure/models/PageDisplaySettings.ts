import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { jQuerySettings } from './jQuerySettings';
export interface PageDisplaySettingsConfig {
    ShowNcuaAsText: boolean;
    jQuerySettings: jQuerySettings;
}

export class PageDisplaySettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PageDisplaySettings'
    };


            private _showNcuaAsText: boolean;
            get showNcuaAsText(): boolean {
                return this._showNcuaAsText;
            }
            set showNcuaAsText(value: boolean) {
                this._showNcuaAsText = value;
            }

            private _jQuerySettings: jQuerySettings;
            get jQuerySettings(): jQuerySettings {
                return this._jQuerySettings;
            }
            set jQuerySettings(value: jQuerySettings) {
                this._jQuerySettings = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PageDisplaySettings.ShowNcuaAsText", value: this._showNcuaAsText, dataType: 'boolean', label: "Show Ncua As Text" },
                { key: "PageDisplaySettings.jQuerySettings", value: this._jQuerySettings, dataType: 'jquerysettings', label: "J Query Settings" },
            ];
        }

}