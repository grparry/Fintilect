import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface Comm100Config {
    Enabled: boolean;
    MinVersion: number;
    Javascript: string;
}

export class Comm100 implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Comm100'
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

            private _javascript: string;
            get javascript(): string {
                return this._javascript;
            }
            set javascript(value: string) {
                this._javascript = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Comm100.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Comm100.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "Comm100.Javascript", value: this._javascript, dataType: 'string', label: "Javascript" },
            ];
        }

}