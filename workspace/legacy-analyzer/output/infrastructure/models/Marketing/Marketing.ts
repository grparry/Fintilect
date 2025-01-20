// Generated imports
import { MarketingProvider } from '../MarketingProvider';
import { SegMintSettings } from '../SegMintSettings';
import { NextMarketing } from '../NextMarketing';

export interface Marketing {
    /** @settingKey MarketingProvider.ProviderName */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Marketing Provider name. Type: Set list.  default: 'TargetingMarketing'
     * /// /// </summary>
     * /// </summary>
     */
    marketingProvider: MarketingProvider;
    segMintSettings: SegMintSettings;
    nextMarketing: NextMarketing;
}
