import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface RatesConfig {
    Enabled: boolean;
    Url: string;
}

export class Rates implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Rates'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
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
                { key: "Rates.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Rates.Url", value: this._url, dataType: 'string', label: "Url" },
            ];
        }

}