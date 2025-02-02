import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface WebApiEstatementsSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    MinAndroidVersion: string;
    MinIosVersion: string;
    DisclosureEnabled: boolean;
}

export class WebApiEstatementsSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'WebApiEstatementsSettings'
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

            private _disclosureEnabled: boolean;
            get disclosureEnabled(): boolean {
                return this._disclosureEnabled;
            }
            set disclosureEnabled(value: boolean) {
                this._disclosureEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "WebApiEstatementsSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "WebApiEstatementsSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "WebApiEstatementsSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "WebApiEstatementsSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "WebApiEstatementsSettings.DisclosureEnabled", value: this._disclosureEnabled, dataType: 'boolean', label: "Disclosure Enabled" },
            ];
        }

}