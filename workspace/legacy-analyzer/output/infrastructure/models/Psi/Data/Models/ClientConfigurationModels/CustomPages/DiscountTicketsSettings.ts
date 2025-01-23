import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DiscountTicketsSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    MinIosVersion: string;
    MinAndroidVersion: string;
    Url: string;
}

export class DiscountTicketsSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DiscountTicketsSettings'
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
                { key: "DiscountTicketsSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "DiscountTicketsSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "DiscountTicketsSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "DiscountTicketsSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "DiscountTicketsSettings.Url", value: this._url, dataType: 'string', label: "Url" },
            ];
        }

}