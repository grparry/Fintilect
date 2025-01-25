import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface Comm100Config {
    Enabled: boolean;
    AndroidMinimumVersion: string;
    IosMinimumVersion: string;
    Url: string;
    SiteId: string;
    PlanId: string;
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

            private _androidMinimumVersion: string;
            get androidMinimumVersion(): string {
                return this._androidMinimumVersion;
            }
            set androidMinimumVersion(value: string) {
                this._androidMinimumVersion = value;
            }

            private _iosMinimumVersion: string;
            get iosMinimumVersion(): string {
                return this._iosMinimumVersion;
            }
            set iosMinimumVersion(value: string) {
                this._iosMinimumVersion = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _siteId: string;
            get siteId(): string {
                return this._siteId;
            }
            set siteId(value: string) {
                this._siteId = value;
            }

            private _planId: string;
            get planId(): string {
                return this._planId;
            }
            set planId(value: string) {
                this._planId = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Comm100.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Comm100.AndroidMinimumVersion", value: this._androidMinimumVersion, dataType: 'string', label: "Android Minimum Version" },
                { key: "Comm100.IosMinimumVersion", value: this._iosMinimumVersion, dataType: 'string', label: "Ios Minimum Version" },
                { key: "Comm100.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "Comm100.SiteId", value: this._siteId, dataType: 'string', label: "Site Id" },
                { key: "Comm100.PlanId", value: this._planId, dataType: 'string', label: "Plan Id" },
            ];
        }

}