import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CheckFreeConfig {
    Enabled: boolean;
    Url: string;
    ShouldRedirectToSsoUrl: boolean;
}

export class CheckFree implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CheckFree'
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

            private _shouldRedirectToSsoUrl: boolean;
            get shouldRedirectToSsoUrl(): boolean {
                return this._shouldRedirectToSsoUrl;
            }
            set shouldRedirectToSsoUrl(value: boolean) {
                this._shouldRedirectToSsoUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CheckFree.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "CheckFree.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "CheckFree.ShouldRedirectToSsoUrl", value: this._shouldRedirectToSsoUrl, dataType: 'boolean', label: "Should Redirect To Sso Url" },
            ];
        }

}