import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface OnDotSdkSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    MinAndroidVersion: string;
    MinIosVersion: string;
    AndroidPublicKey: string;
    IosPublicKey: string;
    MultiUserModeEnabled: boolean;
    AppToken: string;
    FiToken: string;
    DeploymentToken: string;
    EndpointUrl: string;
    ConnectionSettings: string;
}

export class OnDotSdkSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OnDotSdkSettings'
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

            private _androidPublicKey: string;
            get androidPublicKey(): string {
                return this._androidPublicKey;
            }
            set androidPublicKey(value: string) {
                this._androidPublicKey = value;
            }

            private _iosPublicKey: string;
            get iosPublicKey(): string {
                return this._iosPublicKey;
            }
            set iosPublicKey(value: string) {
                this._iosPublicKey = value;
            }

            private _multiUserModeEnabled: boolean;
            get multiUserModeEnabled(): boolean {
                return this._multiUserModeEnabled;
            }
            set multiUserModeEnabled(value: boolean) {
                this._multiUserModeEnabled = value;
            }

            private _appToken: string;
            get appToken(): string {
                return this._appToken;
            }
            set appToken(value: string) {
                this._appToken = value;
            }

            private _fiToken: string;
            get fiToken(): string {
                return this._fiToken;
            }
            set fiToken(value: string) {
                this._fiToken = value;
            }

            private _deploymentToken: string;
            get deploymentToken(): string {
                return this._deploymentToken;
            }
            set deploymentToken(value: string) {
                this._deploymentToken = value;
            }

            private _endpointUrl: string;
            get endpointUrl(): string {
                return this._endpointUrl;
            }
            set endpointUrl(value: string) {
                this._endpointUrl = value;
            }

            private _connectionSettings: string;
            get connectionSettings(): string {
                return this._connectionSettings;
            }
            set connectionSettings(value: string) {
                this._connectionSettings = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OnDotSdkSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "OnDotSdkSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "OnDotSdkSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "OnDotSdkSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "OnDotSdkSettings.AndroidPublicKey", value: this._androidPublicKey, dataType: 'string', label: "Android Public Key" },
                { key: "OnDotSdkSettings.IosPublicKey", value: this._iosPublicKey, dataType: 'string', label: "Ios Public Key" },
                { key: "OnDotSdkSettings.MultiUserModeEnabled", value: this._multiUserModeEnabled, dataType: 'boolean', label: "Multi User Mode Enabled" },
                { key: "OnDotSdkSettings.AppToken", value: this._appToken, dataType: 'string', label: "App Token" },
                { key: "OnDotSdkSettings.FiToken", value: this._fiToken, dataType: 'string', label: "Fi Token" },
                { key: "OnDotSdkSettings.DeploymentToken", value: this._deploymentToken, dataType: 'string', label: "Deployment Token" },
                { key: "OnDotSdkSettings.EndpointUrl", value: this._endpointUrl, dataType: 'string', label: "Endpoint Url" },
                { key: "OnDotSdkSettings.ConnectionSettings", value: this._connectionSettings, dataType: 'string', label: "Connection Settings" },
            ];
        }

}