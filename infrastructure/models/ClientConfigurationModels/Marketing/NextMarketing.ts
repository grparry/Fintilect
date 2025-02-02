import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { OffersRequestSetting } from '../OffersRequestSetting';
export interface NextMarketingConfig {
    SlotIdMappings: Record<string, number>;
    MaxOffersToReturn: number;
    BaseUrl: string;
    ConnectorKey: string;
    InstanceId: string;
    UserName: string;
    Password: string;
    InstitutionCode: string;
    VendorId: string;
    OffersRequestSettings: OffersRequestSetting[];
    ImageBaseUrl: string;
}

export class NextMarketing implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'NextMarketing'
    };


            private _slotIdMappings: Record<string, number>;
            get slotIdMappings(): Record<string, number> {
                return this._slotIdMappings;
            }
            set slotIdMappings(value: Record<string, number>) {
                this._slotIdMappings = value;
            }

            private _maxOffersToReturn: number;
            get maxOffersToReturn(): number {
                return this._maxOffersToReturn;
            }
            set maxOffersToReturn(value: number) {
                this._maxOffersToReturn = value;
            }

            private _baseUrl: string;
            get baseUrl(): string {
                return this._baseUrl;
            }
            set baseUrl(value: string) {
                this._baseUrl = value;
            }

            private _connectorKey: string;
            get connectorKey(): string {
                return this._connectorKey;
            }
            set connectorKey(value: string) {
                this._connectorKey = value;
            }

            private _instanceId: string;
            get instanceId(): string {
                return this._instanceId;
            }
            set instanceId(value: string) {
                this._instanceId = value;
            }

            private _userName: string;
            get userName(): string {
                return this._userName;
            }
            set userName(value: string) {
                this._userName = value;
            }

            private _password: string;
            get password(): string {
                return this._password;
            }
            set password(value: string) {
                this._password = value;
            }

            private _institutionCode: string;
            get institutionCode(): string {
                return this._institutionCode;
            }
            set institutionCode(value: string) {
                this._institutionCode = value;
            }

            private _vendorId: string;
            get vendorId(): string {
                return this._vendorId;
            }
            set vendorId(value: string) {
                this._vendorId = value;
            }

            private _offersRequestSettings: OffersRequestSetting[];
            get offersRequestSettings(): OffersRequestSetting[] {
                return this._offersRequestSettings;
            }
            set offersRequestSettings(value: OffersRequestSetting[]) {
                this._offersRequestSettings = value;
            }

            private _imageBaseUrl: string;
            get imageBaseUrl(): string {
                return this._imageBaseUrl;
            }
            set imageBaseUrl(value: string) {
                this._imageBaseUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "NextMarketing.SlotIdMappings", value: this._slotIdMappings, dataType: 'record<string, number>', label: "Slot Id Mappings" },
                { key: "NextMarketing.MaxOffersToReturn", value: this._maxOffersToReturn, dataType: 'number', label: "Max Offers To Return" },
                { key: "NextMarketing.BaseUrl", value: this._baseUrl, dataType: 'string', label: "Base Url" },
                { key: "NextMarketing.ConnectorKey", value: this._connectorKey, dataType: 'string', label: "Connector Key" },
                { key: "NextMarketing.InstanceId", value: this._instanceId, dataType: 'string', label: "Instance Id" },
                { key: "NextMarketing.UserName", value: this._userName, dataType: 'string', label: "User Name" },
                { key: "NextMarketing.Password", value: this._password, dataType: 'string', label: "Password" },
                { key: "NextMarketing.InstitutionCode", value: this._institutionCode, dataType: 'string', label: "Institution Code" },
                { key: "NextMarketing.VendorId", value: this._vendorId, dataType: 'string', label: "Vendor Id" },
                { key: "NextMarketing.OffersRequestSettings", value: this._offersRequestSettings, dataType: 'array<OffersRequestSetting>', label: "Offers Request Settings" },
                { key: "NextMarketing.ImageBaseUrl", value: this._imageBaseUrl, dataType: 'string', label: "Image Base Url" },
            ];
        }

}