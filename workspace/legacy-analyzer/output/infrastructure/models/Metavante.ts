import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MetavanteConfig {
    SourceId: string;
    ApplId: string;
    BId: string;
    Certificate: string;
    RouteTransit: string;
    Uri: string;
    Url: string;
    PartnerUid: string;
    Timeout?: number | null;
    UsesDeliverByModel: boolean;
    EnrollWithJointOwnerEnabled: boolean;
    ServiceId: string;
    TransactionAmountLimit: number;
    DailyAmountLimit: number;
    UseWebServiceForSso: boolean;
}

export class Metavante implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Metavante'
    };


            private _sourceId: string;
            get sourceId(): string {
                return this._sourceId;
            }
            set sourceId(value: string) {
                this._sourceId = value;
            }

            private _applId: string;
            get applId(): string {
                return this._applId;
            }
            set applId(value: string) {
                this._applId = value;
            }

            private _bId: string;
            get bId(): string {
                return this._bId;
            }
            set bId(value: string) {
                this._bId = value;
            }

            private _certificate: string;
            get certificate(): string {
                return this._certificate;
            }
            set certificate(value: string) {
                this._certificate = value;
            }

            private _routeTransit: string;
            get routeTransit(): string {
                return this._routeTransit;
            }
            set routeTransit(value: string) {
                this._routeTransit = value;
            }

            private _uri: string;
            get uri(): string {
                return this._uri;
            }
            set uri(value: string) {
                this._uri = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _partnerUid: string;
            get partnerUid(): string {
                return this._partnerUid;
            }
            set partnerUid(value: string) {
                this._partnerUid = value;
            }

            private _timeout: number | null;
            get timeout(): number | null {
                return this._timeout;
            }
            set timeout(value: number | null) {
                this._timeout = value;
            }

            private _usesDeliverByModel: boolean;
            get usesDeliverByModel(): boolean {
                return this._usesDeliverByModel;
            }
            set usesDeliverByModel(value: boolean) {
                this._usesDeliverByModel = value;
            }

            private _enrollWithJointOwnerEnabled: boolean;
            get enrollWithJointOwnerEnabled(): boolean {
                return this._enrollWithJointOwnerEnabled;
            }
            set enrollWithJointOwnerEnabled(value: boolean) {
                this._enrollWithJointOwnerEnabled = value;
            }

            private _serviceId: string;
            get serviceId(): string {
                return this._serviceId;
            }
            set serviceId(value: string) {
                this._serviceId = value;
            }

            private _transactionAmountLimit: number;
            get transactionAmountLimit(): number {
                return this._transactionAmountLimit;
            }
            set transactionAmountLimit(value: number) {
                this._transactionAmountLimit = value;
            }

            private _dailyAmountLimit: number;
            get dailyAmountLimit(): number {
                return this._dailyAmountLimit;
            }
            set dailyAmountLimit(value: number) {
                this._dailyAmountLimit = value;
            }

            private _useWebServiceForSso: boolean;
            get useWebServiceForSso(): boolean {
                return this._useWebServiceForSso;
            }
            set useWebServiceForSso(value: boolean) {
                this._useWebServiceForSso = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Metavante.SourceId", value: this._sourceId, dataType: 'string', label: "Source Id" },
                { key: "Metavante.ApplId", value: this._applId, dataType: 'string', label: "Appl Id" },
                { key: "Metavante.BId", value: this._bId, dataType: 'string', label: "B Id" },
                { key: "Metavante.Certificate", value: this._certificate, dataType: 'string', label: "Certificate" },
                { key: "Metavante.RouteTransit", value: this._routeTransit, dataType: 'string', label: "Route Transit" },
                { key: "Metavante.Uri", value: this._uri, dataType: 'string', label: "Uri" },
                { key: "Metavante.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "Metavante.PartnerUid", value: this._partnerUid, dataType: 'string', label: "Partner Uid" },
                { key: "Metavante.Timeout", value: this._timeout, dataType: 'number | null', label: "Timeout" },
                { key: "Metavante.UsesDeliverByModel", value: this._usesDeliverByModel, dataType: 'boolean', label: "Uses Deliver By Model" },
                { key: "Metavante.EnrollWithJointOwnerEnabled", value: this._enrollWithJointOwnerEnabled, dataType: 'boolean', label: "Enroll With Joint Owner Enabled" },
                { key: "Metavante.ServiceId", value: this._serviceId, dataType: 'string', label: "Service Id" },
                { key: "Metavante.TransactionAmountLimit", value: this._transactionAmountLimit, dataType: 'number', label: "Transaction Amount Limit" },
                { key: "Metavante.DailyAmountLimit", value: this._dailyAmountLimit, dataType: 'number', label: "Daily Amount Limit" },
                { key: "Metavante.UseWebServiceForSso", value: this._useWebServiceForSso, dataType: 'boolean', label: "Use Web Service For Sso" },
            ];
        }

}