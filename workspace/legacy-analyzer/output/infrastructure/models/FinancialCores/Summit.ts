// Generated imports
import { RegularAchTransfers } from '../RegularAchTransfers';

export interface Summit {
    /** @settingKey FinancialCore.Summit.TransferCommandCode */
    transferCommandCode: string;
    /** @settingKey FinancialCore.Summit.UserFields.SegmintMarketingIdEnabled */
    segmintMarketingIdEnabled: string;
    /** @settingKey FinancialCore.Summit.UseTwelveDigitTransactionAmount */
    useTwelveDigitTransactionAmount: boolean;
    regularAchTransfers: RegularAchTransfers;
}
