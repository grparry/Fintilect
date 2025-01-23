import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface JoinCreditUnionConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    Url: string;
}

export class JoinCreditUnion implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'JoinCreditUnion'
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
                { key: "JoinCreditUnion.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "JoinCreditUnion.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "JoinCreditUnion.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "JoinCreditUnion.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "JoinCreditUnion.Url", value: this._url, dataType: 'string', label: "Url" },
            ];
        }

}