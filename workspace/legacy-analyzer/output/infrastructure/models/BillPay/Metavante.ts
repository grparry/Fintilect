// Generated imports
import { Timeout } from '../Timeout';

export interface Metavante {
    /** @settingKey BillPay.Metavante.SourceId */
    sourceId: string;
    /** @settingKey BillPay.Metavante.ApplId */
    applId: string;
    /** @settingKey BillPay.Metavante.BId */
    bId: string;
    /** @settingKey BillPay.Metavante.CertificateName */
    certificate: string;
    /** @settingKey Mobile.BillPay.Metavante.RouteTransit */
    routeTransit: string;
    /** @settingKey BillPay.Metavante.Uri */
    uri: string;
    /** @settingKey Mobile.BillPay.Metavante.Url */
    url: string;
    /** @settingKey BillPay.Metavante.PartnerUid */
    partnerUid: string;
    /** @settingKey BillPay.Metavante.Timeout */
    timeout: Timeout | null;
    /** @settingKey BillPay.Metavante.UsesDeliverByModel */
    usesDeliverByModel: boolean;
    /** @settingKey BillPay.Metavante.EnrollWithJointOwnerEnabled */
    enrollWithJointOwnerEnabled: boolean;
    /** @settingKey BillPay.Metavante.ServiceId */
    serviceId: string;
    /** @settingKey BillPay.Metavante.TransactionAmountLimit */
    transactionAmountLimit: number;
    /** @settingKey BillPay.Metavante.DailyAmountLimit */
    dailyAmountLimit: number;
    /** @settingKey BillPay.Metavante.UseWebServiceForSso */
    useWebServiceForSso: boolean;
}
