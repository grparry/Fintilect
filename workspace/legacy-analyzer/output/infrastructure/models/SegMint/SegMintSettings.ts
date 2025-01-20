// Generated imports
import { ZoneIdMappings } from '../ZoneIdMappings';
import { SlotIdMappings } from '../SlotIdMappings';

export interface SegMintSettings {
    /** @settingKey Marketing.SegMint.Secret */
    secret: string;
    /** @settingKey Marketing.SegMint.ClientId */
    clientId: string;
    /** @settingKey Marketing.SegMint.Url */
    url: string;
    /** @settingKey Marketing.SegMint.ZoneId */
    zoneId: string;
    /** @settingKey Marketing.SegMint.ZoneIdMappings */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Mapping from our targeted marketing slot names to SegMint's zone ids.
     * /// /// </summary>
     * /// </summary>
     */
    dictionary: ZoneIdMappings;
    /** @settingKey Marketing.SegMint.SlotIdMappings */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Mapping from SegMint's slot ids to our targeted marketing slot ids.
     * /// /// </summary>
     * /// </summary>
     */
    dictionary: SlotIdMappings;
    /** @settingKey Marketing.Segmint.ShouldUseMarketingId */
    shouldUseMarketingId: boolean;
    /** @settingKey Marketing.SegMint.PartnerId */
    partnerId: string;
    /** @settingKey Marketing.SegMint.MaxOffersToReturn */
    maxOffersToReturn: number;
    /** @settingKey Marketing.SegMint.DataConfigId */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This string goes into the data-config-id attribute of the javascript script on Welcome and Dashboard:
     * /// /// </summary>
     * /// </summary>
     */
    dataConfigId: string;
}
