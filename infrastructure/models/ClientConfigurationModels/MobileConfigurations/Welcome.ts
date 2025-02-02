import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface WelcomeConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    TokensEnabled: boolean;
    Url: string;
}

export class Welcome implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Welcome'
    };


            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _tokensEnabled: boolean;
            get tokensEnabled(): boolean {
                return this._tokensEnabled;
            }
            set tokensEnabled(value: boolean) {
                this._tokensEnabled = value;
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
                { key: "Welcome.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "Welcome.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "Welcome.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "Welcome.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Welcome.TokensEnabled", value: this._tokensEnabled, dataType: 'boolean', label: "Tokens Enabled" },
                { key: "Welcome.Url", value: this._url, dataType: 'string', label: "Url" },
            ];
        }

}