import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AtmLocatorConfig {
    Enabled: boolean;
    MinAndroidVersion: string;
    MinIosVersion: string;
    Url: string;
}

export class AtmLocator implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AtmLocator'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AtmLocator.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AtmLocator.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "AtmLocator.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "AtmLocator.Url", value: this._url, dataType: 'string', label: "Url" },
            ];
        }

}