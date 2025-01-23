import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DeepTargetSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    MinIosVersion: string;
    MinAndroidVersion: string;
    JsonConfig: string;
    Javascript: string;
    LoginUrl: string;
    Url: string;
}

export class DeepTargetSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DeepTargetSettings'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _jsonConfig: string;
            get jsonConfig(): string {
                return this._jsonConfig;
            }
            set jsonConfig(value: string) {
                this._jsonConfig = value;
            }

            private _javascript: string;
            get javascript(): string {
                return this._javascript;
            }
            set javascript(value: string) {
                this._javascript = value;
            }

            private _loginUrl: string;
            get loginUrl(): string {
                return this._loginUrl;
            }
            set loginUrl(value: string) {
                this._loginUrl = value;
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
                { key: "DeepTargetSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "DeepTargetSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "DeepTargetSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "DeepTargetSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "DeepTargetSettings.JsonConfig", value: this._jsonConfig, dataType: 'string', label: "Json Config" },
                { key: "DeepTargetSettings.Javascript", value: this._javascript, dataType: 'string', label: "Javascript" },
                { key: "DeepTargetSettings.LoginUrl", value: this._loginUrl, dataType: 'string', label: "Login Url" },
                { key: "DeepTargetSettings.Url", value: this._url, dataType: 'string', label: "Url" },
            ];
        }

}