import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { MarketingProvider } from '@infrastructure/MarketingProvider';
import { SegMintSettings } from '@infrastructure/SegMintSettings';
import { NextMarketing } from '@infrastructure/NextMarketing';
export interface MarketingConfig {
    Provider: MarketingProvider;
    SegMintSettings: SegMintSettings;
    NextMarketing: NextMarketing;
}

export class Marketing implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Marketing'
    };


            private _provider: MarketingProvider;
            get provider(): MarketingProvider {
                return this._provider;
            }
            set provider(value: MarketingProvider) {
                this._provider = value;
            }

            private _segMintSettings: SegMintSettings;
            get segMintSettings(): SegMintSettings {
                return this._segMintSettings;
            }
            set segMintSettings(value: SegMintSettings) {
                this._segMintSettings = value;
            }

            private _nextMarketing: NextMarketing;
            get nextMarketing(): NextMarketing {
                return this._nextMarketing;
            }
            set nextMarketing(value: NextMarketing) {
                this._nextMarketing = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Marketing.Provider", value: this._provider, dataType: 'marketingprovider', label: "Provider" },
                { key: "Marketing.SegMintSettings", value: this._segMintSettings, dataType: 'segmintsettings', label: "Seg Mint Settings" },
                { key: "Marketing.NextMarketing", value: this._nextMarketing, dataType: 'nextmarketing', label: "Next Marketing" },
            ];
        }

}