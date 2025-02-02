import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SegMintSettingsConfig {
    Secret: string;
    ClientId: string;
    Url: string;
    ZoneId: string;
    ZoneIdMappings: Record<string, string>;
    SlotIdMappings: Record<string, string>;
    ShouldUseMarketingId: boolean;
    PartnerId: string;
    MaxOffersToReturn: number;
    DataConfigId: string;
}

export class SegMintSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SegMintSettings'
    };


            private _secret: string;
            get secret(): string {
                return this._secret;
            }
            set secret(value: string) {
                this._secret = value;
            }

            private _clientId: string;
            get clientId(): string {
                return this._clientId;
            }
            set clientId(value: string) {
                this._clientId = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _zoneId: string;
            get zoneId(): string {
                return this._zoneId;
            }
            set zoneId(value: string) {
                this._zoneId = value;
            }

            private _zoneIdMappings: Record<string, string>;
            get zoneIdMappings(): Record<string, string> {
                return this._zoneIdMappings;
            }
            set zoneIdMappings(value: Record<string, string>) {
                this._zoneIdMappings = value;
            }

            private _slotIdMappings: Record<string, string>;
            get slotIdMappings(): Record<string, string> {
                return this._slotIdMappings;
            }
            set slotIdMappings(value: Record<string, string>) {
                this._slotIdMappings = value;
            }

            private _shouldUseMarketingId: boolean;
            get shouldUseMarketingId(): boolean {
                return this._shouldUseMarketingId;
            }
            set shouldUseMarketingId(value: boolean) {
                this._shouldUseMarketingId = value;
            }

            private _partnerId: string;
            get partnerId(): string {
                return this._partnerId;
            }
            set partnerId(value: string) {
                this._partnerId = value;
            }

            private _maxOffersToReturn: number;
            get maxOffersToReturn(): number {
                return this._maxOffersToReturn;
            }
            set maxOffersToReturn(value: number) {
                this._maxOffersToReturn = value;
            }

            private _dataConfigId: string;
            get dataConfigId(): string {
                return this._dataConfigId;
            }
            set dataConfigId(value: string) {
                this._dataConfigId = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SegMintSettings.Secret", value: this._secret, dataType: 'string', label: "Secret" },
                { key: "SegMintSettings.ClientId", value: this._clientId, dataType: 'string', label: "Client Id" },
                { key: "SegMintSettings.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "SegMintSettings.ZoneId", value: this._zoneId, dataType: 'string', label: "Zone Id" },
                { key: "SegMintSettings.ZoneIdMappings", value: this._zoneIdMappings, dataType: 'record<string, string>', label: "Zone Id Mappings" },
                { key: "SegMintSettings.SlotIdMappings", value: this._slotIdMappings, dataType: 'record<string, string>', label: "Slot Id Mappings" },
                { key: "SegMintSettings.ShouldUseMarketingId", value: this._shouldUseMarketingId, dataType: 'boolean', label: "Should Use Marketing Id" },
                { key: "SegMintSettings.PartnerId", value: this._partnerId, dataType: 'string', label: "Partner Id" },
                { key: "SegMintSettings.MaxOffersToReturn", value: this._maxOffersToReturn, dataType: 'number', label: "Max Offers To Return" },
                { key: "SegMintSettings.DataConfigId", value: this._dataConfigId, dataType: 'string', label: "Data Config Id" },
            ];
        }

}