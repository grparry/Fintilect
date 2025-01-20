// Generated imports
import { SlotIdMappings } from '../SlotIdMappings';
import { OffersRequestSettings } from '../OffersRequestSettings';

export interface NextMarketing {
    /** @settingKey Marketing.Next.SlotIdMappings */
    dictionary: SlotIdMappings;
    /** @settingKey Marketing.Next.MaxOffersToReturn */
    maxOffersToReturn: number;
    /** @settingKey Marketing.Next.BaseUrl */
    baseUrl: string;
    /** @settingKey Marketing.Next.ConnectorKey */
    connectorKey: string;
    /** @settingKey Marketing.Next.InstanceId */
    instanceId: string;
    /** @settingKey Marketing.Next.UserName */
    userName: string;
    /** @settingKey Marketing.Next.Password */
    password: string;
    /** @settingKey Marketing.Next.InstitutionCode */
    institutionCode: string;
    /** @settingKey Marketing.Next.VendorId */
    vendorId: string;
    /** @settingKey Marketing.Next.OffersRequestSettings */
    list: OffersRequestSettings;
    /** @settingKey Marketing.Next.ImageBaseUrl */
    imageBaseUrl: string;
}
