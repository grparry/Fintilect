import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface BillMatrixConfig {
    Enabled: boolean;
    Url: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
}

export class BillMatrix implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BillMatrix'
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


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BillMatrix.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "BillMatrix.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "BillMatrix.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "BillMatrix.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
            ];
        }

}