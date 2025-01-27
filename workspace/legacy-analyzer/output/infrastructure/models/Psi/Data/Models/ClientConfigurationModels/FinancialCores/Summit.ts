import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { RegularAchTransfers } from '@infrastructure/RegularAchTransfers';
export interface SummitConfig {
    TransferCommandCode: string;
    SegmintMarketingIdEnabled: string;
    UseTwelveDigitTransactionAmount: boolean;
    RegularAchTransfers: RegularAchTransfers;
}

export class Summit implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Summit'
    };


            private _transferCommandCode: string;
            get transferCommandCode(): string {
                return this._transferCommandCode;
            }
            set transferCommandCode(value: string) {
                this._transferCommandCode = value;
            }

            private _segmintMarketingIdEnabled: string;
            get segmintMarketingIdEnabled(): string {
                return this._segmintMarketingIdEnabled;
            }
            set segmintMarketingIdEnabled(value: string) {
                this._segmintMarketingIdEnabled = value;
            }

            private _useTwelveDigitTransactionAmount: boolean;
            get useTwelveDigitTransactionAmount(): boolean {
                return this._useTwelveDigitTransactionAmount;
            }
            set useTwelveDigitTransactionAmount(value: boolean) {
                this._useTwelveDigitTransactionAmount = value;
            }

            private _regularAchTransfers: RegularAchTransfers;
            get regularAchTransfers(): RegularAchTransfers {
                return this._regularAchTransfers;
            }
            set regularAchTransfers(value: RegularAchTransfers) {
                this._regularAchTransfers = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Summit.TransferCommandCode", value: this._transferCommandCode, dataType: 'string', label: "Transfer Command Code" },
                { key: "Summit.SegmintMarketingIdEnabled", value: this._segmintMarketingIdEnabled, dataType: 'string', label: "Segmint Marketing Id Enabled" },
                { key: "Summit.UseTwelveDigitTransactionAmount", value: this._useTwelveDigitTransactionAmount, dataType: 'boolean', label: "Use Twelve Digit Transaction Amount" },
                { key: "Summit.RegularAchTransfers", value: this._regularAchTransfers, dataType: 'regularachtransfers', label: "Regular Ach Transfers" },
            ];
        }

}