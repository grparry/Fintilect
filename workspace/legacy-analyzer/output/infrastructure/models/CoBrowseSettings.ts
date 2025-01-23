import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CoBrowseSettingsConfig {
    CoBrowseEnabled: boolean;
    MinVersion: number;
    JavascriptSourceUrl: string;
}

export class CoBrowseSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CoBrowseSettings'
    };


            private _coBrowseEnabled: boolean;
            get coBrowseEnabled(): boolean {
                return this._coBrowseEnabled;
            }
            set coBrowseEnabled(value: boolean) {
                this._coBrowseEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _javascriptSourceUrl: string;
            get javascriptSourceUrl(): string {
                return this._javascriptSourceUrl;
            }
            set javascriptSourceUrl(value: string) {
                this._javascriptSourceUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CoBrowseSettings.CoBrowseEnabled", value: this._coBrowseEnabled, dataType: 'boolean', label: "Co Browse Enabled" },
                { key: "CoBrowseSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "CoBrowseSettings.JavascriptSourceUrl", value: this._javascriptSourceUrl, dataType: 'string', label: "Javascript Source Url" },
            ];
        }

}