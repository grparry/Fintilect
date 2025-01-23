import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MobileWebViewsConfig {
    WhitelistedPages: string[];
}

export class MobileWebViews implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MobileWebViews'
    };


            private _whitelistedPages: string[];
            get whitelistedPages(): string[] {
                return this._whitelistedPages;
            }
            set whitelistedPages(value: string[]) {
                this._whitelistedPages = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MobileWebViews.WhitelistedPages", value: this._whitelistedPages, dataType: 'list<string>', label: "Whitelisted Pages" },
            ];
        }

}